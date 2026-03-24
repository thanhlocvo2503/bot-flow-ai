// Types
import { AgentEventEnum, StepGroup } from '@/types';

// Constants
import SecondCounter from '@/components/BotCard/SecondCounter';

// Utils
import { getEventTitle } from '@/utils';
import TrafficDialog from '@/components/TrafficDialog';

interface ToolProps {
    isRunning?: boolean;
    stepGroups?: StepGroup[];
}

const Tool = ({ isRunning = false, stepGroups = [] }: ToolProps) => {
    return (
        <div className="rounded-xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
                <div className="mb-3 font-medium">Execution by step</div>
                <SecondCounter isRunning={isRunning} />
            </div>

            <div className="space-y-4">
                {stepGroups.length ? (
                    stepGroups.map((group) => (
                        <div
                            key={`step-${group.step}`}
                            className="rounded-xl border bg-white p-4"
                        >
                            <div className="mb-3 font-semibold text-sm text-gray-700">
                                {group.step >= 0
                                    ? `Step ${group.step}`
                                    : 'General'}
                            </div>

                            <div className="space-y-3">
                                {group.events.map((event, idx) => (
                                    <div
                                        key={`${event.id || idx}-${idx}`}
                                        className="rounded-lg border bg-slate-50 p-3"
                                    >
                                        <div className="mb-2 text-xs font-medium text-gray-500">
                                            {getEventTitle(event)}
                                        </div>

                                        {event?.type ===
                                        AgentEventEnum.THINKING ? (
                                            <pre className="whitespace-pre-wrap break-all text-sm leading-6">
                                                💭{' '}
                                                {event?.payload?.thought ||
                                                    '...'}
                                            </pre>
                                        ) : null}

                                        {event?.type ===
                                        AgentEventEnum.TOOL_CALL ? (
                                            <div className="space-y-2">
                                                <div className="text-xs text-gray-500">
                                                    🔧 Calling:{' '}
                                                    {event?.payload?.name}
                                                </div>
                                                <pre className="whitespace-pre-wrap break-all rounded-md border bg-white p-3 text-xs leading-5">
                                                    {(event?.payload?.result
                                                        ?.output ||
                                                        event?.payload
                                                            ?.input) ??
                                                        {}}
                                                </pre>
                                            </div>
                                        ) : null}

                                        {event?.type ===
                                        AgentEventEnum.ERROR ? (
                                            <div
                                                key={idx}
                                                className="text-red-500 text-sm"
                                            >
                                                ❌ Error:{' '}
                                                {event?.payload?.message}
                                            </div>
                                        ) : null}

                                        {event?.type ===
                                        AgentEventEnum.TOOL_RESULT ? (
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-xs text-gray-500">
                                                        ✅ Done:{' '}
                                                        {event?.payload?.name}
                                                    </div>

                                                    {event?.payload?.name ===
                                                        'semrush_traffic' && (
                                                        <TrafficDialog
                                                            traffic={
                                                                event?.payload
                                                                    ?.result
                                                                    ?.output ??
                                                                {}
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                <pre className="whitespace-pre-wrap break-all rounded-md border bg-white p-3 text-xs leading-5">
                                                    {JSON.stringify(
                                                        event?.payload?.result
                                                            ?.output ?? {},
                                                        null,
                                                        2,
                                                    )}
                                                </pre>
                                            </div>
                                        ) : null}

                                        {event.type ===
                                        AgentEventEnum.FINAL_RESPONSE ? (
                                            <pre className="whitespace-pre-wrap break-all rounded-md border bg-white p-3 text-xs leading-5">
                                                {event?.payload?.answer}
                                            </pre>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-gray-500">No steps yet...</div>
                )}
            </div>
        </div>
    );
};

export default Tool;
