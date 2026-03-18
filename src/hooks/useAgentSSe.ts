import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Types
import type {
    AffiliateItem,
    AgentStreamState,
    AgentStreamStateMap,
    StartPayload,
} from '@/types';

// Utils
import {
    createInitialAgentStreamState,
    parseSSEChunk,
    reduceAgentSSEEvent,
} from '@/utils';

// Services
import { aiPost } from '@/services';

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
    domain: getDomainFromUrl(item.url),
    prompt: item.prompt,
});

export const useAgentSSEMultiStream = (items: AffiliateItem[]) => {
    const [streamMap, setStreamMap] = useState<AgentStreamStateMap>({});
    const [activeCount, setActiveCount] = useState(0);

    const abortMapRef = useRef<Record<string, AbortController>>({});

    const isLoading = activeCount > 0;

    const updateStreamState = useCallback(
        (
            url: string,
            updater: (prev: AgentStreamState) => AgentStreamState,
        ) => {
            setStreamMap((prev) => {
                const current = prev[url] ?? createInitialAgentStreamState();

                return {
                    ...prev,
                    [url]: updater(current),
                };
            });
        },
        [],
    );

    const beginStream = useCallback(
        (url: string) => {
            setActiveCount((prev) => prev + 1);

            updateStreamState(url, () => ({
                ...createInitialAgentStreamState(),
                isStreaming: true,
                error: undefined,
            }));
        },
        [updateStreamState],
    );

    const finishStream = useCallback(
        (url: string) => {
            setActiveCount((prev) => Math.max(0, prev - 1));

            updateStreamState(url, (prev) => ({
                ...prev,
                isStreaming: false,
            }));
        },
        [updateStreamState],
    );

    const stopStream = useCallback(
        (url: string) => {
            const controller = abortMapRef.current[url];

            if (!controller) return;

            controller.abort();
            delete abortMapRef.current[url];

            finishStream(url);
        },
        [finishStream],
    );

    const consumeReader = useCallback(
        async (
            url: string,
            reader: ReadableStreamDefaultReader<Uint8Array>,
        ) => {
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

                    for (const event of events) {
                        updateStreamState(url, (prev) =>
                            reduceAgentSSEEvent(
                                {
                                    ...prev,
                                    isStreaming: true,
                                    error: undefined,
                                },
                                event,
                            ),
                        );
                    }
                }
            }

            if (buffer.trim()) {
                const remainEvents = parseSSEChunk(buffer);

                for (const event of remainEvents) {
                    updateStreamState(url, (prev) =>
                        reduceAgentSSEEvent(
                            {
                                ...prev,
                                isStreaming: true,
                                error: undefined,
                            },
                            event,
                        ),
                    );
                }
            }
        },
        [updateStreamState],
    );

    const startStream = useCallback(
        async (item: AffiliateItem) => {
            stopStream(item.url);

            const controller = new AbortController();
            abortMapRef.current[item.url] = controller;

            beginStream(item.url);

            try {
                const payload = buildPayloadFromItem(item);
                const reader = await aiPost(payload, controller.signal);

                await consumeReader(item.url, reader);

                updateStreamState(item.url, (prev) => ({
                    ...prev,
                    isStreaming: false,
                }));
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    updateStreamState(item.url, (prev) => ({
                        ...prev,
                        isStreaming: false,
                        error:
                            err instanceof Error
                                ? err.message
                                : 'Unknown stream error',
                    }));
                }
            } finally {
                delete abortMapRef.current[item.url];
                finishStream(item.url);
            }
        },
        [
            beginStream,
            consumeReader,
            finishStream,
            stopStream,
            updateStreamState,
        ],
    );

    const startAll = useCallback(() => {
        items.forEach((item) => {
            void startStream(item);
        });
    }, [items, startStream]);

    const stopAll = useCallback(() => {
        Object.keys(abortMapRef.current).forEach((url) => {
            abortMapRef.current[url]?.abort();
            delete abortMapRef.current[url];
        });

        setActiveCount(0);

        setStreamMap((prev) => {
            const next = { ...prev };

            Object.keys(next).forEach((url) => {
                next[url] = {
                    ...next[url],
                    isStreaming: false,
                };
            });

            return next;
        });
    }, []);

    useEffect(() => {
        const initialMap: AgentStreamStateMap = {};

        items.forEach((item) => {
            initialMap[item.url] = createInitialAgentStreamState();
        });

        setStreamMap(initialMap);

        return () => {
            Object.values(abortMapRef.current).forEach((controller) => {
                controller.abort();
            });
            abortMapRef.current = {};
        };
    }, [items]);

    return useMemo(
        () => ({
            isLoading,
            streamMap,
            startAll,
            startStream,
            stopAll,
            stopStream,
        }),
        [isLoading, startAll, startStream, stopAll, stopStream, streamMap],
    );
};
