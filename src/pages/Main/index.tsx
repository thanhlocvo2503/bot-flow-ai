import { useState } from 'react';

// Components
import { BotCard, DomainTabs, FlowForm } from '@/components';

// Types
import { AffiliateItem } from '@/types';
import { TFlowForm } from '@/components/FlowForm/schema';

// Constants
import { STATUS } from '@/constants';

// Hooks
import { useAgentSSEMultiStream } from '@/hooks';

export const MainPage = () => {
    const [items, setItems] = useState<AffiliateItem[]>([]);

    const { streamMap, isLoading, startAll } = useAgentSSEMultiStream(items);

    const statusBot = isLoading ? STATUS.ACTIVE : STATUS.SLEEPING;

    const handleSubmitForm = (data: TFlowForm) => {
        const payload = {
            ...data,
            saveMemory: true,
        };

        setItems([payload]);
    };

    return (
        <div className="w-full">
            <div className="w-full max-w-6xl m-auto flex flex-col items-center mt-8">
                <h2 className="text-5xl font-semibold">Start Automation</h2>
                <p className="mt-2 text-lg text-gray-500 w-143 text-center">
                    Configure your bot by providing a URL and specific
                    instructions for the automation task.
                </p>

                <FlowForm onSubmit={handleSubmitForm} isLoading={isLoading} />

                <BotCard status={statusBot} isRunning={isLoading} />
            </div>

            <div className="w-full max-w-6xl m-auto flex flex-col items-center mb-8">
                {items.length ? (
                    <DomainTabs
                        items={items}
                        streamMap={streamMap}
                        startAll={startAll}
                    />
                ) : null}
            </div>
        </div>
    );
};
