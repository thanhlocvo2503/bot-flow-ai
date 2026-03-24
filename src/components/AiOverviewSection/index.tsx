import { DataType } from '@/types';

// Utils
import { formatNumber } from '@/utils';

// Components
import Section from '../Section';
import Card from '../Card';

interface AiOverviewSectionProps {
    data: DataType;
}

const AiOverviewSection = ({ data }: AiOverviewSectionProps) => (
    <Section title="AI Overview">
        <div className="grid grid-cols-2 gap-4">
            <Card
                title="Cited"
                value={formatNumber(data?.aiOverview?.citedPages || 0)}
            />
            <Card
                title="Visibility"
                value={data?.aiOverview?.visibility || 0}
            />
        </div>
    </Section>
);

export default AiOverviewSection;
