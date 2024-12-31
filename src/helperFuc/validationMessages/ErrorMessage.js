// MyComponent.jsx
import React from 'react';

const ErrorMessage = ({error}) => {
    return (
        <div className="alert alert-danger m-2">
        <span className="alert-link">{error} </span>
        </div>
    );
};

export default ErrorMessage;
