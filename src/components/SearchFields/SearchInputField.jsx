import React, { memo } from 'react';

const SearchInputField = memo(({ label, type = 'text', name, inputData, onChange, hasError, errorMsg, isDefault = false, onBlur, isRequired = false, max = 250, restrictInput = false, onKeyUp,col="col-md-4" }) => {

    

    const handleNumberInput = (e) => {
        const value = e.target.value;

        if (type == "number") {
            const numericValue = value.replace(/\D/g, '');
            if (value !== numericValue) {
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
        }else {
            onChange(e);
        }
    };
    const inputType = type == "number" && max !== 250 ? 'text' : type;



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
                    className={`form-control custome-input-height custome-border form-control ${false ? 'is-invalid' : ''}`}
                    id={name}
                    disabled={isDefault}
                    name={name}
                    value={inputData}
                    onBlur={onBlur}
                    onKeyUp={onKeyUp}
                    onChange={handleNumberInput}
                    placeholder={label}
                    maxLength={max}
                    min="0"
                    style={isRequired ? { fontWeight: 'bold', backgroundColor: '#eff3a800' } : {}}
                />
                {/* {hasError(name) && (
                    <span className="text-danger" style={{ fontSize: "11px", marginTop: "0" }}>
                        {errorMsg[name]}
                    </span>
                )} */}
            </div>
        </div>



    );
});

export default SearchInputField;
 