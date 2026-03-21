interface StreamInfoProps {
    isStreaming?: boolean;
    isDone?: boolean;
    error?: string;
    threadId?: string;
}

const StreamInfo = ({
    error = '',
    isDone = false,
    isStreaming = false,
    threadId = '',
}: StreamInfoProps) => {
    const statusColor = isDone
        ? 'text-green-500'
        : isStreaming
          ? 'text-blue-500'
          : 'text-gray-500';

    return (
        <div className="rounded-xl border bg-slate-50 p-4">
            <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">Stream Info</span>
                <span className={`text-sm font-semibold ${statusColor}`}>
                    {isStreaming
                        ? 'Streaming...'
                        : isDone
                          ? 'Completed'
                          : 'Idle'}
                </span>
            </div>

            <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Thread ID:</span>{' '}
                <span className="break-all">{threadId || '—'}</span>
            </div>

            {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
        </div>
    );
};

export default StreamInfo;
