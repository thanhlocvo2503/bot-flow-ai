// Types
import { StartPayload } from '@/types';

// Constants
import { API_PATH, BASE_URL } from '@/constants';

export const createAgentRun = async (
    payload: StartPayload,
    signal?: AbortSignal,
) => {
    const response = await fetch(`${BASE_URL}/${API_PATH.AGENT_RUN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal,
    });

    if (!response.ok) {
        throw new Error(`Create run failed: HTTP ${response.status}`);
    }

    const data = await response.json();

    return data as {
        runId: string;
    };
};

export const getAgentRunLiveReader = async (
    runId: string,
    signal?: AbortSignal,
) => {
    const response = await fetch(`${BASE_URL}/${API_PATH.AGENT_LIVE(runId)}`, {
        method: 'GET',
        headers: {
            Accept: 'text/event-stream',
        },
        signal,
    });

    if (!response.ok) {
        throw new Error(`Live stream failed: HTTP ${response.status}`);
    }

    if (!response.body) {
        throw new Error('Live stream response body is empty');
    }

    return response.body.getReader();
};
