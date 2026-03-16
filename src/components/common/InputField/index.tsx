import {
    ChangeEvent,
    ForwardedRef,
    forwardRef,
    InputHTMLAttributes,
    ReactNode,
} from 'react';

// Components
import { Label } from '@/components/common';

type TInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    isError?: boolean;
    isRequired?: boolean;
    errorMessage?: string;
    label?: string;
    labelStartIcon?: ReactNode;
    labelEndIcon?: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    inputClass?: string;
    onChange?: (value: string) => void;
};

const Input = (
    {
        isError = false,
        isRequired = false,
        errorMessage = 'Default error',
        label,
        leftIcon,
        rightIcon,
        labelStartIcon,
        labelEndIcon,
        inputClass,
        onChange,
        ...rest
    }: TInputProps,
    ref: ForwardedRef<HTMLInputElement>,
) => {
    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange?.(e.target.value);
    };

    return (
        <div className="w-full flex flex-col gap-2">
            {label && (
                <Label
                    isRequired={isRequired}
                    name={label}
                    startIcon={labelStartIcon}
                    endIcon={labelEndIcon}
                    className="text-sm text-gray-700 font-medium"
                />
            )}
            <div className="w-full relative flex items-center">
                {leftIcon && (
                    <span className="absolute left-0 inset-y-0 flex top-5 pl-3 pointer-events-none">
                        {leftIcon}
                    </span>
                )}

                <div className="w-full">
                    <input
                        className={`${inputClass} w-full bg-gray-50 text-gray-500 p-3 block text-sm rounded-xl border ${isError ? 'border-red-500' : 'border-gray-100'} ${
                            leftIcon ? 'pl-10' : ''
                        }`}
                        type="text"
                        onChange={handleChangeValue}
                        {...rest}
                        ref={ref}
                    />
                    {isError && (
                        <p className="mt-2 text-xs text-red-600">
                            {errorMessage}
                        </p>
                    )}
                </div>

                {rightIcon && (
                    <span className="absolute right-0 inset-y-0 flex top-1 pr-1">
                        {rightIcon}
                    </span>
                )}
            </div>
        </div>
    );
};

export default forwardRef(Input);
