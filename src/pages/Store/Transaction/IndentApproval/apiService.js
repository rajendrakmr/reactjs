
import { postGetPreData } from "../../../../redux/reducer/commonApiSlice"; 

export const GetItemCode = async (dispatch, setOptions, payload = { depoCode: '' },isScroll=false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/stock/get-by-depoCode' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.itemCode,
            label: `${item?.itemCode}-${item?.itemDescription}`, 
            items:item
        })) 
        if(isScroll){
            setOptions((preUpt)=>[...newUpted]);
        }else{
            setOptions((preUpt)=>[...preUpt,...newUpted]);
        }
        
    }
};

export const GetJobCode = async (dispatch, setOptions, payload = { depoCode: '05' },isScroll=false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/job-list' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.jobCode,
            label: `${item?.jobCode} - ${item?.jobDescription}`,
            items: item 
        })) 
        if(isScroll){
            setOptions((preUpt)=>[...newUpted]);
        }else{
            setOptions((preUpt)=>[...preUpt,...newUpted]);
        }
    }
};

export const GetEmpList = async (dispatch, setOptions, createdBy) => {
    const payload = { loginId:createdBy};
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/route-emplist' }));
 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) {  
        const newUpted =  action.payload.Success.map((item) => ({
            value: item?.bossLoginId,
            label: `${item?.bossLoginName}-${item?.bossName}`,
            items: item 
        })) 
        setOptions((preUpt)=>[...newUpted]);
    }
};

export const GetDepoCode = async (dispatch, setOptions, payload = { depoCode: '' }) => { 
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/stn/indent/get/indenting-division' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode} - ${item?.depoDescription}`,
            items: item 
        })) 
        setOptions((preUpt)=>[...preUpt,...newUpted]);
    }
};

export const GetPOCode = async (dispatch, setOptions, payload = { depoCode: '', itemCode: '' },isScroll=false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/last-polist' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
        const newUpted =  action.payload.Success.map((item) => ({
            value: item?.ordRefNumber,
            label: `${item?.ordRefNumber}`,
            items: item 
        }))  
        if(isScroll){
            setOptions((preUpt)=>[...newUpted]);
        }else{
            setOptions((preUpt)=>[...preUpt,...newUpted]);
        }
    }
};
 

export const GetFunGroupName = async (dispatch, setFormData, payload = { deptSecCode: '' }) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/funcgroup-name' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const response = action.payload.success[0];  
        setFormData(prev => ({
            ...prev,
            groupNo: response.deptSecCode,
            groupName: response.deptSecDescription,
            subGroupNo: '',
            subGroupName: '',
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            groupNo: '',
            groupName: '',
            subGroupNo: '',
            subGroupName: '',
        }));
    }
};

export const GetSubFunGroupName = async (dispatch, setFormData, payload = { deptSecCode: "", parentDeptSecCode: "" }) => {
    
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/subgroup-name' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        
        const response = action.payload.success[0]; 
        setFormData(prev => ({
            ...prev,
            subGroupNo: response.deptSecCode,
            subGroupName: response.deptSecDescription,
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            subGroupNo: '',
            subGroupName: '',
        }));
    }
};

export const GetCP = async (dispatch, setFormData, payload = { depoCode: "", itemCode: "",deptIndentdate:"" },targetIndex) => {
  
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/consumption-pattern' })); 
 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
      setFormData((prev) => { 
        const updatedIndentItemList = [...prev.indentItemChildList];  
        updatedIndentItemList[targetIndex].indentItemChildOfChildList = action.payload.Success; 
        return {
          ...prev,
          indentItemChildList: updatedIndentItemList
        };
      });
        
    }
};

export const apAuth = async (dispatch, setData, ngs) => {
    const payload = { ngs:ngs};
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/approving-auth' }));  
    if (postGetPreData.fulfilled.match(action)) {  
        setData(action.payload);
    }
};


export const indentCreator = async (dispatch, setForm, payload = { indentNo: ""}) => {  
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/indent-creator' }));
    
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success) { 
      setForm((prev) => {  
        return {
          ...prev,
          selectedLoginId:action?.payload?.success,
          routingDetailsModuleList:[{}]
        };
      });  
    }
};