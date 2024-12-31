
import { fetchPostPreData } from "../../../../redux/reducer/commonApiSlice"; 

export const GetClaimNo = async (dispatch, setOptions, payload = { claimNo: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/SupplyRejectedItem/get/claim-list' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) {
        const newUpted = action.payload.Success.map((item) => ({
            value: item?.claimNo,
            label: `${item?.claimNo}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};
 


export const checkClaimQty = async (dispatch, setFormData, payload = { claimNo: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/SupplyRejectedItem/claim/supply-qty' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success) { 
        setFormData(prev => ({
            ...prev, 
            checkItemQty: action.payload.success
        }));
    }
};

