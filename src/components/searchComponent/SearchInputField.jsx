import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const SearchInputField = ({ id, label, placeholder, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="form-group col-lg-4 d-flex align-items-center gap-2">
            <label htmlFor="challanNo" className="col-form-label" style={{ flex: '0 0 40%' }}>{label} :</label>
            <input
                type={props.type || 'text'}
                className="custome-input-height form-control custome-border"
                id={id} 
                placeholder={label}
                {...field}
                {...props}
                style={{ flex: '1 1 auto' }}
            />
        </div>
    );
};

SearchInputField.propTypes = { 
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default SearchInputField;
