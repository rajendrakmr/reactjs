import React from 'react';
import Select from 'react-select';
import { customSelectOption } from '../../utils/helper';

const SelectField = ({
    label,
    name,
    options,
    isLoading = false,
    value,
    isInvalid,
    onChange,
    onMenuScrollToBottom,
    menuPortalTarget = document.body,
    required = false,
    labelWidth = '40%',
    containerClass = 'form-group col-lg-6 d-flex align-items-center gap-2 mt-1',
}) => {
    return (
        <div className={containerClass}>
            <label htmlFor={name} className="col-form-label" style={{ flex: `0 0 ${labelWidth}` }}>
                {label}{required && <span className="text-danger text-bold">*</span>}
            </label>
            <div className="select-containers">
                <Select
                    className={`custome-input-height ${isInvalid ? "is-invalid" : ""}`}
                    id={name}
                    name={name}
                    options={options}
                    value={value}
                    onChange={onChange}
                    onMenuScrollToBottom={onMenuScrollToBottom}
                    menuPortalTarget={menuPortalTarget}
                    styles={customSelectOption}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default SelectField;
