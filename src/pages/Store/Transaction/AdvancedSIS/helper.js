import { getCookie } from "../../../../utils/cookieService";

const createdBy = getCookie('userInfo')?.loginId;
const empName = getCookie('userInfo')?.empName;
const test = getCookie('userInfo');

 
export const initialData = {
    loginId: createdBy, 
    challanIssueDate: "",
    challanNo: "",
    deptChallanNo: "",
    challanDate: "",
    depoCode: "",
    depoDescription: "",
    poNo: "",
    poDate: "",
    dateOfReceipt: "",
    issuer: null,
    issuerName:empName,
    issuerDate: "",
    storeOfficer: null,
    storeOfficerName: null,
    storeOffiDate: "",
    challanIssueStatus: "Y",
    receivedBy: null,
    receivedByName: null,
    receiverRemarks: "",
    remarks: "",
    challanIssueChildren: [
        { 
            itemCode: "",
            itemDesc: "",
            folioNo: null,
            unitCode: null,
            unitDesc: "",
            balanceStock: null,
            rate: null,
            amount: null,
            remarks: "",
            location: "",
        },
    ],
}