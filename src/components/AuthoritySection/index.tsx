import { DataType } from '@/types';

// Utils
import { formatNumber } from '@/utils';

// Components
import Section from '../Section';
import Card from '../Card';

interface AuthoritySectionProps {
    data: DataType;
}

const AuthoritySection = ({ data }: AuthoritySectionProps) => (
    <Section title="Authority">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card
                title="Backlinks"
                value={formatNumber(data?.authority?.backlinks || 0)}
            />
            <Card title="Score" value={data?.authority?.authorityScore || 0} />
            <Card
                title="Domains"
                value={formatNumber(data?.authority?.referringDomains || 0)}
            />
        </div>
    </Section>
);

export default AuthoritySection;
