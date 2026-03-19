import { DataType } from '@/types';

// Utils
import { formatNumber } from '@/utils';

// Components
import Section from '../Section';
import Card from '../Card';

const TrafficSection = ({ data }: { data: DataType }) => (
    <Section title="Traffic">
        <div className="w-full flex justify-between">
            <Card title="Rank" value={formatNumber(data.traffic.semrushRank)} />
            <Card
                title="Total"
                value={formatNumber(data.traffic.totalTraffic)}
            />
            <Card
                title="Organic"
                value={formatNumber(data.traffic.organicTraffic)}
            />
            <Card
                title="Ads"
                value={formatNumber(data.traffic.adwordsTraffic)}
            />
        </div>
    </Section>
);

export default TrafficSection;
