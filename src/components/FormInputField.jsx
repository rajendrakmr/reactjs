import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const FormInputField = ({ id, label, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-group col-md-6 d-flex mt-3 align-items-center">
      <div className="col-sm-3 col-4">
        <label htmlFor={id} className="mr-3 pe-7">
          {label}
        </label>
      </div>
      <div className="col-sm-9 col-8">
        <input
          type={props.type || 'text'}
          className={`custome-input-height form-control custome-border ${meta.touched && meta.error ? "is-invalid" : ""}`}
          id={id}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">
            {meta.error}
          </div>
        ) : null}
      </div>
    </div>
  );
};

FormInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default FormInputField;
