
import { fetchGetPreData, fetchPostPreData } from "../../redux/reducer/commonApiSlice";
export const GetCustomerId = async (dispatch, setFormData, payload = null) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: {}, indicatorsPath: `/customer/generate/customerId/${payload}` })); 
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success) { 
        setFormData(prev => ({
            ...prev, 
            customerId: action.payload.success
          }));
    }
};
export const GetWaterCategory = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/water-rate/get/all-water-rate/null' }));
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.waterCatCode,
            label: `${item?.waterCatCode}-${item?.waterCatDesc}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};
 
 

export const GetConsumer = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/consumer-dtls/get/all-consumer-code/0' }));
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.consumerTypeCode,
            label: `${item?.consumerTypeDesc}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};
export const GetConnection = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/consumer-dtls/get/all-connection-code/0' }));
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.connectionTypeCode,
            label: `${item?.connectionTypeDesc}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};
 
export const GetCustomer = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/consumer-dtls/get/all-customerId/null' }));
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.customerId,
            label: `${item?.customerId} - ${item?.customerName}`,
            // items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};
 

export const GetStateCode = async (dispatch, setOptions, payload = { depoCode: '' }) => {
    const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: '/customer/get/state/null' }));
    if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.stcd,
            label: `${item?.stcd}- ${item?.stateName}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};

export const GetMeterNo = async (dispatch, setOptions,payload =null) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: {customerId:payload}, indicatorsPath: `/consumer-dtls/get/all-meterno` })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success.length>0) {  
        const newUpted = action.payload.success.map((item) => ({
            value: item?.meterNo,
            label: `${item?.meterNo}`, 
            items: {...item,effectiveFromDate:item?.lastInstallDate} 
        }))
        setOptions((preUpt) => [...newUpted]);
    }else{
        setOptions((preUpt) => []);
    }
};

 
// export const CheckGstnNo = async (dispatch, setOptions,setError,payload = null) => {
//     const action = await dispatch(fetchGetPreData({ dataInfo: payload, indicatorsPath: `/customer/verify/gstn/${payload}` }));
//     if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success=="Y") { 
//         setOptions((preUpt) => [...newUpted]);
//     }else{

//     }
// };
 