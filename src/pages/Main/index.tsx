import { FlowForm } from '@/components';

export const MainPage = () => (
    <div className="w-full max-w-4xl m-auto flex flex-col items-center mt-16">
        <h2 className="text-5xl font-semibold">Start Automation</h2>
        <p className="mt-2 text-lg text-gray-500 w-143 text-center">
            Configure your bot by providing a URL and specific instructions for
            the automation task.
        </p>

        <FlowForm />
    </div>
);
