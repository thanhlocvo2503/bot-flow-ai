import { ToolStatusEnum } from '@/types';

export enum STATUS {
    SLEEPING = 'SLEEPING',
    ACTIVE = 'ACTIVE',
}

export const STATUS_COLOR_MAP: Record<string, string> = {
    [ToolStatusEnum.RUNNING]: 'text-blue-500',
    [ToolStatusEnum.DONE]: 'text-green-600',
    [ToolStatusEnum.ERROR]: 'text-red-500',
};
