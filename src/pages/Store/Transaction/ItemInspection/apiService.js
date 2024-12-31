
import { postGetPreData } from "../../../../redux/reducer/commonApiSlice";

export const GetItemCode = async (dispatch, setOptions, payload = { depoCode: '' }, isScroll = false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/stock/get-by-depoCode' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.itemCode,
            label: `${item?.itemCode}-${item?.itemDescription}`,
            items: item
        }))
        if (isScroll) {
            setOptions((preUpt) => [...newUpted]);
        } else {
            setOptions((preUpt) => [...preUpt, ...newUpted]);
        }

    }
};

export const GetJobCode = async (dispatch, setOptions, payload = { depoCode: '05' }, isScroll = false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/job-list' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.jobCode,
            label: `${item?.jobCode} - ${item?.jobDescription}`,
            items: item
        }))
        if (isScroll) {
            setOptions((preUpt) => [...newUpted]);
        } else {
            setOptions((preUpt) => [...preUpt, ...newUpted]);
        }
    }
};

export const GetChallanNo = async (dispatch, setOptions,Is, payload = { challanNumber: "" }) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/challan/header/get-by-id' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.challanNo,
            label: `${item?.challanNo}`,
            items: item, 
            isDisabled:Is?true:false
        }))
        setOptions(newUpted);
    }
};

export const GetChallanSrNo = async (dispatch, setOptions, setFormData, payload = { challanNumber: "", challanPrNumber: 0 }) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/child/challan/get/-by-id' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpdated = action.payload.success;
        setFormData((prevState) => ({
            ...prevState,
            challaItemSrNos:newUpdated,
        }));
    } else {
        setFormData((prevState) => ({
            ...prevState,
            challaItemSrNos: [{
                isChildSerial: false,
                challanQtyInNumber: "",
                qtyRejected: "",
                qtyAccepted: "",
                remarks: ""
            }]
        }));
    }
};