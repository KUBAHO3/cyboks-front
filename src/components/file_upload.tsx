import React from 'react'; // we need this to make JSX compile

type InputProps = {
    labelClass: string,
    labelName: string,
    inputType: string,
    inputClass: string,
    inputName: string,
    containerClass: string,
}

export const FileUpload = ({ labelClass, labelName, inputType, inputClass, inputName, containerClass }: InputProps) => <>
    <div className={containerClass}>
        <label className={labelClass} htmlFor="default_size">{labelName}</label>
        <input className={inputClass} id="default_size" type={inputType} name={inputName}></input>

    </div>
</>