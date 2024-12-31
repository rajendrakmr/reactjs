import React from 'react';

const TableHeader1 = ({ headers }) => {
  return (
    <thead className="table-header-bg text-white">
      <tr>
        {headers.map(({ key, label }) => (
          <th key={key} className="text-center" scope="col">
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader1;
