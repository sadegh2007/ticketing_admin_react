import React from "react";

const DebouncedInput = ({
                            value: initialValue,
                            onChange,
                            debounce = 300,
                            ...props
                        }) => {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input className="input input-sm input-bordered rounded-sm w-full max-w-xs" {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}

export default DebouncedInput;