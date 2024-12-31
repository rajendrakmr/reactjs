import { getCookie } from "../../../../utils/cookieService"; 
const currentUser = getCookie('userInfo');

export const initialData = {
      loginId:currentUser?.loginId,
      stnIndentNo: "",
      stnIndentDate: "",
      deptBookSrlNo: null,
      indentingDivision: "",
      indentingDivisionName: "",
      supplyingDivision: "",
      supplyingDivisionName: "",
      transactionCodeId: "12",
      tranDescIndentingDiv: "STORE TRANSFER NOTE (RECEIPT)",
      transactionCodeSd: "23",
      tranDescSupplyingDiv: "STORE TRANSFER NOTE (ISSUE)",
      stnIndentedBy:currentUser?.loginId,
      empCode: currentUser?.NGS,
      empName: `${currentUser?.empName?currentUser?.empName:null}`,
      stnIndentedDate: "",
      stnIndentStatus: null,
      groupNo: "",
      funcGroupName: "",
      subGroupNo: "",
      sunGroupName: "", 
      stnIndentChildList: [
      {
          stnIndentSrlNo: "",
          jobCode: "",
          jobDesc: "",
          itemCode: "",
          folioNo: null,
          itemDescription: "",
          unitCode: "",
          unitDescription: "",
          binNumber: null,
          earlierBalanceStock: 0,
          reqQtyInNumber: null,
          qtyTakenOnStn: 0,
          finalBalanceStock: 0,
          remarks: "", 
          indentBinBalance: 0
      }
  ]
};
;

 
       