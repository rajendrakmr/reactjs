import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';  
import { fetchPostPreData } from '../redux/reducer/commonApiSlice';
 



const GetTypeOfReport = async (baseUrl) => {
    const dispatch = useDispatch();
    const MenuItem = useSelector(state => state.menu);   
    const [reportTypeOption, setReportTypeOption] = useState([]); 
    useEffect(() => {
       
        const currentMenu = MenuItem?.menuList.Store?.Transaction?.find(report => report.menuLinkName === baseUrl);  
        if (currentMenu?.dcpyViewSecurityMenyKey?.menuId)
        {  
            const payload = currentMenu?.dcpyViewSecurityMenyKey?.menuId; 
            const action = dispatch(fetchPostPreData({payload, indicatorsPath: `/report/reportType/${payload}` })); 
            
            if (fetchPostPreData.fulfilled.match(action) && action?.payload?.success) {
                if (action.payload.success.length > 0) {
                    setReportTypeOption(action?.payload?.success);
                }
            }else{
                setReportTypeOption([])
            } 
           
        } 
    }, [MenuItem, baseUrl]);

    return { reportTypeOption, setReportTypeOption };
};

export default GetTypeOfReport;
