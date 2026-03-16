import { HandMetal } from 'lucide-react';

const Logo = () => (
    <a href="/" className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 text-white rounded-xl">
            <HandMetal className="size-7" />
        </div>

        <span className="text-xl font-semibold">BotFlow AI</span>
    </a>
);

export default Logo;
