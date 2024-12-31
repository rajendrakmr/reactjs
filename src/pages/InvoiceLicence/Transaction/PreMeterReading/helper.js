import { getCookie } from "../../../../utils/cookieService"; 
const currentUser = getCookie('userInfo');

console.log(currentUser,"currentUser=======================")

export const initialData = {
    customerId: "",
    readingNgs: currentUser?.NGS,
    consumerTypeCode: "",
    meterNo: "",
    readingDate: "",
    lastReading: "", 
    currentReading: "",
    arrearAmt:"",
    refundAmt: "",
    noOfMonths:"2",
    monthsInChar:"",
    remarks: null,
};

// {
//     "customerId":"WG0001",
//     "connectionTypeCode":1,
//     "meterNo":"ABC-1213",
//     "readingDate":"11/12/2024",
//     "readingNgs":"11888",
//     "lastReading":1234.24,
//     "currentReading":1256.30,
//     "arrearAmt":345,
//     "refundAmt":12,
//     "noOfMonths":1,
//     "monthsInChar":"Jan-Fab",
//     "remarks":"hsxasjas",
//     "loginId":1
// }



