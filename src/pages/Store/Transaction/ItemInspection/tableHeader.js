
  export  const headers = {
    action: 'Action',
    inspectionNo: "Inspection No",
    inspectionDate: "Inspection Date",
    challanNo: "Challan No",
    challanDate: "Challan Date",
    challanQtyInNumber: "Challan Qty",
    qtyAccepted: "Accepted Qty",
    qtyRejected: "Rejected Qty",
    depoCode: "Depot Code",
    itemCode: "Item Code",
    unitCode: "Unit Code",
    poNo: "PO No",
    poDate: "PO Date",
    // vendorCode: "Vendor Code",
    vendorName: "Vendor Name",
    // ordItmSrlNo: "Order Item Serial No",
    // folioNo: "Folio No",
    // discrepancyNoted: "Discrepancy Noted",
    // challanSrlNo: "Challan Serial No",
    // remarks: "Remarks",
    // itemDescription: "Item Description",
    // unitDescription: "Unit Description",
    // depoName: "Depot Name"
  };
  

  export const changeKeyName = (obj) => { 
    const rename_key_name = (data) => {
      if (Array.isArray(data)) {
        return data.map(item => rename_key_name(item));
      } else if (typeof data === 'object' && data !== null) {
        const {
          viewIndentItemChildDTOS,
          viewIndentRefChildDTOS,
          viewIndentItemChildOfChildDTOS,
          ...rest
        } = data; 
        const newObject = {
          ...rest,
          ...(viewIndentItemChildDTOS !== undefined && { indentItemChildList: rename_key_name(viewIndentItemChildDTOS) }),
          ...(viewIndentRefChildDTOS !== undefined && { indentRefChildren: rename_key_name(viewIndentRefChildDTOS) }),
          ...(viewIndentItemChildOfChildDTOS !== undefined && { indentItemChildOfChildList: rename_key_name(viewIndentItemChildOfChildDTOS) }),
        };
  
        return newObject;
      }
      return data;
    };
  
    return rename_key_name(obj);
  };