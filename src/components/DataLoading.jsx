 
import React, { memo } from 'react';
import './DataLoading.css';

const DataLoading = memo(() => {
    return (
        <div className="loading-wrapper">
            <div className="loading-text">Loading...</div>
            <div className="loading-circle circle"></div>
            <div className="loading-circle-small circle"></div>
        </div>
    );
});

export default DataLoading;
