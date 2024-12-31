
import { postGetPreData } from "../../../../redux/reducer/commonApiSlice"; 

export const GetItemCode = async (dispatch, setOptions, payload = { depoCode: '' },isScroll=false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/stock/get-by-depoCode' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.itemCode,
            label: `${item?.itemCode}-${item?.itemDescription}`, 
            items:item
        })) 
        if(isScroll){
            setOptions((preUpt)=>[...preUpt,...newUpted]);
           
        }else{
            setOptions((preUpt)=>[...newUpted]);
        }
        
    }
};

export const GetJobCode = async (dispatch, setOptions, payload = { depoCode: '05' },isScroll=false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/job-list' }));
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.jobCode,
            label: `${item?.jobCode} - ${item?.jobDescription}`,
            items: item 
        })) 
        if(isScroll){
            setOptions((preUpt)=>[...newUpted]);
        }else{
            setOptions((preUpt)=>[...preUpt,...newUpted]);
        }
    }
};

export const GetEmpList = async (dispatch, setOptions, createdBy) => {
    const payload = { loginId:createdBy};
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/route-emplist' }));
 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) {  
        const newUpted =  action.payload.Success.map((item) => ({
            value: item?.bossLoginId,
            label: `${item?.bossLoginName}-${item?.bossName}`,
            items: item 
        })) 
        setOptions((preUpt)=>[...newUpted]);
    }
};

export const GetDepoCode = async (dispatch, setOptions, payload = { depoCode: '' }) => { 
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/stn/indent/get/indenting-division' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) { 
        const newUpted =  action.payload.success.map((item) => ({
            value: item?.depoCode,
            label: `${item?.depoCode} - ${item?.depoDescription}`,
            items: item 
        })) 
        setOptions((preUpt)=>[...preUpt,...newUpted]);
    }
};

export const GetPOCode = async (dispatch, setOptions, payload = { depoCode: '', itemCode: '' },isScroll=false) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/last-polist' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
        const newUpted =  action.payload.Success.map((item) => ({
            value: item?.ordRefNumber,
            label: `${item?.ordRefNumber}`,
            items: item 
        }))  
        if(isScroll){
            setOptions((preUpt)=>[...newUpted]);
        }else{
            setOptions((preUpt)=>[...preUpt,...newUpted]);
        }
    }
};



// dataService.js

export const GetFunGroupName = async (dispatch, setFormData, payload = { deptSecCode: '' }) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/funcgroup-name' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        const response = action.payload.success[0];  
        setFormData(prev => ({
            ...prev,
            groupNo: response.deptSecCode,
            groupName: response.deptSecDescription,
            subGroupNo: '',
            subGroupName: '',
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            groupNo: '',
            groupName: '',
            subGroupNo: '',
            subGroupName: '',
        }));
    }
};

export const GetSubFunGroupName = async (dispatch, setFormData, payload = { deptSecCode: "", parentDeptSecCode: "" }) => {
    
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/sis/requisition/get/subgroup-name' })); 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success?.length > 0) {
        
        const response = action.payload.success[0]; 
        setFormData(prev => ({
            ...prev,
            subGroupNo: response.deptSecCode,
            subGroupName: response.deptSecDescription,
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            subGroupNo: '',
            subGroupName: '',
        }));
    }
};

export const GetCP = async (dispatch, setFormData, payload = { depoCode: "", itemCode: "",deptIndentdate:"" },targetIndex) => {
  
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/consumption-pattern' })); 
 
    if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
      setFormData((prev) => { 
        const updatedIndentItemList = [...prev.indentItemChildList];  
        updatedIndentItemList[targetIndex].indentItemChildOfChildList = action.payload.Success; 
        return {
          ...prev,
          indentItemChildList: updatedIndentItemList
        };
      });
        
    }
};


export const RouteHistory = async (dispatch, setOptions, payload = { indentNo: ""}) => { 
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/routing-hist' }));  
    if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
        const UserData = action.payload.Success
        setOptions((preUpt)=>[...UserData]); 
    }else{
        setOptions([]); 
    }
};



export const indentSender = async (dispatch, setForm, payload = { indentNo: ""}) => {  
      const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/indent-creator-sender' }));
      
      if (postGetPreData.fulfilled.match(action) && action?.payload?.success) { 
        setForm((prev) => {  
          return {
            ...prev,
            selectedLoginId:action?.payload?.success,
            routingDetailsModuleList:[{}]
          };
        });  
      }
};




export const GetPlaceOfDel = async (dispatch, setOptions, payload = null) => { 
  return  setOptions([
        {label:'DPL',value:"DPL"},
        {label:'Water Works Store',value:"Water Works Store"},
        {label:'Stationary Store',value:"Stationary Store"},
        {label:'Kolkata Office',value:"Kolkata Office"},
        {label:'DPPS Store',value:"DPPS Store"}
    ]); 
    // const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/routing-hist' }));  
    // if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
    //     const UserData = action.payload.Success
    //     setOptions((preUpt)=>[...UserData]); 
    // }else{
    //     setOptions([]); 
    // }
};

export const GetFunGroup = async (dispatch, setOptions, payload = null) => { 
    return  setOptions([
          {label:'01 - COKE-OVEN',value:"01"},
          {label:'02 - GAS PLANT',value:"02"},
          {label:'03 - TAR & B.P.',value:"03"},
          {label:'04 - COAL WASHERY',value:"04"},
      ]); 
      // const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/routing-hist' }));  
      // if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
      //     const UserData = action.payload.Success
      //     setOptions((preUpt)=>[...UserData]); 
      // }else{
      //     setOptions([]); 
      // }
  };

  export const GetSubFunGroup = async (dispatch, setOptions, payload = null) => { 
    return  setOptions([
          {label:'11 -COAL WASHERY',value:"11"},
          {label:'12 - Maintenance',value:"12"}, 
      ]); 
      // const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: '/indent/get/routing-hist' }));  
      // if (postGetPreData.fulfilled.match(action) && action?.payload?.Success?.length > 0) { 
      //     const UserData = action.payload.Success
      //     setOptions((preUpt)=>[...UserData]); 
      // }else{
      //     setOptions([]); 
      // }
  };