import { z } from 'zod';

export const FlowSchema = z.object({
    domain: z.string().url({ message: 'Please enter a valid URL' }),
    input: z.string().min(1, { message: 'Please enter a prompt' }),
    saveMemory: z.boolean().optional(),
});

export type TFlowForm = z.infer<typeof FlowSchema>;
