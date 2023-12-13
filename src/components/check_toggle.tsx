import React from 'react'; // we need this to make JSX compile

type InputProps = {
    labelClass: string,
    labelName: string,
    inputType: string,
    inputClass: string,
    bulletClass: string,
    containerClass: string,
}

export const CheckToggle = ({ labelClass, labelName, inputType, inputClass, bulletClass, containerClass }: InputProps) => <>
    <label className={containerClass}>
        <input type={inputType} value="" className={inputClass}></input>
        <div className={bulletClass}></div>
        <span className={labelClass}>{labelName}</span>
    </label>
</>