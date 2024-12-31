
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



export const GetEmpCode = async (dispatch, setFormData, payload = {createdBy:"",retType:"G"}) => { 
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/stn/indent/get/stnindentedby' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success) {
        setFormData(prev => ({
            ...prev,
            issuedByEmpCode: action.payload.success
        }));
    }
};

export const GetEmpName = async (dispatch, setFormData, payload = {createdBy:"",retType:"G"}) => { 
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/stn/indent/get/stnindentedby' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success) {
        setFormData(prev => ({
            ...prev,
            issuedByEmpName: action.payload.success
        }));
    }
};


 
export const GetSTNIndentNo = async (dispatch, setOptions, payload = { stnIndentNo: "" }) => {
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/stn/supply/get/indent-data' }));
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) {
        const newUpted = action.payload.Success.map((item) => ({
            value: item?.stnIndentNo,
            label: `${item?.stnIndentNo}`,
            items: item
        }))
        setOptions((preUpt) => [...newUpted]);
    }
};




export const GetSuplyItem = async (dispatch, setFormData, payload = { stnIndentNo: "" }) => { 
    const action = await dispatch(fetchPostPreData({ dataInfo: payload, indicatorsPath: '/stn/supply/get/indent-item' }));
 
    if (fetchPostPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) {
        const updatedChildList = action.payload.Success.map(item => ({ 
            stnIndentSrlNo:item.stnIndentSrlNo,
            itemCode: item.itemCode,
            itemDescription: item.itemDescription,
            qtyIssuedOnStn: item.reqQtyInNumber,
            reqQtyInNumber: item.reqQtyInNumber,
            remarks: "",
            issueQtyInNumber: "",
            folioNo: item.folioNo,
            unitCode: item.unitCode,
            unitDescription: item.unitDescription, 
            rate: item.wtAvgRate,
            amount: 0, 
            priceStoreLedgerIFolioNo: "",
            priceStoreLedgerRFolioNo: "",
            earlierBalanceStock:item.stockQuantity,
            finalBalanceStock:null
        })); 
        setFormData(prev => ({
            ...prev,
            stnSupplyChildList: updatedChildList,
        }));
    }else{
        setFormData(prev => ({
            ...prev,
            stnSupplyChildList: [{ 
                stnIndentSrlNo:"",
                itemCode: "",
                itemDescription: "",
                qtyIssuedOnStn: "",
                reqQtyInNumber: "",
                remarks: "",
                issueQtyInNumber: "",
                folioNo: "",
                unitCode: "",
                unitDescription: "", 
                rate: "",
                amount: 0, 
                priceStoreLedgerIFolioNo: "",
                priceStoreLedgerRFolioNo: "",
                earlierBalanceStock:"",
                finalBalanceStock:null
            }],
        }));
    }
};
