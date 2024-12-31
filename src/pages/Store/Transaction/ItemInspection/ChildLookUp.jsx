import React from 'react'; 

const ChildLookUp = ({ challanSrNos, onRowClick,itemInsRecord, onClose }) => {
    return (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Lookup Table Children</h5>
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
                                    <th className="text-center" scope="col">Challan SrNo</th>
                                    <th className="text-center" scope="col">Item Code</th>
                                    {/* <th className="text-center" scope="col">Folio No</th> */}
                                    <th className="text-center" scope="col">Item Description</th>
                                    <th className="text-center" scope="col">Ord Item SrNo</th>
                                    <th className="text-center" scope="col">Challan Qty. No</th>
                                    <th className="text-center" scope="col">Unit Code</th>
                                    <th className="text-center" scope="col">Unit Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {challanSrNos?.map((item, index) => { 
                                    const isMatched = itemInsRecord.some(record => record.challanSrlNo == item.challanSrlNo); 
                                    return (
                                    <tr 
                                        key={index} 
                                        onClick={() => onRowClick(item)} 
                                        style={{ backgroundColor: isMatched ? "#d3d3d3" : "transparent" }}  
                                    >
                                        <td className="text-center">
                                        {isMatched && "✓"} 
                                        </td>
                                        <td className="text-center">{item.challanSrlNo}</td>
                                        <td className="text-center">{item.itemCode}</td>
                                        {/* <td className="text-center">{item.folioNo}</td> */}
                                        <td className="text-center">{item.itemDescription}</td>
                                        <td className="text-center">{item.ordItmsrlNo}</td>
                                        <td className="text-center">{item.challanQtyInNumber}</td>
                                        <td className="text-center">{item.unitCode}</td>
                                        <td className="text-center">{item.unitDescription}</td>
                                    </tr>
                                    );
                                })}
                                </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};



const areEqual = (prevProps, nextProps) => {
    if (prevProps.challanSrNos !== nextProps.challanSrNos) {
        return false;
    }
    if (prevProps.itemInsRecord !== nextProps.itemInsRecord) {
        return false;
    }


    return true;
};




export default React.memo(ChildLookUp, areEqual); 