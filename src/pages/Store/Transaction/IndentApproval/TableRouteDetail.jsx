import React, { useState, useEffect, useCallback } from 'react';
import Select from "react-select";
import { useDispatch } from 'react-redux';
import { getCookie } from '../../../../utils/cookieService';
import { GetEmpList } from './apiService';
import { customSelectOption } from '../../../../utils/helper';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';

const TableRouteDetail = ({ setFormData, setErrors, errors, routing, formData }) => {
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

  const setSelectError = useCallback((field) => {
    if (field !== undefined) {
      return errors[field] || '';
    }
    return errors;

  }, [errors]);


  const indentStatusOption = [
    { value: 'T', label: 'Return to Indentor' },
    { value: 'A', label: 'Approved' },
    { value: 'R', label: 'Rejected' }
  ]


  return (<>
    <div className="container">
      <div className="row justify-content-md-end">
        <div className="col-md-4">
          <div className="form-group d-flex  align-items-center justify-content-end">
            {

              formData.indentStatus !== "S" &&
              <>
                <SelectFormInput
                  onChange={(selectedOption) => memoizedHandleTableSelectChange(selectedOption, 'indentStatus')}
                  error={setSelectError('indentStatus')}
                  id="indentStatus"
                  name="indentStatus"
                  label="Status"
                  options={indentStatusOption}
                  col='col-md-10'
                  chiCol="col-sm-9 col-10"
                  childCol="col-sm-3 col-2"
                  value={formData.indentStatus}
                  required={true}
                  isTrue={true}
                />
              </>

            }
            {
              formData.indentStatus === "R" && (
                <>
                  <div className="form-group col-md-11 ml-1 d-flex mt-1 align-items-center justify-content-end">
                    <div className="col-sm-5 col-3">
                      <label htmlFor="rejectionReason" className="mr-3 ml-3 pe-7">
                        Reason<span className="text-danger text-bold">*</span>
                      </label>
                    </div>
                    <div className="col-sm-7 col-9">
                      <textarea
                        name="rejectionReason"
                        id="rejectionReason"
                        placeholder="Enter your rejection reason.."
                        className="form-control"
                        value={formData.rejectionReason}
                        onChange={(e) => setFormData({ ...formData, rejectionReason: e.target.value }) }
                      ></textarea>
                      {errors.rejectionReason && (
                        <small className="text-danger">{errors.rejectionReason}</small>
                      )}
                    </div>
                  </div>
                </>
              )
            }

            {
              formData.indentStatus === "S" &&
              (<>
                <div className="col-sm-4 col-4">
                  <span>
                    Routing
                  </span>
                </div>
                <div className="col-sm-8 col-8">
                  <Select
                    className={`wide-input5 custome-border ${errors.selectedLoginId ? "is-invalid" : ""}`}
                    id="selectedLoginId"
                    name="selectedLoginId"
                    options={empOptions}
                    onChange={(selectedOption) => memoizedHandleTableSelectChange(selectedOption, 'selectedLoginId')}
                    value={empOptions.find(option => option.value == routing) || null}
                    menuPortalTarget={document.body}
                    styles={customSelectOption}
                  />
                  {errors.selectedLoginId && (
                    <div className="invalid-feedback">
                      {errors.selectedLoginId}
                    </div>
                  )}
                </div>
              </>)
            }
          </div>
        </div>
      </div>
    </div >
  </>);
};


const areEqual = (prevProps, nextProps) => {

  return (prevProps.routing === nextProps.routing && prevProps.formData.rejectionReason === nextProps.formData.rejectionReason && prevProps.formData.indentStatus === nextProps.formData.indentStatus && prevProps.errors === nextProps.errors);
};

export default React.memo(TableRouteDetail, areEqual);
