import React from "react";
import Select from "react-select";
import { customSelectOption } from "../../utils/helper";

const SearchSelectField = ({
    label = "Label Name",
    name = "",
    options,
    value,
    onChange,
    isInvalid = false
}) => {
    return (
        <div className="form-group col-lg-4 d-flex align-items-center gap-2 mt-1">
            <label htmlFor={name} className="col-form-label" style={{ flex: '0 0 40%' }}>
                {label}:
            </label>
            <div className="select-container">
                <Select
                    className={`select_height ${isInvalid ? "is-invalid" : ""}`}
                    id={name}
                    name={name}
                    options={options}
                    value={options.find(option => option.value === value)}
                    onChange={onChange}
                    menuPortalTarget={document.body}
                    styles={customSelectOption}
                />
            </div>
        </div>
    );
};

export default SearchSelectField;
