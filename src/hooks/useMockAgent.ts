import { useEffect, useRef, useState } from 'react';

// Types
import { AffiliateItem, ToolExecutionMap, ToolStatusEnum } from '@/types';

// Utils
import { buildMockToolStreams } from '@/utils';

type TimeoutRefMap = Record<string, number[]>;

const TOOL_DELAY_GAP = 300;
const TOKEN_DELAY = 80;

export const useMockAgent = (data: AffiliateItem[]) => {
    const [contents, setContents] = useState<ToolExecutionMap>({});
    const timeoutRefs = useRef<TimeoutRefMap>({});

    useEffect(() => {
        if (!data.length) return;

        const nextState: ToolExecutionMap = {};

        data.forEach((item) => {
            const tools = buildMockToolStreams(item.name, item.url);

            nextState[item.url] = tools.map((tool) => ({
                id: tool.toolId,
                toolName: tool.toolName,
                content: '',
                status: ToolStatusEnum.PENDING,
            }));
        });

        setContents(nextState);

        data.forEach((item, itemIndex) => {
            const tools = buildMockToolStreams(item.name, item.url);

            timeoutRefs.current[item.url] = [];

            tools.forEach((tool, toolIndex) => {
                const baseDelay =
                    itemIndex * 250 +
                    toolIndex * tool.chunks.length * TOKEN_DELAY +
                    toolIndex * TOOL_DELAY_GAP;

                const startTimeout = window.setTimeout(() => {
                    setContents((prev) => ({
                        ...prev,
                        [item.url]: (prev[item.url] || []).map((currentTool) =>
                            currentTool.id === tool.toolId
                                ? {
                                      ...currentTool,
                                      status: ToolStatusEnum.RUNNING,
                                  }
                                : currentTool,
                        ),
                    }));
                }, baseDelay);

                timeoutRefs.current[item.url].push(startTimeout);

                tool.chunks.forEach((chunk, chunkIndex) => {
                    const timeoutId = window.setTimeout(
                        () => {
                            const parsed = JSON.parse(chunk) as {
                                message?: { content?: string };
                                done?: boolean;
                            };

                            setContents((prev) => {
                                const currentTools = prev[item.url] || [];

                                const updatedTools = currentTools.map(
                                    (currentTool) => {
                                        if (currentTool.id !== tool.toolId) {
                                            return currentTool;
                                        }

                                        const nextContent =
                                            currentTool.content +
                                            (parsed.message?.content || '');

                                        return {
                                            ...currentTool,
                                            content: nextContent,
                                            status: parsed.done
                                                ? ToolStatusEnum.DONE
                                                : ToolStatusEnum.RUNNING,
                                        };
                                    },
                                );

                                return {
                                    ...prev,
                                    [item.url]: updatedTools,
                                };
                            });
                        },
                        baseDelay + chunkIndex * TOKEN_DELAY,
                    );

                    timeoutRefs.current[item.url].push(timeoutId);
                });
            });
        });

        return () => {
            Object.values(timeoutRefs.current).forEach((timeouts) => {
                timeouts.forEach((timeoutId) => {
                    window.clearTimeout(timeoutId);
                });
            });

            timeoutRefs.current = {};
        };
    }, [data]);

    return {
        contents,
    };
};
