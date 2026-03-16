import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Globe, Pause, Play, SquareTerminal } from 'lucide-react';

// Components
import { Button, InputField, TextareaField } from '@/components/common';

// Schema
import { FlowSchema, TFlowForm } from './schema';

const FlowForm = () => {
    const { control, handleSubmit } = useForm<TFlowForm>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: zodResolver(FlowSchema),
        defaultValues: {
            url: '',
            prompt: '',
        },
    });

    const handleSubmitForm = (data: TFlowForm) => {
        try {
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-8 mt-8 bg-white rounded-2xl shadow-md">
            <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="w-full flex flex-col items-center justify-center gap-4"
            >
                <Controller
                    control={control}
                    name="url"
                    render={({ field, fieldState: { error } }) => (
                        <InputField
                            leftIcon={<Globe color="#94A3B8" size={20} />}
                            type="text"
                            placeholder="https://example.com/target-page"
                            label="URL"
                            {...field}
                            isError={!!error}
                            errorMessage={error?.message}
                            inputClass="p-5"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="prompt"
                    render={({ field, fieldState: { error } }) => (
                        <TextareaField
                            label="Prompt"
                            leftIcon={
                                <SquareTerminal color="#94A3B8" size={20} />
                            }
                            placeholder="What should the bot do? e.g., 'Find all product prices and export to CSV'"
                            {...field}
                            isError={!!error}
                            errorMessage={error?.message}
                            inputClass="h-32 p-5"
                        />
                    )}
                />

                <div className="w-full flex gap-4">
                    <Button type="submit" className="shadow-md w-[70%]">
                        <Play /> Run Bot
                    </Button>
                    <Button className="shadow-md w-[28%] bg-gray-600 hover:bg-gray-500">
                        <Pause /> Pause
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FlowForm;
