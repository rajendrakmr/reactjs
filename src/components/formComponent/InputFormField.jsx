import React, { memo } from 'react';

const InputFormField = memo(({ label, type = 'text', name, inputData, onChange, hasError, errorMsg, isDefault = false, onBlur, isRequired = false, max = 250, onKeyUp, col = "col-md-3", row1 = "col-sm-5 col-4", row2 = "col-sm-7 col-8" }, isTop = false) => {

    const handleNumberInput = (e) => {
        const value = e.target.value;
        if (isTop) {

        }

        if (type == "number") {
            const numericValue = value.replace(/[^0-9.]/g, '');
            if (value !== numericValue || (numericValue.match(/\./g) || []).length > 1) {
                return false;
            }
            e.target.value = numericValue;

            onChange(e)
        } else if (type == "str") {
            const alphanumericValue = value.replace(/[^a-zA-Z0-9/]/g, '');  
            if (value !== alphanumericValue) {
                return false;
            }
            e.target.value = alphanumericValue; 
            onChange(e) 
        }
        else {
            onChange(e);
        }
    };
    const inputType = type == "number" && max !== 250 ? 'text' : type;



    return (
        <div className={`form-group ${col} d-flex mt-1 align-items-center`}>
            <div className={row1}>
                <label htmlFor={name} className="mr-3 pe-7">
                    {label}:{isRequired && (<span className="text-danger text-bold">*</span>)}
                </label>
            </div>
            <div className={row2}>
                <input
                    type={inputType}
                    className={`form-control custome-input-height custome-border form-control ${hasError(name) ? 'is-invalid' : ''}`}
                    id={name}
                    disabled={isDefault}
                    name={name}
                    value={inputData[name] !== undefined && inputData[name] !== null ? inputData[name] : ''}
                    onBlur={onBlur}
                    onKeyUp={onKeyUp}
                    onChange={handleNumberInput}
                    maxLength={max}
                    min="0"
                    style={isRequired ? {
                        fontWeight: 'bold',
                        backgroundColor: isDefault ? '#e9ecef' : '#eff3a800',
                    } : {}}
                />
                {hasError(name) && (
                    <span className="text-danger" style={{ fontSize: "11px", marginTop: "0" }}>
                        {errorMsg[name]}
                    </span>
                )}
            </div>
        </div>



    );
});

const areEqual = (prevProps, nextProps) => {
    return (prevProps.name === nextProps.name && prevProps.errorMsg[prevProps.name] === nextProps.errorMsg[nextProps.name] && prevProps.inputData[prevProps.name] === nextProps.inputData[nextProps.name]);
};




export default React.memo(InputFormField, areEqual); 