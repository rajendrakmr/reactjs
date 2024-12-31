import React, { memo } from 'react';

const InputField = memo(({ label, type = 'text', name, inputData, onChange, hasError, errorMsg, isDefault = false, onBlur, isRequired = false, max = 250, restrictInput = false }) => {

  const formatDate = (inputData) => {
    const value = inputData[name];
    if (!value) return '';
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    const date = new Date(value);
    return !isNaN(date) ? date.toISOString().substring(0, 10) : '';
  };
  const formattedValue = type === 'date' ? formatDate(inputData) : inputData[name];



  const handleNumberInput = (e) => {
    const value = e.target.value;

    if (type == "number") {
      const numericValue = value.replace(/\D/g, '');
      if (value !== numericValue) { 
        return false;
      }
      e.target.value = numericValue;
      onChange(e)
    } else { 
      onChange(e);
    }
  };
  const inputType = type == "number" && max !== 250 ? 'text' : type;



  return (
    <div className="form-group col-md-2">
      <label htmlFor={name}>{label}: {isRequired && (<span className="text-danger text-bold">*</span>)}</label>
      <input
        type={inputType}
        className={` form-control custome-input-height custome-border form-control ${hasError(name) ? 'is-invalid' : ''}`}
        id={name}
        disabled={isDefault}
        name={name}
        value={formattedValue || ""}
        onBlur={onBlur}
        // onChange={onChange}
        onChange={handleNumberInput}
        maxLength={max}
        min="0"
      />
      {hasError(name) && (
        <div className="invalid-feedback">
          {errorMsg[name]}
        </div>
      )}
    </div>
  );
});

export default InputField;
