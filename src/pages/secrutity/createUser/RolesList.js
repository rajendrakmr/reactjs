import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Import the FaPlus icon from react-icons library

const RolesList = ({ menuList }) => {
  const [expandedModules, setExpandedModules] = useState({});

  const toggleModule = (moduleName) => {
    setExpandedModules((prevState) => ({
      ...prevState,
      [moduleName]: !prevState[moduleName]
    }));
  };

  const renderSubMenu = (subMenuItems) => {
    return subMenuItems.map((item, index) => (
      <div key={index} className="form-check custom-checkboxss ml-3"> {/* Adjusted margin for indentation */}
        <label className="form-check-label mmmm" htmlFor={`submenu_${item.menuName}`}>
          {item.menuReportHeading}
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={`submenu_${item.menuName}`}
        />
      </div>
    ));
  };

  const renderMenu = () => {
    return Object.entries(menuList).map(([moduleName, subMenuItems]) => (
      <div key={moduleName}>
        <div className="d-flex align-items-center mb-2" onClick={() => toggleModule(moduleName)}>
          <FaPlus
            size={16}
            style={{ cursor: 'pointer' }}
            className={expandedModules[moduleName] ? 'rotate-icon' : ''}
          />
          <span className="ml-2">{moduleName}</span>
          <input
            className="form-check-input ml-2"
            type="checkbox"
            value=""
            id={`module_${moduleName}`}
          />
        </div>
        {expandedModules[moduleName] && (
          <div className="ml-3"> {/* Indent sub-menus */}
            {renderSubMenu(subMenuItems)}
          </div>
        )}
      </div>
    ));
  };

  return <div>{renderMenu()}</div>;
};

export default RolesList;
