
import { fetchGetPreData } from "../../../../redux/reducer/commonApiSlice"; 


export const GetDepoCode = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/dest/all-depo' }));
    console.log('depoOptions',action)
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode}-${item?.depoDescription}`,  
        }))  
        setOptions((preUpt)=>[...newUpted]);
    }
};



export const GetUnitCode = async (dispatch, setOptions, payload = { }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/unit-code/get-all/unitcode' })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item,
            label: `${item}`,  
        }))  
        setOptions((preUpt)=>[...newUpted]);
    }
};

 
 