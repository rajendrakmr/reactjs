import { getCookie } from "../../../../utils/cookieService";

const createdBy = getCookie('userInfo')?.loginId; 
export const initialData = {
  supplyNo: "",
  supplyDate: "",
  claimNo: "",
  qtySupplied: null,
  challanCompleted: "",
  remarks: "",
  claimDate: "",
  inspectionNo: "",
  inspectionDate: "",
  qtyClaimed: 0,
  challanNo: "",
  itemCode: "",
  vendorCode: "",
  vendorName: "",
  checkItemQty:0,
  checksetItemQty:0,

  loginId: createdBy
};

  