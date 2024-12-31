
import { fetchPostPreData } from "../../../../redux/reducer/commonApiSlice"; 

export const GetDepoCode = async (dispatch, setOptions, payload = { depoCode: '' }) => { 
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/stock/get-All-depoCodes' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode} - ${item?.depoDescription}`,
            items: item 
        })) 
        setOptions((preUpt)=>[...newUpted]);
    }
};

export const GetItemCode = async (dispatch, setOptions, payload = { depoCode: '' }, isScroll=false) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/item/master-list' }));
    
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.itemCode,
            label: `${item?.itemCode}-${item?.itemDescription}`, 
            items:item
        })) 
        if(isScroll){
            setOptions((preUpt)=>[...preUpt,...newUpted]); 
        }else{
            setOptions((preUpt)=>[...newUpted]);
        }
        
    }else{
        setOptions((preUpt)=>[]);
    }
};

export const GetJobCode = async (dispatch, setOptions, payload = { depoCode: '05' },isScroll=false) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/child/challan/get/job-list' }));
    console.log('actionactionactionactionactionaction',action)
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.jobCode,
            label: `${item?.jobCode} - ${item?.jobDescription}`,
            items: item 
        })) 
        if(isScroll){
            setOptions((preUpt)=>[...preUpt,...newUpted]);
        }else{
            setOptions((preUpt)=>[...newUpted]);
        }
    }else{
        setOptions((preUpt)=>[{value:'',label:'Not found.'}]);
    }
};


export const GetFunGroupName = async (dispatch, setFormData, payload = { deptSecCode: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/funcgroup-name' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const response = action.payload.success[0];
        setFormData(prev => ({
            ...prev,
            groupNo: response.deptSecCode,
            funcGroupName: response.deptSecDescription,
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            groupNo: '',
            funcGroupName: '',
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
            sunGroupName: response.deptSecDescription,
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            subGroupNo: '',
            sunGroupName: '',
        }));
    }
};