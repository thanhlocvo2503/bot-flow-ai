import { useEffect, useState } from 'react';

interface SecondCounterProps {
    isRunning?: boolean;
}

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
            <div className="rounded-xl px-4 py-2 text-slate-900 w-fit">
                ⏱ {seconds}s
            </div>

            <div className="flex gap-2"></div>
        </div>
    );
};

export default SecondCounter;
