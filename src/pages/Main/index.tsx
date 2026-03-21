import { useState } from 'react';

// Components
import { BotCard, ExecutionStep, FlowForm } from '@/components';

// Types
import { AffiliateItem } from '@/types';
import { TFlowForm } from '@/components/FlowForm/schema';

// Constants
import { STATUS } from '@/constants';

// Hooks
import { useAgentSSEMultiStream } from '@/hooks';

export const MainPage = () => {
    const [statusBot, setStatusBot] = useState<STATUS>(STATUS.SLEEPING);
    const [items, setItems] = useState<AffiliateItem[]>([]);

    const { streamMap, isLoading, startAll, stopAll } =
        useAgentSSEMultiStream(items);

    const handleSubmitForm = (data: TFlowForm) => {
        setItems([data]);
        setStatusBot(STATUS.ACTIVE);
    };

    return (
        <div className="w-full max-w-4xl m-auto flex flex-col items-center my-16">
            <h2 className="text-5xl font-semibold">Start Automation</h2>
            <p className="mt-2 text-lg text-gray-500 w-143 text-center">
                Configure your bot by providing a URL and specific instructions
                for the automation task.
            </p>

            <FlowForm
                onSubmit={handleSubmitForm}
                isLoading={isLoading}
                onStopAgent={stopAll}
            />

            <BotCard status={statusBot} />

            {items.length ? (
                <ExecutionStep
                    isLoading={isLoading}
                    items={items}
                    streamMap={streamMap}
                    startAll={startAll}
                />
            ) : null}
        </div>
    );
};
