

  export const headers = {
    action:'Action',
    challanIssueNo: 'Advanced SIS No',
    // challanIssueSrlNo: 'Challan Issue Srl No',
    challanIssueDate: 'Advanced SIS Date',
    challanNo: 'Challan No',
    deptChallanNo: 'Dept Challan No',
    challanDate: 'Challan Date',
    challanIssueQty: 'Advanced SIS Qty',
    depoCode: 'Depot Code',
    itemCode: 'Item Code',
    unitCode: 'Unit Code', 
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
