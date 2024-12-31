import React from 'react'; 

const TableRequired = React.memo(() => { 
    return (
        <span className="text-bold text-danger">*</span>
    );
}); 

export default TableRequired;

