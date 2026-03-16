import { useCallback, useRef, useState } from 'react';

// Utils
import { createMockOllamaStream } from '@/utils';

export function useMockOllamaStream() {
    const [content, setContent] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const runningRef = useRef(false);

    const startStream = useCallback(async () => {
        if (runningRef.current) return;

        runningRef.current = true;
        setContent('');
        setIsStreaming(true);

        const stream = createMockOllamaStream(100);
        const reader = stream.getReader();
        const decoder = new TextDecoder();

        let buffer = '';

        try {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed) continue;

                    const json = JSON.parse(trimmed);
                    const delta = json?.message?.content ?? '';

                    if (delta) {
                        setContent((prev) => prev + delta);
                    }

                    if (json?.done) {
                        runningRef.current = false;
                        setIsStreaming(false);
                        return;
                    }
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            runningRef.current = false;
            setIsStreaming(false);
        }
    }, []);

    const resetStream = useCallback(() => {
        runningRef.current = false;
        setContent("I'm relaxing. Please wake me up when you need me 😌😌😌");
        setIsStreaming(false);
    }, []);

    return {
        content,
        isStreaming,
        startStream,
        resetStream,
    };
}
