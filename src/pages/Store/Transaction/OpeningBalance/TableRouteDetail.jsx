import React, { memo ,useState,useEffect,useCallback} from 'react';
import Select from "react-select";
import TableRequired from '../../../../components/TableRequired';
import { useDispatch} from 'react-redux';
import { getCookie } from '../../../../utils/cookieService';
import { GetEmpList } from './apiService';

const TableRouteDetail = ({ setFormData, setErrors, errors,routing }) => {
  const createdBy = getCookie('userInfo')?.loginId;
  const dispatch = useDispatch();

  const [empOptions, setSetEmpOptions] = useState([]) 

  
  useEffect(() => {  
    GetEmpList(dispatch, setSetEmpOptions, createdBy);
  }, []);


  const memoizedHandleTableSelectChange = useCallback((e,field) => { 
    const {items,label } = e;   
        setFormData(prev => ({
          ...prev,
          selectedLoginId: items?.bossLoginId, 
          routingDetail: label, 
        }));  

        setErrors(prevErrors => {
          const updatedErrors = { ...prevErrors }; 
          if(updatedErrors[field]) {
            delete updatedErrors[field];  
          } 
          return updatedErrors;  
        }); 
       
  }, [setFormData]);
  return (<>
    <div className="container">
      <div className="row justify-content-md-end">
        <div className="col-md-auto">
          <div className="form-group   d-flex  align-items-center justify-content-end">
            <div className="col-sm-4 col-4">
              <h5>
                Routing <TableRequired />
              </h5>
            </div>
            <div className="col-sm-8 col-8">
              <Select
                className={`wide-input5 custome-border ${errors.selectedLoginId ? "is-invalid" : ""}`}
                id="selectedLoginId"
                name="selectedLoginId"
                options={empOptions}
                onChange={(selectedOption) => memoizedHandleTableSelectChange(selectedOption, 'selectedLoginId')}
                value={empOptions.find(option => option.value === routing) || null}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
              {errors.selectedLoginId && (
                <div className="invalid-feedback">
                  {errors.selectedLoginId}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};

 
const areEqual = (prevProps, nextProps) => { 
  return (prevProps.routing === nextProps.routing && prevProps.errors === nextProps.errors);
};

export default React.memo(TableRouteDetail, areEqual);
