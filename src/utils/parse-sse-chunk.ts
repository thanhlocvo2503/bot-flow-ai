import { AgentEventEnum, type AgentEvent, type StepGroup } from '@/types';

export const parseSSEChunk = (raw: string): AgentEvent[] => {
    const blocks = raw.split('\n\n').filter((block) => block.trim());

    return blocks
        .map((block): AgentEvent | null => {
            const lines = block.split('\n');

            const idLine = lines.find((line) => line.startsWith('id:'));
            const dataLines = lines.filter((line) => line.startsWith('data:'));

            if (!dataLines.length) {
                return null;
            }

            const rawData = dataLines
                .map((line) => line.replace('data:', '').trim())
                .join('\n');

            try {
                const parsed = JSON.parse(rawData);

                return {
                    id: idLine?.replace('id:', '').trim(),
                    type: parsed.type,
                    payload: parsed.payload ?? {},
                    timestamp: parsed.timestamp,
                };
            } catch {
                return null;
            }
        })
        .filter((event): event is AgentEvent => event !== null);
};

export const groupEventsByStep = (events: AgentEvent[]): StepGroup[] => {
    const stepMap = new Map<number, AgentEvent[]>();

    for (const event of events) {
        const step =
            typeof event.payload?.step === 'number' ? event.payload.step : -1;

        if (!stepMap.has(step)) {
            stepMap.set(step, []);
        }

        stepMap.get(step)!.push(event);
    }

    return [...stepMap.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([step, groupedEvents]) => ({
            step,
            events: groupedEvents,
        }));
};

export const getEventTitle = (event: AgentEvent) => {
    switch (event.type) {
        case AgentEventEnum.THINKING:
            return 'Thinking';
        case AgentEventEnum.TOOL_CALL:
            return `Tool Call · ${event.payload?.name || 'unknown_tool'}`;
        case AgentEventEnum.TOOL_RESULT:
            return `Tool Result · ${event.payload?.name || 'unknown_tool'}`;
        case AgentEventEnum.FINAL_RESPONSE:
            return 'Final Response';
        default:
            return event.type;
    }
};
