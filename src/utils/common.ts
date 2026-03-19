import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const MOCK_OLLAMA_LINES = [
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:18.861515465Z","message":{"role":"assistant","content":"I"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:18.980569405Z","message":{"role":"assistant","content":" am"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.103323923Z","message":{"role":"assistant","content":" processing"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.226689591Z","message":{"role":"assistant","content":" your"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.336960808Z","message":{"role":"assistant","content":" work"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.446540733Z","message":{"role":"assistant","content":","},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.560507158Z","message":{"role":"assistant","content":" please"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.672985958Z","message":{"role":"assistant","content":" wait"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.782895241Z","message":{"role":"assistant","content":"."},"done":false}`,

    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.890388862Z","message":{"role":"assistant","content":" In"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:19.999497401Z","message":{"role":"assistant","content":" the"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.109269835Z","message":{"role":"assistant","content":" meantime"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.219476987Z","message":{"role":"assistant","content":" you"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.333630914Z","message":{"role":"assistant","content":" can"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.44062652Z","message":{"role":"assistant","content":" go"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.552783354Z","message":{"role":"assistant","content":" to"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.662420568Z","message":{"role":"assistant","content":" sleep"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.773407753Z","message":{"role":"assistant","content":" and"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.881698403Z","message":{"role":"assistant","content":" everything"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:20.981698403Z","message":{"role":"assistant","content":" will"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:21.081698403Z","message":{"role":"assistant","content":" be"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:21.181698403Z","message":{"role":"assistant","content":" fine"},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:21.281698403Z","message":{"role":"assistant","content":"."},"done":false}`,
    `{"model":"qwen2.5:7b","created_at":"2026-03-16T09:17:21.381698403Z","message":{"role":"assistant","content":""},"done":true,"done_reason":"stop"}`,
];

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function createMockOllamaStream(delay = 120) {
    const encoder = new TextEncoder();

    return new ReadableStream<Uint8Array>({
        start(controller) {
            let index = 0;

            const push = () => {
                if (index >= MOCK_OLLAMA_LINES.length) {
                    controller.close();
                    return;
                }

                const line = MOCK_OLLAMA_LINES[index] + '\n';
                controller.enqueue(encoder.encode(line));
                index += 1;

                setTimeout(push, delay);
            };

            push();
        },
    });
}

export const formatNumber = (value: number) =>
    new Intl.NumberFormat().format(value);
