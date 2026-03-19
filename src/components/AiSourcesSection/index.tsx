import { DataType } from '@/types';

// Components
import Section from '../Section';

const AiSourcesSection = ({ data }: { data: DataType }) => (
    <Section title="AI Sources">
        <div className="space-y-3 flex gap-2">
            {data.aiSources.sources.map((s) => (
                <div
                    key={s.domain}
                    className="flex justify-between h-full items-center gap-2 rounded-xl bg-gray-50 px-4 py-3"
                >
                    <span>{s.domain}</span>
                    <span className="text-sm text-gray-500">
                        {s.mentions_count} mentions
                    </span>
                </div>
            ))}
        </div>
    </Section>
);

export default AiSourcesSection;
