import React from 'react';
import { formatDateToDDMMYYYY } from '../../../../helperFuc'; 
const HeaderLookUp = ({ challanNos,formData, onRowClick, onClose }) => { 
    return (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog modal-xl ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Lookup Table</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-hover">
                            <thead className="table-header-bg text-white">
                                <tr>
                                <th className="text-center" scope="col"></th>
                                    <th className="text-center" scope="col">Depot Code</th>
                                    <th className="text-center" scope="col">Depot Description</th>
                                    <th className="text-center" scope="col">Challan No</th>
                                    <th className="text-center" scope="col">Challan Date</th>
                                    <th className="text-center" scope="col">PO No</th>
                                    <th className="text-center" scope="col">PO Date</th>
                                    <th className="text-center" scope="col">Vendor Code</th>
                                    <th className="text-center" scope="col">Vendor Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {challanNos?.map((item, index) => (
                                    <tr key={index} onClick={() => onRowClick(item)} style={{ backgroundColor: item.challanNo === formData.challanNo ? "#d3d3d3" : "transparent" }}>
                                        <td className="text-center">  
                                        {item.challanNo === formData.challanNo && " ✓"}</td>
                                        <td className="text-center">{item.depoCode}</td>
                                        <td className="text-center">{item.depoDescription}</td>
                                        <td className="text-center">{item.challanNo}</td>
                                        <td className="text-center">{formatDateToDDMMYYYY(item.challanDate)}</td>
                                        <td className="text-center">{item.poNo}</td>
                                        <td className="text-center">{formatDateToDDMMYYYY(item.poDate)}</td>
                                        <td className="text-center">{item.vendorCode}</td>
                                        <td className="text-center">{item.vendorName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};



const areEqual = (prevProps, nextProps) => {
    if (prevProps.challanNos !== nextProps.challanNos) {
        return false;
    } 
    return true;
};


 



export default React.memo(HeaderLookUp, areEqual); 