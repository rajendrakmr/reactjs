import { postGetPreData } from "../../../../redux/reducer/commonApiSlice";

 
export const GetItemCode = async (dispatch, setOptions, payload = { itemCode: "", depoCode: "", pageNumber: 1, pageSize: 2 }, isScroll = false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/balance/all/itemCode' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.itemCode,
            label: `${item?.itemCode}`,
            items:item,
            AsOnDate:action?.payload?.AsOnDate
        }))
        if (isScroll) {
            setOptions((preUpt) => [...preUpt, ...newUpted]);
        } else {
            setOptions((preUpt) => [...newUpted]);
        }

    } 
};



//Get Depo code
export const GetDepoCode = async (dispatch, setOptions, payload = { depoCode: "" }) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/stn/indent/get/indenting-division' }));

    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        setOptions(action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode}`,
            items: item
        })));
    }
};
