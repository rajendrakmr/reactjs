
import { fetchPostPreData } from "../../../../redux/reducer/commonApiSlice";

export const GetDepoCode = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/stock/get-All-depoCodes' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode} - ${item?.depoDescription}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};

export const GetPOCode = async (dispatch, setOptions, payload = { depoCode: '' },isScroll=false) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/challan/header/get/po-list' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        // console.log('action?.payload?.successaction?.payload?.success',action?.payload?.success)
        const newUpted = action.payload.success.map((item) => ({
            value: item?.ordRefNumber,
            label: `${item?.ordRefNumber}`,
            items: item
        }))
        if(isScroll){
            console.log('newUpted',newUpted)
            setOptions((preUpt) => [...preUpt,...newUpted]);
        }else{
            console.log('items sdfdf',newUpted)
            setOptions((preUpt) => [...newUpted]);
        }
       
    }
};
export const GetChallanCode = async (dispatch, setOptions, payload = { challanNumber: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/challan/header/get/challan-by-id' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.challanNo,
            label: `${item?.challanNo}-${item?.deptChallanNo}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};

export const GetTransactionCode = async (dispatch, setOptions, payload = {}) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/trans/get/trans-code' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.transactionCode,
            label: `${item?.transactionCode}-${item?.transDescription}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};


export const GetOrderItem = async (dispatch, setOptions, payload = {poNumber: "", ordItmsrlNo: 0, }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/child/challan/get/ord-srl-no' }));
 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.ordItemCode,
            label: `${item?.ordItemCode}-${item?.ordItmDesc}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};

export const GetItemCode = async (dispatch, setOptions, payload = { challanNumber: '', depoCode: '' }, isScroll = false) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/challan/issue/get/challan-item' }));
   
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.challanQtyInNumber,
            label: `${item?.challanQtyInNumber}-${item?.itemCode}`,
            items: item
        }))
        if (isScroll) {
            setOptions((preUpt) => [...preUpt, ...newUpted]);
        } else {
            setOptions((preUpt) => [...newUpted]);
        }

    } else {
        if (isScroll) {
            setOptions((preUpt) => [...preUpt]);
        } else {
            setOptions([{
                value: '',
                label: 'Not Available',
            }]);
        }
    }
};

 


export const GetJobCode = async (dispatch, setOptions, payload = {}) => { 
    const action = await dispatch(fetchPostPreData({ dataInfo:payload, indicatorsPath: '/child/challan/get/job-list' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.jobCode,
            label: `${item?.jobCode}-${item?.jobDescription}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};




export const GetEmpList = async (dispatch, setOptions, createdBy) => {
    const payload = { loginId: createdBy };
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/indent/get/route-emplist' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) {
        const newUpted = action.payload.Success.map((item) => ({
            value: item?.bossLoginId,
            label: `${item?.bossLoginId}-${item?.bossName}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};






// dataService.js

export const GetFunGroupName = async (dispatch, setFormData, payload = { deptSecCode: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/funcgroup-name' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const response = action.payload.success[0];
        setFormData(prev => ({
            ...prev,
            groupNo: response.deptSecCode,
            groupName: response.deptSecDescription,
        }));
    }
};

export const GetSubFunGroupName = async (dispatch, setFormData, payload = { deptSecCode: "", parentDeptSecCode: "" }) => {

    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/subgroup-name' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {

        const response = action.payload.success[0];
        setFormData(prev => ({
            ...prev,
            subGroupNo: response.deptSecCode,
            subGroupName: response.deptSecDescription,
        }));
    }
};


