import React from "react";
import Select from "react-select";
import { customSelectOption } from "../utils/helper";

const SelectInputField = ({
    label,
    name,
    options,
    value,
    onChange,
    isInvalid=false,
    errorMessage,
    isTrue=false
}) => {
    return (
        <div className="form-group col-md-3 d-flex align-items-center mt-1">
            <div className="col-sm-5 col-4">
                <label htmlFor={name} className="mr-3 pe-7">
                    {label}:<span className="text-danger text-bold">*</span>
                </label>
            </div>
            <div className="col-sm-7 col-8">
                <Select
                    className={`select_height w-100 ${isInvalid ? "is-invalid" : ""}`}
                    id={name}
                    name={name}
                    options={options}
                    value={options.find(option => option.value == value)}
                    onChange={(selectedOption) => onChange(selectedOption, name)}
                    menuPortalTarget={document.body}
                    styles={customSelectOption}
                    isDisabled={isTrue}
                />
                {isInvalid && (
                    <span className="selectError">
                        {errorMessage}
                    </span>
                )}
            </div>
        </div>
    );
};

 
         

export default SelectInputField;
