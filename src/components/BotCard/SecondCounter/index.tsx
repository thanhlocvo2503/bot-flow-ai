import { Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SecondCounterProps {
    isRunning?: boolean;
}

const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map((value) => String(value).padStart(2, '0'))
        .join(':');
};

const SecondCounter = ({ isRunning }: SecondCounterProps) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div className="space-y-3">
            <div className="rounded-xl px-4 py-2 text-slate-900 w-fit flex items-center gap-2">
                <Clock3 className="size-4 text-slate-600" />
                <span>{formatDuration(seconds)}</span>
            </div>

            <div className="flex gap-2"></div>
        </div>
    );
};

export default SecondCounter;
