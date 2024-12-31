
// import { fetchPostPreData } from "../../../../redux/reducer/commonApiSlice"; 

import { fetchPostPreData } from "../../redux/reducer/commonApiSlice";



// get depo list 
export const GetDepoCode = async (dispatch, setOptions, payload = { depoCode: '' }) => { 
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/stock/get-All-depoCodes' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode} - ${item?.depoDescription}`,
            items: item 
        })) 
        setOptions((preUpt)=>[...preUpt,...newUpted]);
    }
};

export const GetRequisitionDept = async (dispatch, setOptions, payload = {deptCode:""}) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/department-list' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.deptCode,
            label: `${item?.deptCode}-${item?.deptName}`, 
            items:item
        }))  
        setOptions((preUpt)=>[...newUpted]);
    }
};
//Get Trasaction Code
export const GetTransactionCode = async (dispatch, setOptions, payload = {}) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/trans/get/trans-code' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.transactionCode,
            label: `${item?.transactionCode}-${item?.transDescription}`, 
            items:item
        })) 
        setOptions((preUpt)=>[...newUpted]);
    }
};



export const GetChallanCode = async (dispatch, setOptions, payload = { challanNumber: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/challan/header/get/challan-by-id' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.challanNo,
            label: `${item?.challanNo}-${item?.deptChallanNo}`, 
            items:item
        })) 
        setOptions((preUpt)=>[...newUpted]);
    }
};



export const RecieverCode = async (dispatch, setOptions, payload = {}) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/issue/get/challan-issue-pr' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.loginId,
            label: `${item?.loginId}-${item?.empName}`, 
            items:item
        })) 
        setOptions((preUpt)=>[...newUpted]);
    }
};



export const GetJobCode = async (dispatch, setOptions, payload = { challanNumber:'',depoCode: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/challan/issue/get/challan-item' }));  
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.challanQtyInNumber,
            label: `${item?.challanQtyInNumber}-${item?.itemCode}`, 
            items:item
        })) 
        setOptions((preUpt)=>[...newUpted]);
    }else{
        const notavail = [{
            value:'',
            label: 'Not Available',
        }]
        setOptions(notavail);
    }
};

export const GetItemCode = async (dispatch, setOptions, payload = { challanNumber:'',depoCode: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/challan/issue/get/challan-item' }));  
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.challanQtyInNumber,
            label: `${item?.challanQtyInNumber}-${item?.itemCode}`, 
            items:item
        })) 
        setOptions((preUpt)=>[...newUpted]);
    }else{
        const notavail = [{
            value:'',
            label: 'Not Available',
        }]
        setOptions(notavail);
    }
};



export const GetIssuerCode = async (dispatch, setFormData, payload = {}) => {
   
    const action = await dispatch(fetchPostPreData({ dataInfo: {}, indicatorsPath: '/sis/issue/get/challan-issue-pr' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {   
        setFormData(prev => ({
            ...prev, 
            issuer: action.payload.success[0].loginId,
            issuerName:action.payload.success[0].empName
          }));
    }
};




export const GetEmpList = async (dispatch, setOptions, createdBy) => {
    const payload = { loginId:createdBy};
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/indent/get/route-emplist' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) {  
        const newUpted =  action.payload.Success.map((item) => ({
            value: item?.bossLoginId,
            label: `${item?.bossLoginId}-${item?.bossName}`,
            items: item 
        })) 
        setOptions((preUpt)=>[...preUpt,...newUpted]);
    }
};

export const GetPOCode = async (dispatch, setOptions, payload = { depoCode: '', itemCode: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/indent/get/last-polist' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
        const newUpted =  action.payload.Success.map((item) => ({
            value: item?.ordRefNumber,
            label: `${item?.ordRefNumber}`,
            items: item 
        })) 
        setOptions((preUpt)=>[...preUpt,...newUpted]);
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


