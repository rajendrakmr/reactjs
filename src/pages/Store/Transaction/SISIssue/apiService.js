
import { fetchPostPreData } from "../../../../redux/reducer/commonApiSlice";



export const RecieverCode = async (dispatch, setOptions, payload = {}) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/issue/get/challan-issue-pr' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.loginId,
            label: `${item?.empName}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};

export const GetIssuerCode = async (dispatch, setFormData, payload = {}) => { 
    const action = await dispatch(fetchPostPreData({ dataInfo: {}, indicatorsPath: '/sis/issue/get/challan-issue-pr' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        setFormData(prev => ({
            ...prev,
            issuer: action.payload.success[0].loginId,
            issuerName: action.payload.success[0].empName
        }));
    }
};



export const GetSISRequestionNo = async (dispatch, setOptions, payload = {}) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/issue/get/sisreq-data' })); 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted = action.payload.success.map((item) => ({
            value: item?.sisReqNo,
            label: `${item?.sisReqNo}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};




export const GetReqItem = async (dispatch, setFormData, payload = { sisReqNo: "" }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/sis/issue/get/sisreq-item' }));

    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const updatedChildList = action.payload.success.map(item => ({
            reqItemSrlNo: item.reqItemSrlNo,
            issueQtyInNumber: "",
            balanceStock: item.stockQuantity,
            remarks: "",
            itemCode: item.itemCode,
            itemDescription: item.itemDescription,
            folioNo: item.folioNo,
            unitCode: item.unitCode,
            unitDescription: item.unitDescription,
            reqQtyInNumber: item.reqQtyInNumber,
            rate: item.wtAvgRate,
            amount: 0,
            binBalance: "",
            transDescription:item.transDescription,
        }));
        setFormData(prev => ({
            ...prev,
            sisIssueChildList: updatedChildList,
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            sisIssueChildList: [{
                itemCode: "",
                folioNo: "",
                itemDescription: "",
                unitCode: "",
                unitDescription: "",
                reqQtyInNumber: "",
                issueQtyInNumber: "",
                balanceStock: "",
                remarks: "",
                rate: "",
                amount: 0,
                binBalance: 0,
                transDescription:""
            }],
        }));
    }
};
