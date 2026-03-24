import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
    AffiliateItem,
    AgentEvent,
    AgentRunState,
    AgentRunStateMap,
    StartPayload,
} from '@/types';

import { parseSSEChunk } from '@/utils';
import { createAgentRun, getAgentRunLiveReader } from '@/services';

const createInitialRunState = (): AgentRunState => ({
    runId: undefined,
    events: [],
    finalAnswer: undefined,
    thinking: '',
    isStreaming: false,
    isDone: false,
    error: undefined,
});

const getDomainFromUrl = (url: string) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .split('/')[0];
    }
};

const buildPayloadFromItem = (item: AffiliateItem): StartPayload => ({
    domain: getDomainFromUrl(item.domain),
    input: item.input || 'extract all pricing of their service',
    saveMemory: item.saveMemory,
});

export const useAgentSSEMultiStream = (items: AffiliateItem[]) => {
    const [streamMap, setStreamMap] = useState<AgentRunStateMap>({});
    const [activeCount, setActiveCount] = useState(0);

    const abortMapRef = useRef<Record<string, AbortController>>({});

    const isLoading = activeCount > 0;

    const updateRunState = useCallback(
        (url: string, updater: (prev: AgentRunState) => AgentRunState) => {
            setStreamMap((prev) => {
                const current = prev[url] ?? createInitialRunState();

                return {
                    ...prev,
                    [url]: updater(current),
                };
            });
        },
        [],
    );

    const appendEvents = useCallback(
        (url: string, events: AgentEvent[]) => {
            if (!events.length) return;

            updateRunState(url, (prev) => {
                let finalAnswer = prev.finalAnswer;
                let isDone = prev.isDone;
                let thinking = prev.thinking;

                for (const event of events) {
                    if (event.type === 'thinking') {
                        thinking += event.payload?.content || '';
                    }

                    if (event.type === 'final_response') {
                        finalAnswer = event.payload?.answer;
                        isDone = true;
                    }
                }

                return {
                    ...prev,
                    events: [...prev.events, ...events],
                    thinking,
                    finalAnswer,
                    isDone,
                };
            });
        },
        [updateRunState],
    );

    const startStream = useCallback(
        async (item: AffiliateItem) => {
            const existing = abortMapRef.current[item.domain];
            if (existing) {
                existing.abort();
                delete abortMapRef.current[item.domain];
            }

            const controller = new AbortController();
            abortMapRef.current[item.domain] = controller;

            setActiveCount((prev) => prev + 1);

            updateRunState(item.domain, () => ({
                ...createInitialRunState(),
                isStreaming: true,
            }));

            try {
                const payload = buildPayloadFromItem(item);
                const { runId } = await createAgentRun(
                    payload,
                    controller.signal,
                );

                updateRunState(item.domain, (prev) => ({
                    ...prev,
                    runId,
                    isStreaming: true,
                }));

                const reader = await getAgentRunLiveReader(
                    runId,
                    controller.signal,
                );
                const decoder = new TextDecoder('utf-8');

                let buffer = '';

                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });

                    const chunks = buffer.split('\n\n');
                    buffer = chunks.pop() || '';

                    for (const chunk of chunks) {
                        const events = parseSSEChunk(`${chunk}\n\n`);
                        appendEvents(item.domain, events);
                    }
                }

                if (buffer.trim()) {
                    const events = parseSSEChunk(buffer);
                    appendEvents(item.domain, events);
                }

                updateRunState(item.domain, (prev) => ({
                    ...prev,
                    isStreaming: false,
                }));
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    updateRunState(item.domain, (prev) => ({
                        ...prev,
                        isStreaming: false,
                        error:
                            err instanceof Error
                                ? err.message
                                : 'Unknown stream error',
                    }));
                }
            } finally {
                delete abortMapRef.current[item.domain];
                setActiveCount((prev) => Math.max(0, prev - 1));

                updateRunState(item.domain, (prev) => ({
                    ...prev,
                    isStreaming: false,
                }));
            }
        },
        [appendEvents, updateRunState],
    );

    const startAll = useCallback(() => {
        items.forEach((item) => {
            void startStream(item);
        });
    }, [items, startStream]);

    useEffect(() => {
        const initial: AgentRunStateMap = {};

        items.forEach((item) => {
            initial[item.domain] = createInitialRunState();
        });

        setStreamMap(initial);

        return () => {
            Object.values(abortMapRef.current).forEach((controller) =>
                controller.abort(),
            );
            abortMapRef.current = {};
        };
    }, [items]);

    return useMemo(
        () => ({
            isLoading,
            streamMap,
            startAll,
            startStream,
        }),
        [isLoading, streamMap, startAll, startStream],
    );
};
