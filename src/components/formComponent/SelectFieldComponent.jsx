import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { customSelectOption } from '../../utils/helper';

const SelectFieldComponent = ({
    id,
    name,
    label,
    options = [],
    value = null,
    onChange,
    onMenuScrollToBottom,
    error,
    touched,
    isLoading = false,
    required = false,
    col = "col-md-6",
    onKeyDown,
    isDisabled=false
}) => {
    return (
        <div className={`form-group ${col} d-flex mt-1 align-items-center`}>
            <div className="col-sm-4 col-md-4">
                <label htmlFor={id} className="mr-3">
                    {label}
                    {required && <span className="text-danger text-bold">*</span>}
                </label>
            </div>
            <div className="col-sm-8 col-md-8">
                <Select
                    className={`custome-input-height ${error && touched ? "is-invalid" : ""}`}
                    id={id}
                    name={name}
                    options={options}
                    value={options.find(option => option.value === value) || null}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    onMenuScrollToBottom={onMenuScrollToBottom}
                    menuPortalTarget={document.body}
                    styles={customSelectOption}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                />
                {error && touched && <span className="selectError">{error}</span>}
            </div>
        </div>
    );
};

SelectFieldComponent.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    required: PropTypes.bool,
    // options: PropTypes.array.isRequired,
    //   value: PropTypes.object.isRequired,
    // onInputChange: PropTypes.func.isRequired,
    // onMenuScrollToBottom: PropTypes.func.isRequired,
};

export default SelectFieldComponent;
