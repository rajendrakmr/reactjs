
import { fetchGetPreData } from "../../../../redux/reducer/commonApiSlice";

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
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};
 