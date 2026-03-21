import {
    ToolStatusEnum,
    AgentStreamState,
    ParsedSSEEvent,
    ToolExecution,
    StatusItem,
} from '@/types';

export const createInitialAgentStreamState = (): AgentStreamState => ({
    threadId: undefined,
    steps: [],
    tools: [],
    activeToolId: undefined,
    finalAnswer: '',
    isDone: false,
    isStreaming: false,
    error: undefined,
});

const createId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const stringifySafe = (value: unknown) =>
    typeof value === 'string' ? value : JSON.stringify(value ?? {}, null, 2);

const updateToolById = (
    tools: ToolExecution[],
    toolId: string,
    updater: (tool: ToolExecution) => ToolExecution,
) => {
    const index = tools.findIndex((tool) => tool.id === toolId);

    if (index === -1) {
        return tools;
    }

    const nextTools = [...tools];
    nextTools[index] = updater(nextTools[index]);
    return nextTools;
};

const getLastRunningToolIdByName = (
    tools: ToolExecution[],
    toolName: string,
) => {
    for (let i = tools.length - 1; i >= 0; i--) {
        const tool = tools[i];
        if (tool.tool === toolName && tool.status === ToolStatusEnum.RUNNING) {
            return tool.id;
        }
    }

    return undefined;
};

const createTool = (
    toolName: string,
    input: unknown,
    message?: string,
    traceId?: string,
): ToolExecution => ({
    id: createId(`tool-${toolName}`),
    tool: toolName,
    status: ToolStatusEnum.RUNNING,
    input: stringifySafe(input),
    output: '',
    message: message || '',
    traceId,
    startedAt: Date.now(),
});

const hasMeaningfulText = (value?: string) => {
    if (!value) return false;
    return value.trim().length > 0;
};

export const reduceAgentSSEEvent = (
    prev: AgentStreamState,
    payload: ParsedSSEEvent,
): AgentStreamState => {
    const { event, data } = payload;

    switch (event) {
        case 'status': {
            const nextStatus: StatusItem | null = data.message
                ? {
                      message: String(data.message),
                      code: data.code ? String(data.code) : undefined,
                      tool: data.tool ? String(data.tool) : undefined,
                      traceId: data.traceId ? String(data.traceId) : undefined,
                      elapsedMs:
                          typeof data.elapsedMs === 'number'
                              ? data.elapsedMs
                              : undefined,
                      createdAt: Date.now(),
                  }
                : null;

            return {
                ...prev,
                threadId: data.threadId || prev.threadId,
                steps: nextStatus ? [...prev.steps, nextStatus] : prev.steps,
            };
        }

        case 'tool_start': {
            const toolName = String(data.tool || 'unknown_tool');
            const newTool = createTool(
                toolName,
                data.input,
                data.message ? String(data.message) : '',
                data.traceId ? String(data.traceId) : undefined,
            );

            return {
                ...prev,
                tools: [...prev.tools, newTool],
                activeToolId: newTool.id,
            };
        }

        case 'tool_end': {
            const toolName = String(data.tool || 'unknown_tool');
            const targetToolId = getLastRunningToolIdByName(
                prev.tools,
                toolName,
            );

            if (!targetToolId) {
                return prev;
            }

            const parsedOutput = stringifySafe(data.output);
            const elapsedMs =
                typeof data.elapsedMs === 'number' ? data.elapsedMs : undefined;
            const endMessage = data.message ? String(data.message) : '';

            return {
                ...prev,
                tools: updateToolById(prev.tools, targetToolId, (tool) => {
                    const shouldFallbackError =
                        !hasMeaningfulText(parsedOutput) &&
                        !hasMeaningfulText(endMessage);

                    return {
                        ...tool,
                        status: shouldFallbackError
                            ? ToolStatusEnum.ERROR
                            : ToolStatusEnum.DONE,
                        output: parsedOutput,
                        message: hasMeaningfulText(endMessage)
                            ? endMessage
                            : tool.message,
                        elapsedMs,
                        traceId: data.traceId
                            ? String(data.traceId)
                            : tool.traceId,
                        endedAt: Date.now(),
                    };
                }),
                activeToolId:
                    prev.activeToolId === targetToolId
                        ? undefined
                        : prev.activeToolId,
            };
        }

        case 'final_answer': {
            return {
                ...prev,
                threadId: data.threadId || prev.threadId,
                finalAnswer: String(data.content || ''),
                activeToolId: undefined,
                isDone: true,
                isStreaming: false,
            };
        }

        default:
            return prev;
    }
};
