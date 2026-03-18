export type AffiliateItem = {
    name?: string;
    url: string;
    prompt: string;
};

export type SSEEventName = 'status' | 'tool' | 'token' | 'final';

export type ParsedSSEEvent = {
    event: SSEEventName;
    data: Record<string, any>;
};

export enum ToolStatusEnum {
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    DONE = 'DONE',
    ERROR = 'ERROR',
}

export type ToolExecution = {
    id: string;
    tool: string;
    status: ToolStatusEnum;
    input?: string;
    output?: string;
    assistantMessage: string;
    startedAt?: number;
    endedAt?: number;
};

export type AgentStreamState = {
    threadId?: string;
    statuses: string[];
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
