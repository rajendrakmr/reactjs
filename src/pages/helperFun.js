import { fetchPostPreData } from "../redux/reducer/commonApiSlice";

export const statusCodeOptions = [
    { value: "Y", label: "Active" },
    { value: "N", label: "In Active" },
]


export const statusOptions = [
    { value: "Y", label: "Yes" },
    { value: "N", label: "No" },
]
export const GetTypeReport = async (dispatch, setTypeOfReport, payload = null) => {
    const action = await dispatch(fetchPostPreData({ payload, indicatorsPath: `/report/reportType/${payload}` })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success) {
        if (action.payload.success.length > 0) {
            setTypeOfReport(action?.payload?.success);
        }else{
            setTypeOfReport([])
        }
    }
};
