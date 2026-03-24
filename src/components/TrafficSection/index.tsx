import { DataType } from '@/types';

// Utils
import { formatNumber } from '@/utils';

// Components
import Section from '../Section';
import Card from '../Card';

const TrafficSection = ({ data }: { data: DataType }) => (
    <Section title="Traffic">
        <div className="w-full flex gap-2 justify-between">
            <Card
                title="Rank"
                value={formatNumber(data?.traffic?.semrushRank || 0)}
            />
            <Card
                title="Total"
                value={formatNumber(data?.traffic?.totalTraffic || 0)}
            />
            <Card
                title="Organic"
                value={formatNumber(data?.traffic?.organicTraffic || 0)}
            />
            <Card
                title="Ads"
                value={formatNumber(data?.traffic?.adwordsTraffic || 0)}
            />
        </div>
    </Section>
);

export default TrafficSection;
