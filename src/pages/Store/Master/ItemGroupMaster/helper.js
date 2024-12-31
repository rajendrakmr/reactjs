import { getCookie } from "../../../../utils/cookieService";

const createdBy = getCookie('userInfo')?.loginId;
export const initialData = {
    loginId: createdBy, 
    activeFlag: "Y",
    groupCode: "",
    groupName:"", 
}

 