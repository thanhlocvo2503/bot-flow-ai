import { z } from 'zod';

export const FlowSchema = z.object({
    url: z.string().url({ message: 'Please enter a valid URL' }),
    prompt: z.string().min(1, { message: 'Please enter a prompt' }),
});

export type TFlowForm = z.infer<typeof FlowSchema>;
