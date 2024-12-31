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
  

  export const headers = {
    action:'Action',
    challanIssueNo: 'Advanced SIS No',
    challanIssueDate: 'Advanced SIS Date',
    challanNo: 'Challan No',
    deptChallanNo: 'Dept Challan No',
    challanDate: 'Challan Date',
    depoCode: 'Depot Code',
    depoDescription: 'Depot Description',
    poNo: 'PO No',
    poDate: 'PO Date',
    dateOfReceipt: 'Date of Receipt', 
    issuerName: 'Issuer By',
    issuerDate: 'Issuer Date',
    storeOfficerName: 'Store Officer',
    storeOffiDate: 'Store Officer Date', 
    receivedByName: 'Received By', 
  };
  

  export const changeKeyName = (obj) => { 
    const rename_key_name = (data) => {
      if (Array.isArray(data)) {
        return data.map(item => rename_key_name(item));
      } else if (typeof data === 'object' && data !== null) {
        const {
          challanIssueChild, 
          ...rest
        } = data; 
        const newObject = {
          ...rest,
          ...(challanIssueChild !== undefined && { challanIssueChildren: rename_key_name(challanIssueChild) }), 
        };
  
        return newObject;
      }
      return data;
    }; 
    return rename_key_name(obj);
  };
