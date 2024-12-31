import React, { useCallback } from 'react';
import { FaEye, FaPlus, FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField';
import InputDateCellField from '../../../../components/table/form/InputDateCellField';
import { statusCodeOptions } from '../../../helperFun';
import SelectCellField from '../../../../components/table/form/SelectCellField';




const ChildDocRef = ({ isEdit, setFormData, errors, setErrors, indentRefChildren, formData }) => {

  const MAX_FILE_SIZE_MB = 5;

  const handleAddRow = () => {
    const newRow = {
      refType: "",
      refNo: "",
      refDate: "",
      refDesc: "",
      refIsActive: "Y",
      refUpdDate: "",
      refUpdFile: []
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
        [field]: value
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


  const fileToByteArray = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(Array.from(byteArray));
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };



  const handleFileChange = async (e, parentIndex) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileType !== 'application/pdf') {

        setFormData((prevData) => {
          const updatedIndentRefChildren = [...prevData.indentRefChildren];
          updatedIndentRefChildren[parentIndex] = {
            ...updatedIndentRefChildren[parentIndex],
            refUpdFile: null,
            fileName: null,
            filePreview: null,
            fileError: "Only PDF files are allowed.",
          };
          setErrors((prevErrors) => ({
            ...prevErrors,
            [`indentRefChildren_${parentIndex}`]: {
              ...prevErrors[`indentRefChildren_${parentIndex}`],
              refUpdFile: "Only PDF files are allowed.",
            },
          }));
          return { ...prevData, indentRefChildren: updatedIndentRefChildren };
        });
        return;
      }

      // Validate file size
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`indentRefChildren_${parentIndex}`]: {
            ...prevErrors[`indentRefChildren_${parentIndex}`],
            fileError: `File size exceeds ${MAX_FILE_SIZE_MB} MB.`,
          },
        }));
        return;
      }

      try {
        const filePreviewUrl = URL.createObjectURL(file);
        const fileByteArray = await fileToByteArray(file);
        setFormData((prevData) => {
          const updatedIndentRefChildren = [...prevData.indentRefChildren];
          if (updatedIndentRefChildren[parentIndex]?.filePreview) {
            URL.revokeObjectURL(updatedIndentRefChildren[parentIndex].filePreview);
          }

          updatedIndentRefChildren[parentIndex] = {
            ...updatedIndentRefChildren[parentIndex],
            refUpdFile: fileByteArray,
            fileName: file.name,
            filePreview: filePreviewUrl,
            fileError: null,
          };

          return { ...prevData, indentRefChildren: updatedIndentRefChildren };
        });
      } catch (error) {

        setErrors((prevErrors) => ({
          ...prevErrors,
          [`indentRefChildren_${parentIndex}`]: {
            ...prevErrors[`indentRefChildren_${parentIndex}`],
            fileError: "Error processing file. Please try again.",
          },
        }));
      }
    }
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
                {isEdit && <th>Is Active</th>}
                <th>Reference Upload Date</th>
                {formData?.indentEdit === "S" && <th> Reference Upload File</th>}
                {(indentRefChildren[0]?.filePreview || indentRefChildren[0]?.refUpdFile) && (<th></th>)}
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
                    disabled={formData?.indentEdit === "S" ? false : true}
                  />
                  <InputCellField
                    value={row.refNo}
                    onChange={(e) => handleChange(e, parentIndex, 'refNo')}
                    name={`refNo`}
                    errorMsg={getError(parentIndex)}
                    className="wide-input2"
                    disabled={formData?.indentEdit === "S" ? false : true}
                  />
                  <InputDateCellField
                    value={row.refDate}
                    onChange={(e) => handleChange(e, parentIndex, 'refDate')}
                    name='refDate'
                    errorMsg={getError(parentIndex)}
                    className="wide-input2"
                    type="date"
                    isDefault={formData?.indentEdit === "S" ? false : true}
                  />
                  <InputCellField
                    value={row.refDesc}
                    onChange={(e) => handleChange(e, parentIndex, 'refDesc')}
                    name="refDesc"
                    errorMsg={getError(parentIndex)}
                    className="wide-input3"
                    disabled={formData?.indentEdit === "S" ? false : true}
                  />
                  {isEdit && <SelectCellField
                    field="refIsActive"
                    parentIndex={parentIndex}
                    options={statusCodeOptions}
                    selectedValue={row.refIsActive}
                    handleChangeSelect={handleChangeSelect}
                    setSelectError={setSelectError}
                    cName='wide-input1'
                    isDefault={formData?.indentEdit === "S" ? false : true}
                  />}
                  <InputDateCellField
                    value={row.refUpdDate}
                    onChange={(e) => handleChange(e, parentIndex, 'refUpdDate')}
                    name="refUpdDate"
                    errorMsg={getError(parentIndex)}
                    className="wide-input2"
                    type="date"
                    isDefault={formData?.indentEdit === "S" ? false : true}
                  />
                  {formData?.indentEdit === "S" && (
                    <td className="text-center">

                      <>
                        <input
                          disabled={formData?.indentEdit === "S" ? false : true}
                          type="file"
                          accept="application/pdf"
                          className="custome-input-height form-control custome-border wide-input3 "
                          onChange={(e) => handleFileChange(e, parentIndex)}
                        />
                        {errors[`indentRefChildren_${parentIndex}`]?.refUpdFile && (
                          <div className="text-danger">
                            {errors[`indentRefChildren_${parentIndex}`]?.refUpdFile}
                          </div>
                        )}
                      </>

                    </td>)}
                  {
                    row?.filePreview ? (<td>
                      <a
                        target='_blank'
                        href={row.filePreview}
                        rel="noopener noreferrer"
                        className={`wide-input0`}
                      >
                        <FaEye /> View
                      </a></td>
                    ) :
                      (row.refUpdFile && (<td>
                        <a
                          onClick={(e) => {
                            if (!row.refUpdFile) {
                              e.preventDefault();
                            } else {
                              handleView(row.refUpdFile);
                            }
                          }}
                          href={row.refUpdFile}
                          target="_blank"

                          rel="noopener noreferrer"
                          className=" wide-input0 "
                        >
                          <FaEye /> Views
                        </a></td>))
                  }

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isEdit && <button className="custome-background-color1 addIconStyle" onClick={handleAddRow}>
          <FaPlus className="me-1" /> Add Row
        </button>}


      </div>
    </div >
  );
};


const areEqual = (prevProps, nextProps) => {
  return (prevProps.indentRefChildren === nextProps.indentRefChildren && prevProps.errors === nextProps.errors);
};

export default React.memo(ChildDocRef, areEqual); 
