import Select from "react-tailwindcss-select";
import React, {useEffect, useState} from "react";
import {ApiRequest} from "../../services/ApiService.js";
import {notify} from "../../utilities/index.js";
import {handleError} from "../../services/GlobalService.js";
import CustomSelect from "./CustomSelect.jsx";

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
    const [searchValue, setSearchValue] = useState('');

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
        <CustomSelect
            classNames={{
                searchIcon: "absolute w-5 h-5 mt-2.5 pb-0.5 mr-2 text-gray-500",
                searchBox: "w-full py-2 pr-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none"
            }}
            className={className}
            ref={ref}
            required={required}
            multiple={multiple}
            onSearchInputChange={onSearch}
            loading={loading}
            placeholder={placeholder}
            searchInputPlaceholder="جستجو..."
            noOptionsMessage="آیتمی یافت نشد."
            isClearable={true}
            isSearchable={true}
            value={value}
            onSelect={onSelect}
            options={options}
        />
    );
});

export default ServerSideSelect;