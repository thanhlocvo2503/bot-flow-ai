import { useEffect } from 'react';

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StreamInfo from './StreamInfo';
import Tool from './Tool';

// Types
import { AffiliateItem, AgentRunStateMap } from '@/types';
import { groupEventsByStep } from '@/utils';

interface DomainTabsProps {
    items: AffiliateItem[];
    startAll: () => void;
    streamMap: AgentRunStateMap;
}

const DomainTabs = ({ items, startAll, streamMap }: DomainTabsProps) => {
    useEffect(() => {
        startAll();
    }, [startAll]);

    return (
        <Tabs
            defaultValue={items[0]?.domain}
            className="w-full mt-5"
            orientation="vertical"
        >
            <TabsList className="p-2 bg-white gap-3">
                {items.map((item) => (
                    <TabsTrigger
                        key={item.domain}
                        value={item.domain}
                        className="text-left hover:bg-slate-500"
                    >
                        {item.domain}
                    </TabsTrigger>
                ))}
            </TabsList>
            {items.map((item) => {
                const state = streamMap[item.domain];
                const stepGroups = groupEventsByStep(state?.events || []);

                return (
                    <TabsContent
                        key={item.domain}
                        value={item.domain}
                        className="max-w-5xl! rounded-sm bg-white p-8 shadow-2xl"
                    >
                        <div className="custom-scroll max-h-187 space-y-5 overflow-y-auto pr-2">
                            <StreamInfo
                                error={state?.error}
                                isDone={state?.isDone}
                                isStreaming={state?.isStreaming}
                                threadId={state?.runId}
                            />

                            <Tool
                                stepGroups={stepGroups}
                                isRunning={state?.isStreaming}
                            />
                        </div>
                    </TabsContent>
                );
            })}
        </Tabs>
    );
};

export default DomainTabs;
