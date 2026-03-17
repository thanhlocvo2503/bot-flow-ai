export type AffiliateItem = {
    name: string;
    url: string;
};

export type ToolStatus = 'pending' | 'running' | 'done' | 'error';

export type ToolExecution = {
    id: string;
    toolName: string;
    content: string;
    status: ToolStatus;
};

export type ToolExecutionMap = Record<string, ToolExecution[]>;
