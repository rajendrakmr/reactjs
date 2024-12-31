
import { fetchPostPreData } from "../../../../redux/reducer/commonApiSlice";

export const GetInspectionCode = async (dispatch, setOptions, payload = { inspectionNo: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/ClaimRejectionItem/get-inspection-list' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.inspectionNo,
            label: `${item?.inspectionNo}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};


export const checkClaimQty = async (dispatch, setFormData, payload = { inspectionNo: '' }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/ClaimRejectionItem/claim-qty' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success) { 
        setFormData(prev => ({
            ...prev, 
            checkItemQty: action.payload.success
        }));
    }
};



