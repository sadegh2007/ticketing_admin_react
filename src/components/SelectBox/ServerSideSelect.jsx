import Select from "react-tailwindcss-select";
import {useEffect, useState} from "react";
import axios from "axios";
import {ApiRequest} from "../../services/ApiService.js";
import {notify} from "../../utilities/index.js";



const ServerSideSelect = (
    {
        url,
        onSelect,
        formatData,
        value = null,
        multiple = false,
        method = 'GET'
    }
) => {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(multiple ? (value ?? []) : (value ?? ''));
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
        } catch {
        }

        setLoading(false);
        return result;
    }

    const handleChange = (value) => {
        setSelectedValue(value);
        onSelect(value);
    }

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <Select
            classNames={{
                searchBox: ""
            }}
            isMultiple={multiple}
            onSearchInputChange={onSearch}
            loading={loading}
            placeholder="جستجوی کاربر..."
            searchInputPlaceholder="جستجوی کاربر..."
            noOptionsMessage="آیتمی یافت نشد."
            isClearable={true}
            isSearchable={true}
            value={selectedValue}
            onChange={handleChange}
            options={options}
        />
    );
}

export default ServerSideSelect;