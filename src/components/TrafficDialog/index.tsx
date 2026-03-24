import { Info } from 'lucide-react';

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

interface TrafficDialogProps {
    traffic?: any;
}

const TrafficDialog = ({ traffic }: TrafficDialogProps) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="link">
                <Info />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-7xl">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                    {traffic?.domain}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm">
                    {traffic?.source?.name || ''} • {traffic?.source.method} •{' '}
                    {traffic?.dbStatus}
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-start gap-2">
                <div className="flex w-full gap-2">
                    <TrafficSection data={traffic || {}} />
                    <AuthoritySection data={traffic || {}} />
                    <AiOverviewSection data={traffic || {}} />
                </div>
                <AiSourcesSection data={traffic || {}} />
                <CompetitorsSection data={traffic || {}} />
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
