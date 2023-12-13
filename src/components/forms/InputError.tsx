interface Props {
    error?: string;
}

const InputError = ({ error }: Props) => {

    if (!error) return null;

    return (<p className="text-red-500 text-sm mt-[.25rem]">{error}</p>)
}

export default InputError