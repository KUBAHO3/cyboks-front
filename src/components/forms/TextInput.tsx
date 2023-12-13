import { Ref, forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    labelText?: string;
    labelClass?: string;
    inputClass?: string;
    containerClass?: string;
    error?: string;
}

const TextInput = forwardRef(
    (
        { id, labelText, labelClass, inputClass, containerClass, error, ...props }: Props,
        ref: Ref<HTMLInputElement>
    ) => {

        return (
            <div className={`px-16 ${containerClass}`}>
                <label htmlFor={id} className={`text-sm font-normal ${labelClass}`}>
                    {labelText}
                </label>
                <input
                    id={id}
                    className={`text-gray-900 text-sm block w-full p-2.5 ${inputClass}`}
                    ref={ref}
                    {...props}
                />

                {
                    error && (<p className="text-red-500 text-sm mt-[.25rem]">{error}</p>)
                }

            </div>
        );
    }
);

export default TextInput;