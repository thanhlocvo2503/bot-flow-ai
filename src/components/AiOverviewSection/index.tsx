import { DataType } from '@/types';

// Utils
import { formatNumber } from '@/utils';

// Components
import Section from '../Section';
import Card from '../Card';

const AiOverviewSection = ({ data }: { data: DataType }) => (
    <Section title="AI Overview">
        <div className="grid grid-cols-2 gap-4">
            <Card
                title="Cited"
                value={formatNumber(data.aiOverview.citedPages)}
            />
            <Card title="Visibility" value={data.aiOverview.visibility} />
        </div>
    </Section>
);

export default AiOverviewSection;
