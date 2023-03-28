import React from "react";

const IndeterminateCheckbox = (
    {
        indeterminate,
        className = '',
        ...rest
    }) => {
    const ref = React.useRef(null)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' checkbox cursor-pointer'}
            {...rest}
        />
    )
}

export default IndeterminateCheckbox;