import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { library } from '@fortawesome/fontawesome-svg-core';
import { roleBaseMenuAction } from '../../../redux/slice/cca-grade/ccaGradeSlice';
library.add(fas)

const getRoleBaseMenuList = {
    "Security": {
        "Transactions": [
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 501,
                    "moduleId": 5
                },
                "menuName": "Creation of User",
                "menuLinkName": "/user/creation",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Creation of User",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 1,
                "parentModuleName": "Security"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 502,
                    "moduleId": 5
                },
                "menuName": "Portal Admin",
                "menuLinkName": "/user/portal-admin",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Portal Admin",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 1,
                "parentModuleName": "Security"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 503,
                    "moduleId": 5
                },
                "menuName": "Change Login Password",
                "menuLinkName": "/user/change-password",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Change Login Password",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 1,
                "parentModuleName": "Security"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 504,
                    "moduleId": 5
                },
                "menuName": "Reset Login Password",
                "menuLinkName": "/user/reset-password",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Reset Login Password",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 1,
                "parentModuleName": "Security"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 505,
                    "moduleId": 5
                },
                "menuName": "Creation of Roles",
                "menuLinkName": "/user/role-creation",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Creation of Roles",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 1,
                "parentModuleName": "Security"
            }
        ]
    },
    "Store": {
        "Master": [
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1010,
                    "moduleId": 10
                },
                "menuName": "Depo Master",
                "menuLinkName": "/store/depo-master",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Depo Master",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1020,
                    "moduleId": 10
                },
                "menuName": "Transaction Code Master",
                "menuLinkName": "/store/transection-code-master",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Transaction Code Master",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1030,
                    "moduleId": 10
                },
                "menuName": "Unit Code Master",
                "menuLinkName": "/store/unit-code-master",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Unit Code Master",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1040,
                    "moduleId": 10
                },
                "menuName": "Depowise Job Master",
                "menuLinkName": "/store/depo-wise-job-master",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Depowise Job Master",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1050,
                    "moduleId": 10
                },
                "menuName": "Depowise Item Master",
                "menuLinkName": "/store/depo-wise-item-master",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Depowise Item Master",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1060,
                    "moduleId": 10
                },
                "menuName": "Indent Instruction",
                "menuLinkName": "/store/indent/instruction",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Indent Instruction",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1070,
                    "moduleId": 10
                },
                "menuName": "Indent Approval Authority",
                "menuLinkName": "/store/indent/approval-authority",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Indent Approval Authority",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1080,
                    "moduleId": 10
                },
                "menuName": "ABC and FSN Analysis",
                "menuLinkName": "/store/abc-fsn-analysis",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "ABC and FSN Analysis",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1081,
                    "moduleId": 10
                },
                "menuName": "Item Alias",
                "menuLinkName": "/store/item-alias",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Master",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Item Alias",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            }
        ],
        "Transaction": [
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1110,
                    "moduleId": 11
                },
                "menuName": "Item Inspection",
                "menuLinkName": "/store/item/inspection",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Item Inspection",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1115,
                    "moduleId": 11
                },
                "menuName": "Claim for Rejected Item",
                "menuLinkName": "/store/claim/reject-item",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Claim for Rejected Item",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1120,
                    "moduleId": 11
                },
                "menuName": "Challan Entry",
                "menuLinkName": "/store/challan-entry",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Challan Entry",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1125,
                    "moduleId": 11
                },
                "menuName": "Stock Adjustment Entry",
                "menuLinkName": "/store/stock-adjustment",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Stock Adjustment Entry",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1130,
                    "moduleId": 11
                },
                "menuName": "SIS Requisition",
                "menuLinkName": "/store/sis-requisition",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "SIS Requisition",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1135,
                    "moduleId": 11
                },
                "menuName": "SIS Issue",
                "menuLinkName": "/store/sis-issue",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "SIS Issue",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1140,
                    "moduleId": 11
                },
                "menuName": "STN Indent",
                "menuLinkName": "/store/stn-indent",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "STN Indent",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1145,
                    "moduleId": 11
                },
                "menuName": "STN Supply",
                "menuLinkName": "/store/stn-supply",
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Transaction",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "STN Supply",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "N",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            }
        ],
        "Report": [
            {
                "dcpyViewSecurityMenyKey": {
                    "roleId": 1,
                    "menuId": 1210,
                    "moduleId": 12
                },
                "menuName": "Store Ledger",
                "menuLinkName": null,
                "loginId": 1,
                "loginName": "test",
                "moduleName": "Report",
                "companyMarker": "1",
                "companyName": "The Durgapur Projects Limited",
                "ngs": "11947",
                "menuReportHeading": "Store Ledger",
                "reportXls": "N",
                "reportPdf": "N",
                "reportTxt": "DCST_Ledger_TXT.jrxml",
                "finYearFrom": 2016,
                "finYearTo": 2017,
                "parentModuleId": 2,
                "parentModuleName": "Store"
            }
        ]
    }
};

