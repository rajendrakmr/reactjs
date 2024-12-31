import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie } from '../../../../utils/cookieService';
import { GetEmpList } from './apiService';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';

const TableRouteDetail = ({ setFormData, setErrors, errors, routing }) => {
  const createdBy = getCookie('userInfo')?.loginId;
  const dispatch = useDispatch();

  const [empOptions, setSetEmpOptions] = useState([])


  useEffect(() => {
    GetEmpList(dispatch, setSetEmpOptions, createdBy);
  }, []);


  const memoizedHandleTableSelectChange = useCallback((e, field) => {
    const { items, label } = e;
    setFormData(prev => ({
      ...prev,
      selectedLoginId: items?.bossLoginId,
      routingDetail: label,
    }));

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors[field]) {
        delete updatedErrors[field];
      }
      return updatedErrors;
    });

  }, [setFormData]);

  const hasError = useCallback((name) => {
    return !!errors[name];
  }, [errors]);

  return (<>
    <div className="container d-flex justify-content-end"> 
        <SelectFormInput
          col='col-md-4'
          childCol="col-sm-4 col-4"
          chiCol="col-sm-8 col-8"
          onChange={(selectedOption) => memoizedHandleTableSelectChange(selectedOption, 'selectedLoginId')}
          id="selectedLoginId"
          name="selectedLoginId"
          label="Routing"
          options={empOptions}
          value={routing}
          hasError={hasError}
          error={errors.selectedLoginId}
          required={true}
        />
      </div>
    
  </>);
};


const areEqual = (prevProps, nextProps) => {
  return (prevProps.routing === nextProps.routing && prevProps.errors === nextProps.errors);
};

export default React.memo(TableRouteDetail, areEqual);
