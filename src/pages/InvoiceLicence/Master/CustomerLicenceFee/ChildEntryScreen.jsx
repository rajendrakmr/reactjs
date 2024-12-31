import React, { useCallback, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField';

import SelectCellField from '../../../../components/table/form/SelectCellField';
import TableRequired from '../../../../components/TableRequired';
import ChildModalEntryScreen from './ChildModalEntryScreen';


const ChildEntryScreen = ({ customerLicenseFeeChildren, setFormData,hasError,formData, errors, setErrors, isEdit, stateOptions }) => {
  const [isShipping, setIsShipping] = useState(false);
  const [isChildVisible, setIsChildVisible] = useState(false)
  const [currentChild, setCurrentChild] = useState({})
  const [indexNo, setIndexNo] = useState(null)
  const handleAddRow = () => {
    setIsChildVisible(true)
    const newRow = {
      ...(isEdit && { srlNo: null }),
      addressType: "",
      name: "",
      address1: "",
      address2: "",
      address3: "",
      pinCode: "",
      stateCd: "",
      stateName: "",
      defaultFlagShipAdd: "",
      isShipping: ""
    };
    setFormData(prevData => ({
      ...prevData,
      customerLicenseFeeChildren: [...prevData.customerLicenseFeeChildren, newRow]
    }));
  };




  const handleRemoveParent = (parentIndex) => {
    const updatedIndentItemList = customerLicenseFeeChildren.filter((_, index) => index !== parentIndex);
    setFormData(prevData => ({
      ...prevData,
      customerLicenseFeeChildren: updatedIndentItemList
    }));
  };



  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`customerLicenseFeeChildren_${parentIndex}`] || '';
    }

    return errors;
  }, [errors]);


  const setSelectError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`customerLicenseFeeChildren_${parentIndex}`]?.[field] || '';
    }
    return errors;
  }, [errors]);




  const handleChangeSelect = useCallback(async (e, parentIndex, field) => {
    const { items, value } = e;
    const setItem = {};
    if (field == 'stateCd') {
      setItem.stateCd = value
    }
    if (field == 'addressType') {
      setItem.addressType = value
    }

    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.customerLicenseFeeChildren];
      updatedIndentItemList[parentIndex] = {
        ...items,
        ...updatedIndentItemList[parentIndex],
        ...setItem,
      };
      return { ...prevData, customerLicenseFeeChildren: updatedIndentItemList };
    });

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `customerLicenseFeeChildren_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });



  }, [setFormData]);


  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.customerLicenseFeeChildren];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        [field]: value,
      };
      return { ...prevData, customerLicenseFeeChildren: updatedIndentItemList };
    });
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `customerLicenseFeeChildren_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });
  }, [setFormData]);

  const addressTypeOptions = [
    { value: 'Permanent', label: 'Permanent' },
    { value: 'Corporate', label: 'Corporate' },
    { value: 'Present', label: 'Present' },
  ]



  const handleCheckboxChange = (e, parentIndex, row) => {
    const { checked } = e.target;
    const updateCustomerDtl = [...customerLicenseFeeChildren];
    updateCustomerDtl[parentIndex] = { ...updateCustomerDtl[parentIndex], ...row, defaultFlagShipAdd: checked ? "Y" : "N" };
    if (!checked) {
      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        const errorKey = `customerLicenseFeeChildren_${parentIndex}`;
        if (updatedErrors[errorKey]) {
          if (Object.keys(updatedErrors[errorKey]).length === 0) {
            delete updatedErrors[errorKey];
          }
        }
        return updatedErrors;
      });
    }

    setFormData(prev => {
      return {
        ...prev,
        customerLicenseFeeChildren: updateCustomerDtl
      };
    });

  };


 

  return (
    <div className="container-fluid p-0">
      <div className="w-100 m-0 p-0">
        <div className="table-responsive scroll-container" style={{ maxHeight: "40vh", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th></th>
                <th>Address Type<TableRequired /></th>
                <th>Name</th>
                <th>Address 1<TableRequired /></th>
                <th>Address 2</th>
                <th>Address 3</th>
                <th>PIN Code<TableRequired /></th>
                <th>State<TableRequired /></th>
                <th>Is Shipment Address</th>
              </tr>
            </thead>
            <tbody className="child_item">
              {customerLicenseFeeChildren.length > 0 && customerLicenseFeeChildren?.map((row, parentIndex) => (
                <React.Fragment key={parentIndex}>
                  <tr>
                    <td>
                      {parentIndex !== 0 ? (
                        <FaTimes
                          className="text-danger crossDel"
                          onClick={() => handleRemoveParent(parentIndex)}
                        />
                      ) : (
                        <FaTimes
                          className="text-muted crossDel-disabled"
                          style={{ cursor: 'not-allowed', opacity: 0.5 }}
                          onClick={() => { }}
                        />
                      )}

                    </td>
                    <SelectCellField
                      parentIndex={parentIndex}
                      field="addressType"
                      options={addressTypeOptions}
                      selectedValue={row.addressType}
                      handleChangeSelect={handleChangeSelect}
                      setSelectError={setSelectError}
                      cName='wide-input1'
                    />

                    <InputCellField value={row.name} onChange={(e) => handleChange(e, parentIndex, 'name')} name="name" errorMsg={setError(parentIndex, 'name')} className="wide-input3" />

                    <InputCellField value={row.address1} onChange={(e) => handleChange(e, parentIndex, 'address1')} name="address1" errorMsg={setError(parentIndex, 'address1')} className="wide-input3" />

                    <InputCellField value={row.address2} onChange={(e) => handleChange(e, parentIndex, 'address2')} name="address2" errorMsg={setError(parentIndex, 'address2')} className="wide-input3" />
                    <InputCellField value={row.address3} onChange={(e) => handleChange(e, parentIndex, 'address3')} name="address3" errorMsg={setError(parentIndex, 'address3')} className="wide-input4" />
                    <InputCellField value={row.pinCode} onChange={(e) => handleChange(e, parentIndex, 'pinCode')} name="pinCode" errorMsg={setError(parentIndex, 'pinCode')} className="wide-input" type="number" max="10" />



                    <SelectCellField
                      parentIndex={parentIndex}
                      field="stateCd"
                      options={stateOptions}
                      selectedValue={row.stateCd}
                      handleChangeSelect={handleChangeSelect}
                      setSelectError={setSelectError}
                      cName='wide-input3'
                    />
                    <td>

                      <div className="custom-radio"> <input
                        type="radio" 
                        id={`option1${parentIndex}`}
                        className={`   `}
                        name='defaultFlagShipAdd'
                        checked={row.defaultFlagShipAdd == "Y" ? true : false}
                        onChange={(e) => handleCheckboxChange(e, parentIndex, row)}
                      />
                        <label htmlFor={`option1${parentIndex}`}></label>
                      </div>

                    </td>
                  </tr>

                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <button className="custome-background-color1 addIconStyle" onClick={handleAddRow}>
          <FaPlus className="me-1" /> Add Row
        </button>
       

      </div>
    </div>
  );
};



const areEqual = (prevProps, nextProps) => {
  return (prevProps.customerLicenseFeeChildren === nextProps.customerLicenseFeeChildren && prevProps.errors === nextProps.errors && prevProps.stateOptions === nextProps.stateOptions && prevProps.itemOptions === nextProps.itemOptions);
};




export default React.memo(ChildEntryScreen, areEqual); 