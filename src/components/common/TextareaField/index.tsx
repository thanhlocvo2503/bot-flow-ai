'use client';

import {
    ChangeEvent,
    ForwardedRef,
    forwardRef,
    ReactNode,
    TextareaHTMLAttributes,
} from 'react';

// Components
import Label from '../Label';

type TTextareaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange'
> & {
    isError?: boolean;
    errorMessage?: string;
    label?: string;
    labelStartIcon?: ReactNode;
    labelEndIcon?: ReactNode;
    leftIcon?: ReactNode;
    inputClass?: string;
    onChange?: (value: string) => void;
};

const Textarea = (
    {
        isError = false,
        errorMessage = 'Default error',
        label,
        leftIcon,
        labelStartIcon,
        labelEndIcon,
        inputClass,
        onChange,
        ...rest
    }: TTextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
) => {
    const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>): void =>
        onChange?.(e.target.value);

    return (
        <div className="w-full flex flex-col gap-2">
            {label && (
                <Label
                    name={label}
                    startIcon={labelStartIcon}
                    endIcon={labelEndIcon}
                    className="text-sm text-gray-700 font-medium w-full"
                />
            )}
            <div className="w-full relative flex items-center">
                {leftIcon && (
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                        {leftIcon}
                    </span>
                )}

                <div className="w-full">
                    <textarea
                        className={`${inputClass} w-full p-3 block text-xs bg-transparent rounded-sm border ${isError ? 'border-red-500' : 'border-gray-400'} ${
                            leftIcon ? 'pl-10' : ''
                        }`}
                        onChange={handleChangeValue}
                        {...rest}
                        ref={ref}
                    />
                    {isError && (
                        <p className="mt-2 text-sm text-red-600">
                            {errorMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default forwardRef(Textarea);
