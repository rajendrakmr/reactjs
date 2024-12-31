 
import React, { memo } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true; 
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false;
    } 
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2); 
    if (keys1.length !== keys2.length) {
      return false;
    } 
    for (let key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = typeof val1 === 'object' && typeof val2 === 'object';
  
      if (areObjects && !deepEqual(val1, val2)) {
        return false;
      } else if (!areObjects && val1 !== val2) {
        return false;
      }
    }
    return true;
  };
 

const SelectInputCell = memo(({ 
  parentIndex,  
  options, 
  handleChangeSelect,  
  fieldName, 
  className = '',
  errors, 
  placeholder = 'Select...',
  value
}) => { 
    
 
  const getError = (parentIndex, childIndex, field) => { 
    if (parentIndex !== undefined && childIndex !== undefined) {
      const parentErrors = errors[`indentItemChildList_${parentIndex}`];
      return parentErrors?.[`indentItemChildOfChildList_${childIndex}`] || '';
    }
    if(parentIndex !== undefined && field !==undefined) { 
      return errors[`indentItemChildList_${parentIndex}`]?.[field] || ''; 
    }
    return errors[`indentItemChildList_${parentIndex}`] || '';
  };
  return (
    <td className="custom-dropdown-container">
      <Select
        className={`custome-input-height wide-input5 custome-border ${className} ${getError(parentIndex, null, fieldName) ? 'is-invalid' : ''}`}
        id={fieldName}
        name={fieldName}
        options={options}
        onChange={(selectedOption) => handleChangeSelect(selectedOption, parentIndex, fieldName)}
        value={value}
        placeholder={placeholder}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      /> 
    </td>
  );
}, (prevProps, nextProps) => {  
  return ( 
    deepEqual(prevProps.value, nextProps.value) && 
    prevProps.fieldName === nextProps.fieldName &&  
    prevProps.handleChangeSelect === nextProps.handleChangeSelect  
  );
});

SelectInputCell.propTypes = {
  parentIndex: PropTypes.number.isRequired, 
  value: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  handleChangeSelect: PropTypes.func.isRequired,
  errors: PropTypes.object,
  fieldName: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default SelectInputCell;
