import React from 'react'; // we need this to make JSX compile

type InputProps = {
    labelClass: string,
    labelName: string,
    inputType: string,
    inputClass: string,
    inputName: string,
    inputPlaceholder: string
    containerClass: string,
}

export const FormInput = ({ labelClass, labelName, inputType, inputClass, inputName, inputPlaceholder, containerClass }: InputProps) => <>
    <div className={containerClass}>
        <label htmlFor="text" className={labelClass}>{labelName}</label>
        <input type={inputType} id="text" className={inputClass} name={inputName} placeholder={inputPlaceholder} required />
    </div>
</>