import React, { useMemo } from 'react';
import { useField } from 'formik';

const FormSelectField = React.memo(({ id, label, options, ...props }) => {
    const [field, meta] = useField(props);
 
    const memoizedOptions = useMemo(() => options, [options]);
   

    return (
        <div className="form-group col-md-6 d-flex mt-3 align-items-center">
            <div className="col-sm-3 col-4">
                <label htmlFor={id} className="mr-3">
                    {label}
                </label>
            </div>
            <div className="col-sm-9 col-8">
                <div className="select-container">
                    <select
                        id={id}
                        className={`custome-input-height form-control custome-border ${meta.touched && meta.error ? "is-invalid" : ""}`}
                        {...field}
                        {...props}
                    >
                        <option value="">Choose...</option>
                        {memoizedOptions && Array.isArray(memoizedOptions) &&
                            memoizedOptions.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.role}
                                </option>
                            ))}
                    </select>
                </div>
                {meta.touched && meta.error ? (
                    <div className="invalid-feedback">
                        {meta.error}
                    </div>
                ) : null}
            </div>
        </div>
    );
});

export default FormSelectField;
