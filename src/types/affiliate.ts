export enum ToolStatusEnum {
    RUNNING = 'RUNNING',
    DONE = 'DONE',
    ERROR = 'ERROR',
    IDLE = 'IDLE',
}

export enum AgentEventEnum {
    THINKING = 'thinking',
    TOOL_CALL = 'tool_call',
    TOOL_RESULT = 'tool_result',
    FINAL_RESPONSE = 'final_response',
    ERROR = 'error',
}

export type AgentEventType =
    | 'thinking'
    | 'tool_call'
    | 'tool_result'
    | 'final_response'
    | 'error';

export type AgentEvent = {
    id?: string;
    type: AgentEventType;
    payload: Record<string, any>;
    timestamp?: string;
};

export type StepGroup = {
    step: number;
    events: AgentEvent[];
};

export type AgentRunState = {
    runId?: string;
    events: AgentEvent[];
    thinking: string;
    finalAnswer?: Record<string, any> | string;
    isStreaming: boolean;
    isDone: boolean;
    error?: string;
};

export type AgentRunStateMap = Record<string, AgentRunState>;

export type ToolExecutionMock = {
    id: string;
    toolName: string;
    content: string;
    status: ToolStatusEnum;
};

export type ToolExecutionMap = Record<string, ToolExecutionMock[]>;

export interface StartPayload {
    domain: string;
    input: string;
    saveMemory: boolean;
}

export type AffiliateItem = {
    name?: string;
    domain: string;
    input: string;
    saveMemory: boolean;
};
