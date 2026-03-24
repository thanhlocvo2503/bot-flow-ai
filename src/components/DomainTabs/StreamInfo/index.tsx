import RunGif from '@/assets/images/running-image.gif';
import ComingGif from '@/assets/images/emo-robot-is-coming.gif';
import IdeGif from '@/assets/images/angy-emo-robot.gif';

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
        <div className="rounded-xl border bg-slate-50 p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Run ID:</span>{' '}
                <span className="break-all">{threadId || '—'}</span>
                {error && (
                    <div className="mt-3 text-sm text-red-500">{error}</div>
                )}
            </div>

            <span className={`text-sm font-semibold ${statusColor}`}>
                {isStreaming ? (
                    <img src={ComingGif} alt="Loading" width="50" height="50" />
                ) : isDone ? (
                    <img src={RunGif} alt="Loading" width="50" height="50" />
                ) : (
                    <img src={IdeGif} alt="Loading" width="50" height="50" />
                )}
            </span>
        </div>
    );
};

export default StreamInfo;
