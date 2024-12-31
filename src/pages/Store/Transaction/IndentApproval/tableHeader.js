export const subHeader = {
    depoCode: 'Depot Code',
    itemCode: 'Item Code',
    folioNo: 'Folio No',
    itemDescription: 'Item Description',
    unitCode: 'Unit',
    unitDesc: 'Unit Desc.',
    quantity: 'Quantity',
    jobCode: 'Job Code',
    jobName: 'Job Desc',
    lastPoNo: 'Last PO No',
    lastPoDate: 'Last PO Date',
    lastPoRate: 'Last PO Rate',
    outstandingIndentNo: 'Outstanding Indent No',
    outstandingIndentDate: 'Outstanding Indent Date',
    outstandingPoNo: 'Outstanding PO No',
    outstandingPoDate: 'Outstanding PO Date',
    specialInstruction: 'Special Instruction',
    modeOfTender: 'Mode of Tender',
    vendorDetails: 'Vendor Details',
    action: 'Action'
  };

  export const childRef = {
    refType: 'Reference Type',
    refNo: 'Reference No',
    refDate: 'Reference Date',
    refDesc: 'Reference Description',
    refIsActive: 'Is Active',
    refUpdDate: 'Reference Upload Date',
    refUpdFile: 'Reference Upload File'
  };

  export const childOfChildHeaders = {
    depotCode: 'Depot Code',
    itemCode: 'Item Code',
    itemDescription: 'Item Description',
    balanceStock: 'Balance Stock',
    cpSi: 'Consumption Pattern from Inception',
    cpLast1Yr: 'Consumption Pattern Last 1 Year',
    cpLast3Yr: 'Consumption Pattern Last 3 Years',
    reorderLevel: 'Reorder Level',
  };
  

  export  const headers = {
    action: 'Action',
    indentStatus: 'Indent Status',
    indentNo: 'Indent No',
    deptIndentNo: 'Dept. Indent No',
    deptIndentDate: 'Dept. Indent Date', 
    designation: 'Indentor Designation',
    department: 'Indentor Dept', 
    proposedDateOfDelivery: 'Proposed Date of Delivery', 
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