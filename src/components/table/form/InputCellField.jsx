import React, { memo } from 'react';

const InputCellField = memo(({ type = 'text', value, onChange, name, disabled = false, errorMsg, className, max = 250 }) => {
  const controlledValue = value !== undefined && value !== null ? value : '';
  const formatDate = (value) => {
    if (!value) return '';
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    const date = new Date(value);
    return !isNaN(date) ? date.toISOString().substring(0, 10) : '';
  };
  const formattedValue = type === 'date' ? formatDate(controlledValue) : controlledValue;


  const handleNumberInput = (e) => {
    const value = e.target.value;

    if (type === "number") {
      const numericValue =  value.replace(/[^0-9.]/g, '');
      if (value !== numericValue) {
        e.target.value = numericValue;
        onChange(e);
        return;
      }
    }
    onChange(e);
  };
  const inputType = type == "number" && max !== 250 ? 'text' : type;


  return (
    <td>
      <input
        type={inputType}
        className={`custome-input-height form-control custome-border ${className} ${errorMsg && errorMsg[name] ? 'is-invalid' : ''}`}
        value={value !== undefined && value !== null ? value : ''} 
        onChange={handleNumberInput}
        id={name}
        name={name} 
        disabled={disabled}
        maxLength={max}
      />
      {errorMsg && errorMsg[name] ? (
        <div className="invalid-feedback">
          {errorMsg[name]}
        </div>
      ) : null}
    </td>
  );
}, (prevProps, nextProps) => {
  return prevProps.type === nextProps.type &&
    prevProps.name === nextProps.name &&
    prevProps.value === nextProps.value &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.className === nextProps.className &&
    prevProps.errorMsg === nextProps.errorMsg &&
    prevProps.hasError === nextProps.hasError;
});

export default InputCellField;
