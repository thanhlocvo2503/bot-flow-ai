import { ParsedSSEEvent, SSEEventName } from '@/types';

export const parseSSEChunk = (raw: string): ParsedSSEEvent[] => {
    const blocks = raw.split('\n\n').filter((block) => block.trim());

    return blocks
        .map((block) => {
            const lines = block.split('\n');

            const eventLine = lines.find((line) => line.startsWith('event:'));
            const dataLines = lines.filter((line) => line.startsWith('data:'));

            if (!eventLine || !dataLines.length) {
                return null;
            }

            const event = eventLine
                .replace('event:', '')
                .trim() as SSEEventName;
            const rawData = dataLines
                .map((line) => line.replace('data:', '').trim())
                .join('\n');

            try {
                return {
                    event,
                    data: JSON.parse(rawData),
                };
            } catch {
                return {
                    event,
                    data: { raw: rawData },
                };
            }
        })
        .filter(Boolean) as ParsedSSEEvent[];
};
