
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



export const GetItemCode = async (dispatch, setOptions, payload = { depoCode: "", itemCode: "", pageNumber: 1, pageSize: 10 }, isScrol = false) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/stock/get-by-depoCode' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.itemCode,
            label: `${item?.itemCode}`,
            items: item
        }))
        if (isScrol) {
            setOptions((preUpt) => [...preUpt, ...newUpted]);
        } else {
            setOptions((preUpt) => [...newUpted]);
        }
    } else {
        setOptions((preUpt) => {
            if (preUpt && preUpt.length > 0) {
                return [...preUpt];
            } else {
                return [{ value: '', label: 'No Records' }];
            }
        });
    }
};



