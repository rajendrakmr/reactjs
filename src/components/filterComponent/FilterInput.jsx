import React, { memo } from 'react';
import { Field, ErrorMessage } from 'formik';

const FilterInputComponent = memo(({ label, type, name, onChange, onBlur, touched, errors ,isDisabled=false,max=250,isRequired=false,col="col-md-3"}) => {

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
    <div className={`form-group ${col} d-flex mt-1 align-items-center`}>
      <div className="col-sm-4 col-4">
        <label htmlFor={name} className="mr-3">
          {label}:  {isRequired && (<span className="text-danger text-bold">*</span>)}
        </label>
      </div>
      <div className="col-sm-8 col-8">
        <Field
          type={inputType}
          id={name}
          name={name} 
          className={`form-control custome-input-height custome-border form-control ${errors[name] && touched[name] ? (errors[name] === 'Verified Employee ID' ? 'border-success' : 'border-danger') : ''}`}
          onChange={handleNumberInput}
          onBlur={onBlur}
          disabled={isDisabled}
          maxLength={max}
          min="0"
        />  
         
       
        {touched[name] &&  errors[name] ? (
          <div>
            <ErrorMessage name={name}>
              {msg =>
                touched[name] && errors[name] ? (
                <div className={errors[name] === 'Verified Employee ID' ? 'text-success' : 'text-danger'}>
                  {errors[name]}
                </div>
                ) : null
              }
            </ErrorMessage>
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default FilterInputComponent;
