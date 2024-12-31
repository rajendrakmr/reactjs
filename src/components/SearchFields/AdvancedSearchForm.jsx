import React from 'react';
import PropTypes from 'prop-types';
import { FaSyncAlt, FaSearch } from 'react-icons/fa';

const AdvancedSearchForm = ({
  isAdvancedSearch,
  children, 
  filterHandleChange,
  resetSearch,
  handleSearch,
  isFilter,
  dataLoading
}) => {
  if (!isAdvancedSearch) return null;

  return (
    <div className="form-container">
      <div style={{ boxSizing: 'border-box' }} className="py-2 mx-auto shadow-sm">
        <div className="row mx-auto mw-100">
          {children} 

          <div className="d-flex justify-content-end gap-4 mt-3 flex-wrap">
            {isFilter && (
              <button
                type="button"
                onClick={resetSearch}
                className="btn btn-sm custome-button-danger text-white"
              >
                <FaSyncAlt className={dataLoading ? 'spn' : ''} /> Reset
              </button>
            )}
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-sm custome-button-color1 text-white"
            >
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AdvancedSearchForm.propTypes = {
  isAdvancedSearch: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired, 
  filterHandleChange: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isFilter: PropTypes.bool,
  dataLoading: PropTypes.bool
};

AdvancedSearchForm.defaultProps = {
  isFilter: false,
  dataLoading: false
};

export default AdvancedSearchForm;
