import { getCookie } from "../../../../utils/cookieService";

const userInfo = getCookie('userInfo') 
export const initialData = { 
    tranType: "",
    depoCode: "",
    itemCode: "",
    unitCode: "",
    debitCreditFlag: "",
    adjustedQty: "",
    locationBinDesc: "",
    binNumber: "",
    remarks: "",
    CreatedBy: userInfo?.loginId,
    empName:userInfo?.empName,
    
  };
  