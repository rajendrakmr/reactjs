import { getCookie } from "../../../../utils/cookieService";

const createdBy = getCookie('userInfo')?.loginId;
export const initialData = {
    loginId: createdBy, 
    isActive: "Y",
    waterCatDesc: "",
    gstApplicable:"",
    waterCatDesc: "", 
}
 
