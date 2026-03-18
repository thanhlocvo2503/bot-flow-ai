// Types
import { StartPayload } from '@/types';

// Constants
import { API_PATH, BASE_URL } from '@/constants';

export const aiPost = async (payload: StartPayload, signal?: AbortSignal) => {
    const response = await fetch(`${BASE_URL}${API_PATH.RESEARCH_DOMAIN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
        },
        body: JSON.stringify(payload),
        signal: signal,
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    if (!response.body) {
        throw new Error('Response body is empty');
    }

    return response.body.getReader();
};
