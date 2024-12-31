import React from 'react';
import Select from 'react-select'; // Ensure you have react-select installed
import PropTypes from 'prop-types';
import { customSelectOption } from '../../utils/helper';

const SelectFormInput = ({ 
    name,
    label,
    options,
    value,
    onChange,
    isEdit =false,
    error, 
    required = false,
    isLoading=false,
    pgNo,
    formData,
    onMenuScroll = () => console.log('Default'),
    col="col-md-3",
    isTrue=false,
    onKeyDown

}) => {
    return (
        <div className={`form-group ${col} d-flex align-items-center mt-1`}>
            <div className="col-sm-5 col-4">
                <label htmlFor={name} className="mr-3 pe-7">
                    {label}
                    {required && <span className="text-danger text-bold">*</span>}
                </label>
            </div>
            <div className="col-sm-7 col-8">
                <Select
                    className={`select_height w-100 custome-border ${error ? "is-invalid" : ""}`}
                    id={name}
                    name={name}
                    options={options}
                    value={isEdit ? { value: value, label: value } : (options.find(option => option.value == value)||null)}
                    onChange={selectedOption => onChange(selectedOption, name)}
                    menuPortalTarget={document.body}
                    styles={customSelectOption}
                    onMenuScrollToBottom={() => onMenuScroll(formData, pgNo)}
                    isLoading={isLoading}
                    isDisabled={isTrue}
                    onKeyDown={onKeyDown}
                />
                {error && <span className="selectError">{error}</span>}
            </div>
        </div>
    );
};

SelectFormInput.propTypes = {
    // id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    // value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired, 
    error: PropTypes.string,
    customStyles: PropTypes.object,
    required: PropTypes.bool,
};

export default SelectFormInput;



    {/* <SelectFormInput
        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'stnIndentNo')}
        error={setSelectError('stnIndentNo')}
        id="stnIndentNo"
        name="stnIndentNo"
        label="STN Indent No"
        options={STNIndentNoOptions}
        value={formData.stnIndentNo}
        // isEdit={isEdit}
        required={true}
    /> */}