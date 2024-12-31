import React from 'react';

const InputField = ({
  label,
  type="text",
  name,
  value,
  required = false,
  onChange,
  containerClass = 'form-group col-lg-6 d-flex align-items-center gap-2 mt-1',
  labelWidth = '40%',
  inputClass = 'custome-input-height form-control custome-border wide-input4',
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={name} className="col-form-label" style={{ flex: `0 0 ${labelWidth}` }}>
        {label}{required && <span className="text-danger text-bold">*</span>}
      </label>
      <input
        type={type}
        className={inputClass}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        style={{ flex: '1 1 auto' }}
      />
    </div>
  );
};

export default InputField;
