import Select from "react-tailwindcss-select";
import React from "react";

const CustomSelect = React.forwardRef((
    {
        className = '',
        required = false,
        multiple = false,
        onSearch = null,
        loading = false,
        placeholder = '',
        value = null,
        onSelect = null,
        options = [],
        isSearchable = false,
        isClearable = false,
    }, ref) => {
    return (
        <Select
            classNames={{
                searchIcon: "absolute w-5 h-5 mt-2.5 pb-0.5 mr-2 text-gray-500",
                searchBox: "w-full py-2 pr-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none"
            }}
            className={className}
            ref={ref}
            required={required}
            isMultiple={multiple}
            onSearchInputChange={onSearch}
            loading={loading}
            placeholder={placeholder}
            searchInputPlaceholder="جستجو..."
            noOptionsMessage="آیتمی یافت نشد."
            isClearable={isClearable}
            isSearchable={isSearchable}
            value={value}
            onChange={onSelect}
            options={options}
        />
    )
})

export default CustomSelect;