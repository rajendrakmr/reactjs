import { getCookie } from "../../../../utils/cookieService";

const createdBy = getCookie('userInfo')?.loginId;
export const initialData = {
    loginId: createdBy,  
    waterCatCode:"",
    effectiveFromDate:"",
    effectiveToDate:"",
    rateAmt:"",
    isActive:"Y"
}
 
