import { Info } from 'lucide-react';

// Mocks
import { MOCK_TRAFFIC } from '@/__mocks__';

// Components
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import TrafficSection from '../TrafficSection';
import AuthoritySection from '../AuthoritySection';
import AiOverviewSection from '../AiOverviewSection';
import AiSourcesSection from '../AiSourcesSection';
import CompetitorsSection from '../CompetitorsSection';
import { Button } from '../common';

const TrafficDialog = () => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="link">
                <Info />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-max">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                    {MOCK_TRAFFIC.domain}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm">
                    {MOCK_TRAFFIC.source.name} • {MOCK_TRAFFIC.source.method} •{' '}
                    {MOCK_TRAFFIC.dbStatus}
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-start gap-2">
                <div className="flex w-full gap-2">
                    <TrafficSection data={MOCK_TRAFFIC} />
                    <AuthoritySection data={MOCK_TRAFFIC} />
                    <AiOverviewSection data={MOCK_TRAFFIC} />
                </div>
                <AiSourcesSection data={MOCK_TRAFFIC} />
                <CompetitorsSection data={MOCK_TRAFFIC} />
            </div>
            <DialogFooter className="justify-end">
                <DialogClose asChild>
                    <Button type="button" className="bg-slate-900">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default TrafficDialog;
