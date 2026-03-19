import { DataType } from '@/types';

// Utils
import { formatNumber } from '@/utils';

// Components
import Section from '../Section';

const CompetitorsSection = ({ data }: { data: DataType }) => (
    <Section title="Competitors">
        <div className="space-y-3 flex w-full gap-2">
            {data.competitors.map((c) => (
                <div
                    key={c.domain}
                    className="flex justify-between w-full h-full rounded-xl bg-gray-50 px-4 py-3"
                >
                    <div>
                        <p className="font-medium">{c.domain}</p>
                        <p className="text-sm text-gray-500">
                            {formatNumber(c.traffic)}
                        </p>
                    </div>
                    <span className="rounded-full flex items-center justify-center bg-slate-900 px-3 py-1 size-8 text-xs text-white">
                        {c.competitionLvl}
                    </span>
                </div>
            ))}
        </div>
    </Section>
);

export default CompetitorsSection;
