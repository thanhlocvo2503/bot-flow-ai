import { useEffect } from 'react';
import { Dot } from 'lucide-react';

// Constants
import { STATUS } from '@/constants';

// Utils
import { cn } from '@/utils';

// Hooks
import { useMockOllamaStream } from '@/hooks';

import BotActive from '@/assets/images/bot-active-image.webp';
import BotSleeping from '@/assets/images/bot-sleep-image.webp';

interface IBotCardProps {
    status?: STATUS;
}

const BotCard = ({ status = STATUS.ACTIVE }: IBotCardProps) => {
    const { content, isStreaming, startStream, resetStream } =
        useMockOllamaStream();

    useEffect(() => {
        if (status === STATUS.ACTIVE) {
            startStream();
        }

        if (status === STATUS.SLEEPING) {
            resetStream();
        }
    }, [startStream, resetStream, status]);

    return (
        <div className="w-full flex flex-col p-8 mt-8 bg-white rounded-2xl shadow-2xl">
            <div
                className={cn(
                    'flex items-center gap-2 shadow-xl border border-gray-100 shadow-gray-200 rounded-2xl w-45',
                    status === STATUS.ACTIVE &&
                        'text-green-300 shadow-green-200',
                )}
            >
                <Dot
                    className={cn(
                        'size-15 text-gray-600',
                        status === STATUS.ACTIVE &&
                            'text-green-600 animate-pulse',
                    )}
                />

                <span
                    className={cn(
                        'text-gray-600',
                        status === STATUS.ACTIVE &&
                            'text-green-600 animate-pulse',
                    )}
                >
                    {isStreaming ? 'THINKING...' : status}
                </span>
            </div>

            <div
                className={cn(
                    'size-42 rounded-full m-auto flex items-center justify-center',
                    status === STATUS.ACTIVE && 'bg-blue-50/25 animate-bounce',
                )}
            >
                <div
                    className={cn(
                        'w-25 h-25 flex items-center justify-center border-4 border-white shadow-gray-200 bg-gray-100 rounded-full',
                        status === STATUS.ACTIVE &&
                            'shadow-blue-200 bg-blue-100',
                    )}
                >
                    <img
                        src={status === STATUS.ACTIVE ? BotActive : BotSleeping}
                        alt="Bot"
                    />
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                <p className="font-semibold text-xl">
                    I&apos;m{' '}
                    {status === STATUS.ACTIVE
                        ? 'Thinking... 🤯🤯🤯'
                        : 'Sleeping 😴😴😴'}
                </p>

                <pre className="whitespace-pre-wrap mt-5 p-5 border rounded-md w-full">
                    {content}
                </pre>
            </div>
        </div>
    );
};

export default BotCard;
