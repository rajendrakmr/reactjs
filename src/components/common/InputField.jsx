import React, { memo } from 'react';

const InputField = memo(({ label,
    type = 'text',
    name,
    inputData,
    onChange,
    errorMsg,
    onKeyUp, 
    onBlur,
    hasError,
    isRequired = false,
    isDefault = false,
    max = 250,
    col = "col-md-3" }) => {

        console.log(' inputData[name] inputData[name]', inputData)
 
    const handleNumberInput = (e) => {
        const value = e.target.value;

        if (type == "numberString") {
            const numericValue = value.replace(/[^0-9.]/g, '');
            if (value !== numericValue || (numericValue.match(/\./g) || []).length > 1) {
                return false;
            }
            e.target.value = numericValue;

            onChange(e)
        } else {
            onChange(e);
        }
    };
    const inputType = type == "numberString" ? 'text' : type;



    return (
        <div className={`form-group ${col} d-flex mt-1 align-items-center`}>
            <div className="col-sm-5 col-4">
                <label htmlFor={name} className="mr-3 pe-7">
                    {label}:{isRequired && (<span className="text-danger text-bold">*</span>)}
                </label>
            </div>
            <div className="col-sm-7 col-8">
                <input
                    type={inputType}
                    className={`form-control custome-input-height custome-border form-control ${errorMsg ? 'is-invalid' : ''}`}
                    id={name}
                    disabled={isDefault}
                    name={name}
                    value={inputData !== undefined && inputData !== null ? inputData : ''}
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
                {errorMsg && (
                    <span className="text-danger" style={{ fontSize: "11px", marginTop: "0" }}>
                        {errorMsg}
                    </span>
                )}
            </div>
        </div>



    );
});

const areEqual = (prevProps, nextProps) => {
    return (prevProps.name === nextProps.name && prevProps.errorMsg === nextProps.errorMsg  && prevProps.inputData === nextProps.inputData );
  };
  
  
  
  
  export default React.memo(InputField, areEqual); 

