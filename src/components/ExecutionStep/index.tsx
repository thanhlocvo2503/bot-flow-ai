import { useEffect } from 'react';

// Components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import StreamInfo from './StreamInfo';
import Connect from './Connect';
import Tool from './Tool';

// Types
import type { AffiliateItem, AgentStreamStateMap } from '@/types';

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
                                <StreamInfo
                                    error={state?.error}
                                    isDone={state?.isDone}
                                    isStreaming={state?.isStreaming}
                                    threadId={state?.threadId}
                                />

                                <Connect items={state?.statuses} />

                                <Tool tools={state?.tools} />

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
