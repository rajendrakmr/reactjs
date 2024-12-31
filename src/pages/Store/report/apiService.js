// import { getPreDefData } from "../../../redux/reducer/store/transaction/IndentReducer";

import { fetchGetPreData,postGetPreData } from "../../../redux/reducer/commonApiSlice";
import { getPreDefData } from "../../../redux/reducer/store/transaction/IndentReducer";


//get depo Code for report
export const GetReportDepoCode = async (dispatch, setOptions, payload = 'null') => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/report/get/depo-code' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode}-${item?.depoDescription}`,
        }))
        setOptions((preUpt) => [...preUpt, ...newUpted]);
    }
};



// get depo Code for report
export const GetReportItemCode = async (dispatch, setOptions, payload = { itemCode: "", depoCode: "", pageNumber: 1, pageSize: 2 }, isScroll = false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/report/get/item-code' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success) {
        if (action.payload.success.length > 0) {
            const newUpted = action.payload.success.map((item) => ({
                value: item?.itemCode,
                label: `${item?.itemCode}-${item?.itemDescription}`,
            }))
            if (isScroll) {
                setOptions((preUpt) => [...preUpt, ...newUpted]);
            } else {
                setOptions((preUpt) => [{ value: "0", label: "All" },...newUpted]);
            }

        } else {
            if (isScroll) {  setOptions((preUpt) => [...preUpt]);
            } else {setOptions([{  value: "0",  label:"All" }]);
            }
        }

    }
};


export const GetReportGroupCode = async (dispatch, setOptions, payload = null) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/report/get/group-code' }));
 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success) {
        if (action.payload.success.length > 0) {
            const newUpted = action.payload.success.map((item) => ({
                value: item?.groupCode,
                label: item?.groupCode, 
            })) 
            setOptions((preUpt) => [...preUpt, ...newUpted]);
        }
    }
};


//get Report type action
export const GetReportType = async (dispatch, setReportType, payload = null) => {
    const action = await dispatch(getPreDefData({ payload, indicatorsPath: `/report/reportType/${payload}` }));
    if (getPreDefData.fulfilled.match(action) && action?.payload?.success) {
        if (action.payload.success.length > 0) {
            setReportType(action?.payload?.success);
        }
    }
};

 
export const GetTransCode = async (dispatch, setOptions, payload = null) => {  
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/report/get/tc-code/0' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newOptions = action.payload.success.map((item) => ({
            value: item?.tcCode,
            label: `${item?.tcCode}-${item?.tcName}`,
        })); 
        setOptions([{ value: "0", label: "All" }, ...newOptions]);
    } else { 
        setOptions([{ value: "0", label: "All" }]);
    }
};


//get getRecordType Code for report
export const GetRecordType= async (dispatch, setOptions, payload = null) => {  
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/report/get/record-type' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.srlNo,
            label: `${item?.recType}`, 
                })) 
        setOptions((preUpt)=>[...newUpted]);  
    } 
};

//get finanace
export const GetFinanceYear = async (dispatch, setOptions, payload = null) => {  
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: 'report/get/fin-year' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newOptions = action.payload.success.map((item) => ({
            value: item,
            label: item,
        })); 
        setOptions(newOptions); // No "All" option added
    } 
};


//get indent no
export const GetIndentNo = async (dispatch, setOptions, payload = null) => {  
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/report/get/indentNo' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newOptions = action.payload.success.map((item) => ({
            value: item.indentNo,
           label: `${item?.indentNo} (${item?.deptIndentNo})`
        })); 
        setOptions(newOptions); // No "All" option added
    } 
};


//get /report/get/auditTrial no
export const GetAuditTrail = async (dispatch, setOptions, payload = null) => {  
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/report/get/auditTrial' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newOptions = action.payload.success.map((item) => ({
            value: item,
           label: item
        })); 
        setOptions(newOptions); // No "All" option added
    } 
};

//get /report/get/auditTrial no
export const GetwaterCatCode = async (dispatch, setOptions, payload = null) => {  
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: 'water-rate/get/all-water-rate/null' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newOptions = action.payload.success.map((item) => ({
            value: item.waterCatCode, 
            label: `${item.waterCatCode}`,
            items: item
        })); 
        setOptions(newOptions); // No "All" option added
    } 
};







