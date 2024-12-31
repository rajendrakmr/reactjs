import React, { useCallback } from 'react';
import { FaEye, FaPlus, FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField';
import TableRequired from '../../../../components/TableRequired';
import InputDateCellField from '../../../../components/table/form/InputDateCellField';
import { statusCodeOptions } from '../../../helperFun';
import SelectCellField from '../../../../components/table/form/SelectCellField';

const ChildDocRef = ({ isEdit, setFormData, errors, setErrors, indentRefChildren }) => {
  const handleAddRow = () => {
    const newRow = {
      refType: "",
      refNo: "",
      refDate: "",
      refDesc: "",
      refIsActive: "Y",
      refUpdDate: "",
      refUpdFile: "xyz"
    };

    setFormData(prevData => ({
      ...prevData,
      indentRefChildren: [...prevData.indentRefChildren, newRow]
    }));
  };

  const handleRemoveParent = (parentIndex) => {
    if (indentRefChildren.length > 1) {
      const updateIndentRefChildren = indentRefChildren.filter((_, index) => index !== parentIndex);
      setFormData(prevData => ({
        ...prevData,
        indentRefChildren: updateIndentRefChildren
      }));
    } else {
      alert('Invalid data')
    }
  };

  const getError = (parentIndex) => {
    return errors[`indentRefChildren_${parentIndex}`] || '';
  };





  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.indentRefChildren];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        [field]: value,
      };

      //check validation errror
      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        const errorKey = `indentRefChildren_${parentIndex}`;
        if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
          delete updatedErrors[errorKey][field];
        }
        return updatedErrors;
      });
      return { ...prevData, indentRefChildren: updatedIndentItemList };
    });
  }, [setFormData]);


  const handleChangeSelect = useCallback(async (e, parentIndex, field) => {
    const { value } = e;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.indentRefChildren];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        [field]: value,
      };

      //check validation errror
      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        const errorKey = `indentRefChildren_${parentIndex}`;
        if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
          delete updatedErrors[errorKey][field];
        }
        return updatedErrors;
      });
      return { ...prevData, indentRefChildren: updatedIndentItemList };
    });
  }, []);


  const setSelectError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`indentItemChildList_${parentIndex}`]?.[field] || '';
    }
    return errors;
  }, [errors]);


  //Generating preview file
  const handleView = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'application/pdf' });
    const viewUrl = URL.createObjectURL(blob);
    window.open(viewUrl, '_blank');
  };

  return (
    <div className="container-fluid p-0 d-flex flex-row m-0">
      <div className="w-100 m-0 p-0">
        <div className="table-responsive scroll-container" style={{ maxHeight: "40vh", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th></th>
                <th>Reference Type </th>
                <th>Reference No</th>
                <th>Reference Date</th>
                <th>Reference Description</th>
                <th>Is Active</th>
                <th>Reference Upload Date</th>
                <th>Reference Upload File</th>
                
              </tr>
            </thead>
            <tbody className="child_item">
              {indentRefChildren.map((row, parentIndex) => (
                <tr key={parentIndex}>
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
                  <InputCellField
                    value={row.refType}
                    onChange={(e) => handleChange(e, parentIndex, 'refType')}
                    name="refType"
                    errorMsg={getError(parentIndex)}
                    className="wide-input2"
                    disabled={isEdit}
                  />
                  <InputCellField
                    value={row.refNo}
                    onChange={(e) => handleChange(e, parentIndex, 'refNo')}
                    name={`refNo`}
                    errorMsg={getError(parentIndex)}
                    className="wide-input2"
                    disabled={isEdit}
                  />
                  <InputDateCellField
                    value={row.refDate}
                    onChange={(e) => handleChange(e, parentIndex, 'refDate')}
                    name={`refDate`}
                    errorMsg={getError(parentIndex)}
                    className="wide-input2"
                    type="date"
                    isDefault={isEdit}
                  />
                  <InputCellField
                    value={row.refDesc}
                    onChange={(e) => handleChange(e, parentIndex, 'refDesc')}
                    name="refDesc"
                    errorMsg={getError(parentIndex)}
                    className="wide-input3"
                    disabled={isEdit}
                  />
                  <SelectCellField
                    field="refIsActive"
                    parentIndex={parentIndex}
                    options={statusCodeOptions}
                    selectedValue={row.refIsActive}
                    handleChangeSelect={handleChangeSelect}
                    setSelectError={setSelectError}
                    cName='wide-input1'
                    isDefault={isEdit}
                  />
                  <InputDateCellField
                    value={row.refUpdDate}
                    onChange={(e) => handleChange(e, parentIndex, 'refUpdDate')}
                    name="refUpdDate"
                    errorMsg={getError(parentIndex)}
                    className="wide-input2"
                    type="date"
                    isDefault={isEdit}
                  />
                  {
                    row.refUpdFile ? <a
                      href={row.refUpdFile ? row.filePreview : ''}
                      disabled={!row.refUpdFile}
                      onClick={(e) => {
                        if (!row.refUpdFile) {
                          e.preventDefault();
                        } else {
                          handleView(row.refUpdFile);
                        }
                      }}
                      rel="noopener noreferrer"
                      className={`wide-input0 ${!row.refUpdFile ? 'disabled' : ''}`}
                    >
                      <FaEye /> View
                    </a> :

                      <InputCellField
                        value={row.refUpdFile}
                        onChange={(e) => handleChange(e, parentIndex, 'refUpdFile')}
                        name="refUpdFile"
                        errorMsg={getError(parentIndex)}
                        className="wide-input2"
                        disabled={isEdit}
                      />}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isEdit && <button className="custome-background-color1 addIconStyle" onClick={handleAddRow}>
          <FaPlus className="me-1" /> Add Row
        </button>}


      </div>
    </div>
  );
};


const areEqual = (prevProps, nextProps) => {
  return (prevProps.indentRefChildren === nextProps.indentRefChildren && prevProps.errors === nextProps.errors);
};

export default React.memo(ChildDocRef, areEqual); 
