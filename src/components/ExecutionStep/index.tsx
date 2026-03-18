import { useEffect } from 'react';

// Components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

// Types
import type { AffiliateItem, AgentStreamStateMap } from '@/types';

const statusColorMap: Record<string, string> = {
    pending: 'text-gray-400',
    running: 'text-blue-500',
    done: 'text-green-600',
    error: 'text-red-500',
};

// const mockItems: AffiliateItem[] = [
//     { name: 'Firecrawl', url: 'https://firecrawl.dev' },
// ];

interface ExecutionStepProps {
    items: AffiliateItem[];
    startAll: () => void;
    streamMap: AgentStreamStateMap;
}

const ExecutionStep = ({ items, startAll, streamMap }: ExecutionStepProps) => {
    useEffect(() => {
        startAll();
    }, [startAll]);

    return (
        <Accordion
            type="multiple"
            className="mt-8 space-y-4 rounded-2xl bg-white p-8 shadow-2xl"
        >
            {items.map((item, index) => {
                const state = streamMap[item.url];

                return (
                    <AccordionItem
                        key={item.url}
                        value={`item-${index}`}
                        className="rounded-xl border px-4"
                    >
                        <AccordionTrigger className="text-left">
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-base font-semibold">
                                    {item.name}
                                </span>
                                <span className="break-all text-sm text-gray-500">
                                    {item.url}
                                </span>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="overflow-hidden">
                            <div className="custom-scroll mt-5 h-135 space-y-5 overflow-y-auto pr-2">
                                <div className="rounded-xl border bg-slate-50 p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-medium">
                                            Stream Info
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {state?.isStreaming
                                                ? 'Streaming...'
                                                : state?.isDone
                                                  ? 'Completed'
                                                  : 'Idle'}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium text-gray-800">
                                            Thread ID:
                                        </span>{' '}
                                        <span className="break-all">
                                            {state?.threadId || '—'}
                                        </span>
                                    </div>

                                    {state?.error && (
                                        <div className="mt-3 text-sm text-red-500">
                                            {state.error}
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-xl border bg-slate-50 p-4">
                                    <div className="mb-3 font-medium">
                                        Statuses
                                    </div>

                                    <div className="space-y-2">
                                        {state?.statuses?.length ? (
                                            state.statuses.map((status, i) => (
                                                <div
                                                    key={`${status}-${i}`}
                                                    className="rounded-md border bg-white p-3 text-sm"
                                                >
                                                    {status}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-sm text-gray-500">
                                                No status yet...
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-xl border bg-slate-50 p-4">
                                    <div className="mb-3 font-medium">
                                        Tools
                                    </div>

                                    <div className="space-y-4">
                                        {state?.tools?.length ? (
                                            state.tools.map((tool) => {
                                                const status =
                                                    tool.status === 'error' ||
                                                    tool.status === 'pending'
                                                        ? tool.status
                                                        : tool.output &&
                                                            tool.assistantMessage
                                                          ? 'done'
                                                          : 'running';

                                                return (
                                                    <div
                                                        key={tool.id}
                                                        className="rounded-xl border bg-white p-4"
                                                    >
                                                        <div className="mb-3 flex items-center justify-between">
                                                            <span className="font-medium">
                                                                {tool.tool}
                                                            </span>
                                                            <span
                                                                className={`text-xs font-semibold uppercase ${statusColorMap[status]}`}
                                                            >
                                                                {status}
                                                            </span>
                                                        </div>

                                                        {tool.input ? (
                                                            <div className="mb-3">
                                                                <div className="mb-1 text-xs font-medium text-gray-500">
                                                                    Input
                                                                </div>
                                                                <pre className="whitespace-pre-wrap rounded-md border bg-slate-50 p-3 text-xs leading-5">
                                                                    {tool.input}
                                                                </pre>
                                                            </div>
                                                        ) : null}

                                                        <div className="mb-3">
                                                            <div className="mb-1 text-xs font-medium text-gray-500">
                                                                Assistant
                                                                message
                                                            </div>
                                                            <pre className="min-h-18 whitespace-pre-wrap rounded-md border bg-slate-50 p-3 text-sm leading-6">
                                                                {tool.assistantMessage ||
                                                                    'Thinking...'}
                                                            </pre>
                                                        </div>

                                                        {tool.output &&
                                                        tool.assistantMessage ? (
                                                            <div>
                                                                <div className="mb-1 text-xs font-medium text-gray-500">
                                                                    Output
                                                                </div>
                                                                <pre className="whitespace-pre-wrap rounded-md border bg-slate-50 p-3 text-xs leading-5">
                                                                    {
                                                                        tool.output
                                                                    }
                                                                </pre>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-sm text-gray-500">
                                                No tools yet...
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-xl border bg-slate-50 p-4">
                                    <div className="mb-3 font-medium">
                                        Final answer
                                    </div>

                                    <pre className="whitespace-pre-wrap rounded-md border bg-white p-4 text-sm leading-6">
                                        {state?.finalAnswer ||
                                            'No final answer yet...'}
                                    </pre>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export default ExecutionStep;
