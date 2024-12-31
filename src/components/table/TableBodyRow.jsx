import React, { memo } from 'react';

const TableBodyRow = memo(({ item, headers }) => {
  const headersArray = Array.isArray(headers)
    ? headers
    : Object.keys(headers).map((key) => ({ key, label: headers[key] }));

  return (
    <>
      {headersArray
        .filter(({ key }) => key !== 'action' &&  key !== 'isActive' && key !== 'subGroupNo' && key !== 'groupNo' && key !== 'rejectSupplyFlag' && key !== 'activeFlag' && key !== 'indentStatus'  && key !== 'statusCd' && key !== 'status' && key !== 'locationBinDesc' && key !== 'binNumber')
        .map(({ key }) => (
          <td key={key} className="text-center">
            {item[key] || '-'}
          </td>
        ))}
    </>
  );
});

export default TableBodyRow;
