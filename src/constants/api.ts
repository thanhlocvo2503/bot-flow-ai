export const BASE_URL = process.env.VITE_API_ENDPOINT;

export const API_PATH = {
    AGENT_RUN: 'agent/run',
    AGENT_LIVE: (id: string) => `agent/runs/${id}/live`,
};
