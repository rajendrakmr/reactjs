import { getCookie } from "../../../../utils/cookieService";

const createdBy = getCookie('userInfo')?.loginId;
const NGS = getCookie('userInfo')?.NGS;
export const initialData = {
    reqDate: "",
    depoCode: "",
    transactionCode: "",
    reqDepartment: "",
    issueReqSrlNo: "",
    groupNo: "",
    subGroupNo: "",
    demandedBy: createdBy,
    ngsDemandedBy:NGS,
    loginId: createdBy,
    designation:"",
    demandedByDesig:"",
    desigDemandedBy: "",
    reqStatus: "",
    sisRequisitionChildList: [
      {
        jobCode:"",
        jobDesc: null,
        itemCode: "",
        reqQtyInNumber: "",
        chargableHead: "",
        remarks: ""
      }
    ]
  };
  