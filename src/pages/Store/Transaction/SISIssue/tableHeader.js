 


export const headers = {
  action: 'Action',
  sisIssueNo: "SIS Issue No",                  
  issueDate: "Issue Date",                     
  sisReqNo: "Issue Req No",                      
  issuerName: "Issuer Name",                    
  issuerDate: "Issue Date",                           
  storeOfficerName: "Store Officer Name",                          
  departmentName: "Dept Name",                  
  // employeeName: "Employee Name",                
  // receiverName: "Receiver Name",                 
  designationName: "Desg Name",          
  depoCode: "Depo",          
  // transactionCode: "Transaction",         
  // receiverRemarks: "Receiver Remarks",           
  // issueStatus: "Issue Status",    
};


export const changeKeyName = (obj) => {
  const rename_key_name = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => rename_key_name(item));
    } else if (typeof data === 'object' && data !== null) {
      const {
        viewSisIssueChildDTOS,
        ...rest
      } = data;
      const newObject = {
        ...rest,
        ...(viewSisIssueChildDTOS !== undefined && { sisIssueChildList: rename_key_name(viewSisIssueChildDTOS) }),
      };

      return newObject;
    }
    return data;
  };
  return rename_key_name(obj);
};