const MenuListWithCheckbox = ({ handleDropdownToggleCheck, isCollapseCheck, getRoleBaseMenuList1, handleCheckboxChange, setFormData, formData }) => {
    const dispatch = useDispatch();

   

    const [subMenuCollapseStates, setSubMenuCollapseStates] = useState(Array(Object.keys(getRoleBaseMenuList).length).fill(false));

  
    useEffect(() => {
        // Select all checkboxes by default when component mounts
        if (getRoleBaseMenuList) {
            const defaultSelectedMenus = [];
            Object.values(getRoleBaseMenuList).forEach(subModules => {
                Object.values(subModules).forEach(menuItems => {
                    menuItems.forEach(menuItem => {
                        defaultSelectedMenus.push({
                            menuId: menuItem.menuId,
                            moduleName: menuItem.moduleName,
                            moduleId: menuItem.moduleId,
                        });
                    });
                });
            });
            // console.log(`defaultSelectedMenus: ${JSON.stringify(defaultSelectedMenus)}`)
            setFormData(prevState => ({ ...prevState, data: defaultSelectedMenus }));
        }
    }, [getRoleBaseMenuList]);



  
    const renderSubMenuItems = (subMenus) => (
        <ul className="p-0 accordion-body ">
            {subMenus?.map((menuItem, i) => (
                <li key={i} className="child-route-check">
                    <div className="c-route-link d-flex align-items-center">
                        <FontAwesomeIcon icon={faMinus} className="c-route-icon c-cl-w" />
                        <div className='d-flex justify-content-between w-75'>
                        <span className="c-cl-w">{menuItem.menuName}</span>
                        <input
                            type="checkbox"
                            id={`menu${menuItem.menuId}`}
                            value={menuItem.menuId}
                            onChange={(e) =>
                                handleCheckboxChange(
                                    e,
                                    menuItem.menuId,
                                    menuItem.moduleName,
                                    menuItem.moduleId
                                )
                            }
                            checked={formData.data.some(menu => menu.menuId === menuItem.menuId)}
                        />
</div>
                    </div>

                </li>
            ))}
        </ul>
    );

    const toggleSubMenuCollapse = (index) => {
        const newSubMenuCollapseStates = [...subMenuCollapseStates];
        newSubMenuCollapseStates[index] = !newSubMenuCollapseStates[index];
        setSubMenuCollapseStates(newSubMenuCollapseStates);
    };
   
    const countUniqueModule = (items, ParentModule) => {
        const sameModuleArray = items?.filter(item => item?.moduleName === ParentModule);
        const numberOfUniqueModuleNames = sameModuleArray?.length;
        
        return numberOfUniqueModuleNames;
    }
   
    const onParentChange = (e, moduleName, subModules ) => {
        const isChecked = e.target.checked;
        let updatedSelectedMenus = [...formData.data];
        if (!isChecked) {
            // If the checkbox is unchecked, remove menu items with the corresponding module name
            updatedSelectedMenus = updatedSelectedMenus.filter(item => item.moduleName != moduleName);
        }else{
            const moduleItems = subModules[moduleName]; 
            const subModuleArray = moduleItems?.map(({ menuId, moduleName, moduleId }) => ({ menuId, moduleName, moduleId  }));
            updatedSelectedMenus = updatedSelectedMenus.concat(subModuleArray)

            // console.log(`Submodulesssssss: ${JSON.stringify(updatedSelectedMenus)}`)
        }
        // console.log(`updatedSelectedMenus: ${JSON.stringify(updatedSelectedMenus)}`)

        setFormData({ ...formData, data: updatedSelectedMenus });
    }
    
    

    const renderMenuItems = () => (
        <ul className="p-0 accordion text-white" style={{ listStyle: 'none' }}>
            {Object.entries(getRoleBaseMenuList).map(([parentModuleName, subModules], index) => (
                <li key={index} className="parent-route accordion-item border-none">
                    <div className="p-route-link-check  accordion-header" >
                        <div className="d-flex align-items-center gap-2">
                            <FontAwesomeIcon onClick={() => handleDropdownToggleCheck(index)} icon={isCollapseCheck === index ? faMinus : faPlus} />
                            <span className="ps-1 p-cl-white">{parentModuleName}</span>
                            {/* {console.log(`subModules:sasas ${JSON.stringify(subModules)}`)} */}
                            <input className="form-check-input p-route-icon p-cl-white p-abs" type="checkbox" 
                             onChange={(e) =>
                                onParentChange(
                                    e,
                                    Object.keys(subModules),
                                    subModules
                                )
                            }
                            checked={countUniqueModule(formData.data, Object.keys(subModules)[0]) > 0 } 
                             />
                        </div>
                    </div>
                    <div className={`accordion-collapse collapse ${isCollapseCheck === index ? 'show' : ''}`}>
                    <div>
                                {subModules && Object.entries(subModules).map(([subModuleName, menuItems], subIndex) => (
                                    <div key={subIndex}>
                                        <div className="p-route-link-submenu accordion-header" >
                                            <div className="d-flex align-items-center gap-2" >
                                                <FontAwesomeIcon onClick={() => toggleSubMenuCollapse(index)} icon={subMenuCollapseStates[index] ? faPlus : faMinus} />
                                                <span className="ps-1 p-cl-white" >{subModuleName}</span>
                                                <input className="form-check-input p-route-icon p-cl-white p-abs" type="checkbox"
                                                 onChange={(e) =>
                                                    onParentChange(
                                                        e,
                                                       subModuleName,
                                                        subModules
                                                    )
                                                }
                                                checked={countUniqueModule(formData.data, subModuleName) >0 } />

                                            </div>
                                        </div>
                                        <div className={`accordion-collapse collapse ${subMenuCollapseStates[index] ? 'show' : ''}`}>
                                            {renderSubMenuItems(menuItems)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                    </div>
                </li>
            ))}
        </ul>
    );

    if (!getRoleBaseMenuList || typeof getRoleBaseMenuList !== 'object') {
        return null; // or handle the absence of menuList gracefully
    }

    return (
        <div className="sidebar_fixed ">
            <div className="sidebar_logo_container col-6"></div>
            <div className="col-6 p-0 sidebar_routes_container">
                <div className="sidebarRoutes">{renderMenuItems()}</div>
            </div>
        </div>
    );
};

export default MenuListWithCheckbox;

