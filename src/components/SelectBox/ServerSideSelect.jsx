import Select from "react-tailwindcss-select";
import React, {useEffect, useState} from "react";
import {ApiRequest} from "../../services/ApiService.js";
import {notify} from "../../utilities/index.js";
import {handleError} from "../../services/GlobalService.js";

const ServerSideSelect = React.forwardRef((
    {
        url,
        placeholder = '',
        onSelect,
        formatData,
        value = null,
        multiple = false,
        method = 'GET',
        required = false,
        className = '',
    }, ref) => {

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState(multiple ? [] : '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            getData().then(response => {
                setOptions(response);
            }).catch(reason => {
                notify(reason.message)
            })
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchValue])

    const getData = async () => {
        setLoading(true);
        let result = null;

        try {
            result = await ApiRequest(`${url}?q=${searchValue}`, method);
            if (formatData != undefined && result) {
                result = formatData(result);
            }
        } catch (e) {
            handleError(e.response);
            result = [];
        }

        setLoading(false);
        return result;
    }

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <Select
            className={className}
            ref={ref}
            required={required}
            isMultiple={multiple}
            onSearchInputChange={onSearch}
            loading={loading}
            placeholder={placeholder}
            searchInputPlaceholder="جستجو..."
            noOptionsMessage="آیتمی یافت نشد."
            isClearable={true}
            isSearchable={true}
            value={value}
            onChange={onSelect}
            options={options}
        />
    );
});

export default ServerSideSelect;