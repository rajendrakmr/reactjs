
import { fetchGetPreData, fetchPostPreData } from "../../../../redux/reducer/commonApiSlice"; 


export const GetDepoCode = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/dest/all-depo' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode}-${item?.depoDescription}`,
            items:item  
        }))  
        setOptions((preUpt)=>[...newUpted]);
    }
};


export const GetItemCode = async (dispatch, setOptions, payload = { depoCode: '' ,pageNumber:1,pageSize:10},isScroll=false) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/item/master-list' }));  
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.itemCode,
            label: `${item?.itemCode}`,
            items:item  
        }))  
        if(isScroll){
            setOptions((preUpt)=>[...preUpt,...newUpted]);
        }else{
            setOptions((preUpt)=>[...newUpted]);
        }
        
    }
};



export const GetAliasDepoCode = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/dest/all-depo' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode}-${item?.depoDescription}`,  
        }))  
        setOptions((preUpt)=>[...newUpted]);
    }
};
 
 

export const GetAliasItemCode = async (dispatch, setOptions, payload = { depoCode: '' ,pageNumber:1,pageSize:10},isScroll=false) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/item/master-list' }));
    console.log("actionactionactionactionaction",action)  
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
        
    }
};
 