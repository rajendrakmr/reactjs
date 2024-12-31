import React from "react";
import Select from "react-select";

const CustomSelectOption = ({
  options,
  value,
  onChange,
  hasError,
  errorMessage,
  isDisabled,
  parentIndex,
  fieldName,
}) => {
  return (
    <td className="custom-dropdown-container">
      <Select
        className={`custome-input-height wide-input5 custome-border ${hasError ? "is-invalid" : ""}`}
        id={fieldName}
        name={fieldName}
        options={options}
        onChange={(selectedOption) => onChange(selectedOption, parentIndex, fieldName)}
        value={{ value: value, label: value }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        isDisabled={isDisabled}
      />
      {hasError && (
        <div className="invalid-feedback">
          {errorMessage}
        </div>
      )}
    </td>
  );
};

export default CustomSelectOption;
