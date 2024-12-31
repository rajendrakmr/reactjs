 

  export  const headers = {
    action: 'Action',
    indentStatus: 'Status',
    groupNo: 'Fun Group No',
    subGroupNo: 'Sub Group',
    indentNo: 'Indent No',
    deptIndentDate: 'Dept. Indent Date',
    deptIndentNo: 'Dept. Indent No', 
    purposeOfProcurement: 'Purpose Of Procurement',
    proposeddateOfDelivery: 'Proposed Date of Delivery', 
    placeOfDelivery: 'Place of Delivery',
    // subGroupName: 'Sub Group Name', 
    // groupName: 'Fun Group Name',
    designation: 'Desig Name', 
    department: 'Dept Name',
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