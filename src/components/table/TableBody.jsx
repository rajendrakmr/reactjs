import React from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';

// Memoized TableBody component
const TableBody = React.memo(({ data, columnsConfig, toggleCollapse, handleEditPopupOpen }) => {
    return (
        <tbody>
            {data.length > 0 && data.map((item, index) => (
                <React.Fragment key={index}>
                    <tr className="accordion-toggle">
                        {columnsConfig.viewChildKey && item[columnsConfig.viewChildKey]?.length > 0 && (
                            <td className="text-center">
                                <button
                                    className="btn btn-default btn-xs"
                                    onClick={() => toggleCollapse(index)}
                                >
                                    <FaEye />
                                </button>
                            </td>
                        )}
                        {columnsConfig.editKeys && (
                            <td className="text-center">
                                <button
                                    className="btn btn-default btn-xs"
                                    onClick={() => handleEditPopupOpen(
                                        item.challanNo,
                                        item.deptChallanNo,
                                        item.dateOfReceipt,
                                        item.challanDate,
                                        item.depoCode,
                                        item.rslNo,
                                        item.depoName,
                                        item.ordRefNumber,
                                        item.ordDate,
                                        item.ordVendor,
                                        item.vendorName,
                                        item.transactionCode,
                                        item.transDescription,
                                        item?.carrierRef,
                                        item.vehicleNo,
                                        item.remarks,
                                        item.challanDetails
                                    )}
                                >
                                    <FaEdit className="icon mr-2" />
                                </button>
                            </td>
                        )}
                        {Object.keys(columnsConfig.dataKeys).map((key, colIndex) => (
                            <td key={colIndex} className="text-center">
                                {item[key] || ''}
                            </td>
                        ))}
                    </tr>
                </React.Fragment>
            ))}
        </tbody>
    );
});

export default TableBody;
