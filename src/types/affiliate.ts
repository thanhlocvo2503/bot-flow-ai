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

export type ToolStatus = 'pending' | 'running' | 'done' | 'error';

export type ToolExecution = {
    id: string;
    tool: string;
    status: ToolStatus;
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
    error?: string | null;
};

export type AgentStreamStateMap = Record<string, AgentStreamState>;

export type ToolExecutionMock = {
    id: string;
    toolName: string;
    content: string;
    status: ToolStatus;
};

export type ToolExecutionMap = Record<string, ToolExecutionMock[]>;

export interface StartPayload {
    domain: string;
    prompt: string;
}
