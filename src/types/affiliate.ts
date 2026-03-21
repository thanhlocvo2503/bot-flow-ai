export enum ToolStatusEnum {
    RUNNING = 'RUNNING',
    DONE = 'DONE',
    ERROR = 'ERROR',
}

export type SSEEventName =
    | 'status'
    | 'tool_start'
    | 'tool_end'
    | 'final_answer';

export type ParsedSSEEvent = {
    event: SSEEventName;
    data: Record<string, any>;
};

export type StatusItem = {
    message: string;
    code?: string;
    tool?: string;
    traceId?: string;
    elapsedMs?: number;
    createdAt: number;
};

export type ToolExecution = {
    id: string;
    tool: string;
    status: ToolStatusEnum;
    input?: string;
    output?: string;
    message?: string;
    traceId?: string;
    elapsedMs?: number;
    startedAt?: number;
    endedAt?: number;
};

export type AgentStreamState = {
    threadId?: string;
    steps: StatusItem[];
    tools: ToolExecution[];
    activeToolId?: string;
    finalAnswer: string;
    isDone: boolean;
    isStreaming: boolean;
    error?: string;
};

export type AgentStreamStateMap = Record<string, AgentStreamState>;

export type ToolExecutionMock = {
    id: string;
    toolName: string;
    content: string;
    status: ToolStatusEnum;
};

export type ToolExecutionMap = Record<string, ToolExecutionMock[]>;

export interface StartPayload {
    domain: string;
    prompt: string;
}

export type AffiliateItem = {
    name?: string;
    url: string;
    prompt: string;
};
