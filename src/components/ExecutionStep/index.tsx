// Mocks
import { mockAffiliateData } from '@/__mocks__';

// Components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

// Hooks
import { useMockAgentExecutionStream } from '@/hooks';

const statusColorMap: Record<string, string> = {
    pending: 'text-gray-400',
    running: 'text-blue-500',
    done: 'text-green-600',
    error: 'text-red-500',
};

const ExecutionStep = () => {
    const data = mockAffiliateData;
    const { contents } = useMockAgentExecutionStream(data);

    return (
        <Accordion
            type="multiple"
            className="p-8 mt-8 bg-white rounded-2xl shadow-2xl space-y-4"
        >
            {data.map((item, index) => (
                <AccordionItem
                    key={item.url}
                    value={`item-${index}`}
                    className="border rounded-xl px-4"
                >
                    <AccordionTrigger className="text-left">
                        <div className="flex flex-col items-start gap-1">
                            <span className="font-semibold text-base">
                                {item.name}
                            </span>
                            <span className="text-sm text-gray-500 break-all">
                                {item.url}
                            </span>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="mt-5 max-h-100 overflow-y-auto pr-2 space-y-4 custom-scroll">
                            {(contents[item.url] || []).map((tool) => (
                                <div
                                    key={tool.id}
                                    className="border rounded-md p-4 bg-slate-50"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-medium">
                                            {tool.toolName}
                                        </span>

                                        <span
                                            className={`text-xs font-medium uppercase ${statusColorMap[tool.status]}`}
                                        >
                                            {tool.status}
                                        </span>
                                    </div>

                                    <pre className="whitespace-pre-wrap text-sm leading-6">
                                        {tool.content || 'Thinking...'}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default ExecutionStep;
