// Components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

// Types
import { StatusItem } from '@/types';

interface ConnectProps {
    items?: StatusItem[];
}

const Connect = ({ items = [] }: ConnectProps) => (
    <Accordion type="multiple" className="mt-8 space-y-4 border p-2 rounded-sm">
        <AccordionItem value="item-1" className="rounded-xl ">
            <AccordionTrigger className="text-left p-0">
                <span className="text-sm">Steps</span>
            </AccordionTrigger>

            <AccordionContent className="overflow-hidden flex gap-2 flex-col h-fit mt-1">
                {items?.length ? (
                    items.map((step, i) => (
                        <div
                            key={`${step}-${i}`}
                            className="rounded-md border bg-white p-2 text-sm flex justify-between"
                        >
                            {step.code && (
                                <span className="uppercase text-sm">
                                    {step.code}:
                                </span>
                            )}
                            <span className="text-xs text-indigo-600">
                                {step.message}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-gray-500">No step yet...</div>
                )}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);

export default Connect;
