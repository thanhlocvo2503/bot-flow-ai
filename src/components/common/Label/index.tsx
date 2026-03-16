import { ReactNode } from 'react';

interface LabelProps {
    name: string;
    isRequired?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    className?: string;
}

const Label = ({
    name,
    startIcon,
    isRequired,
    endIcon,
    className,
}: LabelProps) => {
    return (
        <div className="flex w-fit items-center justify-start gap-2">
            {startIcon && <span>{startIcon}</span>}
            <p className={className}>
                {name} {isRequired && <span className="text-red-500">*</span>}
            </p>
            {endIcon && <span>{endIcon}</span>}
        </div>
    );
};

export default Label;
