 import React from 'react';

type InputProps = {
    labelClass: string,
    labelName: string,
    inputType: string,
    inputClass: string,
    inputName: string,
    disable: boolean,
    containerClass: string,
    handleFileChange: any,
}

export const FileUpload = ({ labelClass, labelName, disable, inputType, inputClass, inputName, containerClass, handleFileChange,  }: InputProps) => <>
    <div className={containerClass}>
        <label className={labelClass} htmlFor="default_size">{labelName}</label>
        <input className={inputClass} id="default_size" type='file' name={inputName} disabled={disable} onChange={(e: any) => { handleFileChange(e.target.files[0]) }}></input>

    </div>
</>