import React from 'react';
import Select from 'react-select';
import { customSelectOption } from '../../../utils/helper';

const SelectCellField = ({
    parentIndex,
    field,
    options,
    selectedValue,
    handleChangeSelect,
    onMoreScroll,
    isLoading,
    setSelectError,
    cName = "wide-input1",
    isEdit =false,
    isDefault=false
}) => {
    return (
        <td className="custom-dropdown-container">
            <Select
                className={`select_height ${cName} custome-border  ${setSelectError(parentIndex, field) ? "is-invalid" : ""}`}
                id={field}
                name={field}
                options={options}
                value={isEdit ? { value: selectedValue, label: selectedValue } : (options.find(option => option.value == selectedValue)||null)}
                onChange={(selectedOption) => handleChangeSelect(selectedOption, parentIndex, field)}
                onMenuScrollToBottom={onMoreScroll}
                isLoading={isLoading}
                menuPortalTarget={document.body}
                styles={customSelectOption}
                isDisabled={isDefault}
            />
            {setSelectError(parentIndex, field) && (
                <div className="invalid-feedback">
                    {setSelectError(parentIndex, field)}
                </div>
            )}
        </td>

    );
};

export default SelectCellField;
