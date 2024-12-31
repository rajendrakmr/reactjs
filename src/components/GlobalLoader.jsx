
import React, { memo } from 'react';
import './GloablLoader.css';

const GloablLoader = memo(() => {
    return (
        <div className="loading-wrapper">
            <div className="loading-text">LOADING...</div>
            <div className="loading-circle circle"></div>
            <div className="loading-circle-small circle"></div>
        </div>
    );
});

export default GloablLoader;
