import { DataType } from '@/types';

// Utils
import { formatNumber } from '@/utils';

// Components
import Section from '../Section';
import Card from '../Card';

const AuthoritySection = ({ data }: { data: DataType }) => (
    <Section title="Authority">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card
                title="Backlinks"
                value={formatNumber(data.authority.backlinks)}
            />
            <Card title="Score" value={data.authority.authorityScore} />
            <Card
                title="Domains"
                value={formatNumber(data.authority.referringDomains)}
            />
        </div>
    </Section>
);

export default AuthoritySection;
