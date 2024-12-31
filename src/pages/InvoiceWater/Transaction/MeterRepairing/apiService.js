import { fetchGetPreData, fetchPostPreData } from "../../../../redux/reducer/commonApiSlice";

//get /report/get/auditTrial no
export const GetrepairDoneByNgs = async (dispatch, setOptions, payload = {},isScrol=false) => {   
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/meter-repair/get/ngs-name' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item.ngs, 
            label: `${item.ngs}-${item.nam}`,
            items: item
        }))
        // console.log('newUptednewUpted',newUpted)
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



