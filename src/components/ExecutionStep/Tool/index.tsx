import { useMemo } from 'react';

// Types
import { ToolExecution, ToolStatusEnum } from '@/types';

// Constants
import { STATUS_COLOR_MAP } from '@/constants';
import TrafficDialog from '@/components/TrafficDialog';
import SecondCounter from '@/components/BotCard/SecondCounter';

interface ToolProps {
    isRunning?: boolean;
    tools: ToolExecution[];
}

const Tool = ({ isRunning = false, tools = [] }: ToolProps) => {
    const displayStatus = useMemo(
        () => (tool: ToolExecution) =>
            tool.status === ToolStatusEnum.ERROR
                ? tool.status
                : tool.output && tool.message
                  ? ToolStatusEnum.DONE
                  : ToolStatusEnum.RUNNING,
        [],
    );

    return (
        <div className="rounded-xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
                <div className="mb-3 font-medium">Tools</div>
                <SecondCounter isRunning={isRunning} />
            </div>

            <div className="space-y-4">
                {tools.length ? (
                    tools.map((tool) => {
                        const status = displayStatus(tool);

                        return (
                            <div
                                key={tool.id}
                                className="rounded-xl border bg-white p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-start flex-col gap-1">
                                        <span className="font-medium">
                                            {tool.tool}
                                        </span>

                                        <span
                                            className={`text-xs font-semibold uppercase ${STATUS_COLOR_MAP[status]}`}
                                        >
                                            {status}
                                        </span>
                                    </div>
                                    {tool.tool === 'traffic' ? (
                                        <TrafficDialog />
                                    ) : null}
                                </div>

                                {tool.input ? (
                                    <div className="mb-3">
                                        <div className="mb-1 text-xs font-medium text-gray-500">
                                            Input
                                        </div>
                                        <pre className="whitespace-pre-wrap rounded-md border bg-slate-50 p-3 text-xs leading-5">
                                            {tool.input}
                                        </pre>
                                    </div>
                                ) : null}

                                <div className="mb-3">
                                    <div className="mb-1 text-xs font-medium text-gray-500">
                                        Assistant message
                                    </div>
                                    <pre className="min-h-18 whitespace-pre-wrap rounded-md border bg-slate-50 p-3 text-sm leading-6">
                                        {tool.message || 'Thinking...'}
                                    </pre>
                                </div>

                                {tool.output && tool.message ? (
                                    <div className="max-w-178 min-w-0">
                                        <div className="flex justify-between mb-1 text-xs font-medium text-gray-500">
                                            Output
                                            {typeof tool.elapsedMs ===
                                            'number' ? (
                                                <div className="text-xs text-gray-500">
                                                    {tool.elapsedMs} ms
                                                </div>
                                            ) : null}
                                        </div>
                                        <pre className="whitespace-pre-wrap wrap-break-word break-all overflow-x-auto rounded-md border bg-slate-50 p-3 text-xs leading-5">
                                            {tool.output}
                                        </pre>
                                    </div>
                                ) : null}
                            </div>
                        );
                    })
                ) : isRunning ? (
                    <div className="text-sm text-gray-500">Running...</div>
                ) : (
                    <div className="text-sm text-gray-500">No tools yet...</div>
                )}
            </div>
        </div>
    );
};

export default Tool;
