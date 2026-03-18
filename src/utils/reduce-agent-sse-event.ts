import type { AgentStreamState, ParsedSSEEvent, ToolExecution } from '@/types';

export const createInitialAgentStreamState = (): AgentStreamState => ({
    threadId: undefined,
    statuses: [],
    tools: [],
    activeToolId: undefined,
    finalAnswer: '',
    isDone: false,
    isStreaming: false,
    error: null,
});

const createId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const stringifySafe = (value: unknown) =>
    typeof value === 'string' ? value : JSON.stringify(value ?? {}, null, 2);

const getLastToolId = (tools: ToolExecution[]) => tools.at(-1)?.id;

const updateToolById = (
    tools: ToolExecution[],
    toolId: string,
    updater: (tool: ToolExecution) => ToolExecution,
) => tools.map((tool) => (tool.id === toolId ? updater(tool) : tool));

const createTool = (toolName: string, input: unknown): ToolExecution => ({
    id: createId(`tool-${toolName}`),
    tool: toolName,
    status: 'running',
    input: stringifySafe(input),
    output: '',
    assistantMessage: '',
    startedAt: Date.now(),
});

export const reduceAgentSSEEvent = (
    prev: AgentStreamState,
    payload: ParsedSSEEvent,
): AgentStreamState => {
    const { event, data } = payload;

    switch (event) {
        case 'status': {
            if (!data.message && !data.threadId) {
                return prev;
            }

            return {
                ...prev,
                threadId: data.threadId || prev.threadId,
                statuses: data.message
                    ? [...prev.statuses, String(data.message)]
                    : prev.statuses,
            };
        }

        case 'tool': {
            const toolName = String(data.tool || 'unknown_tool');

            if (data.phase === 'start') {
                const newTool = createTool(toolName, data.input);

                return {
                    ...prev,
                    tools: [...prev.tools, newTool],
                    activeToolId: newTool.id,
                };
            }

            if (data.phase === 'end') {
                if (!prev.activeToolId) {
                    return prev;
                }

                const parsedOutput = stringifySafe(data.output);

                return {
                    ...prev,
                    tools: updateToolById(
                        prev.tools,
                        prev.activeToolId,
                        (tool) => ({
                            ...tool,
                            status: 'done',
                            output: parsedOutput,
                            endedAt: Date.now(),
                        }),
                    ),
                    activeToolId: undefined,
                };
            }

            return prev;
        }

        case 'token': {
            if (data.value === undefined || data.value === null) {
                return prev;
            }

            const token = String(data.value);
            const targetToolId = prev.activeToolId ?? getLastToolId(prev.tools);

            if (!targetToolId) {
                return prev;
            }

            return {
                ...prev,
                tools: updateToolById(prev.tools, targetToolId, (tool) => ({
                    ...tool,
                    assistantMessage: tool.assistantMessage + token,
                })),
            };
        }

        case 'final': {
            return {
                ...prev,
                threadId: data.threadId || prev.threadId,
                finalAnswer: String(data.answer || ''),
                activeToolId: undefined,
                isDone: true,
                isStreaming: false,
            };
        }

        default:
            return prev;
    }
};
