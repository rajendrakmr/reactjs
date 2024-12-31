import React from 'react';

const TableHeader = ({ headers ,bgColor=null}) => { 
  const headersArray = Array.isArray(headers)
    ? headers
    : Object.keys(headers).map((key) => ({ key, label: headers[key] })); 
  return (
    <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0 ,backgroundColor:"#32ab9b"}}>
      <tr>
        {headersArray.map(({ key, label }) => (
          <th key={key} className="text-center" scope="col">
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

