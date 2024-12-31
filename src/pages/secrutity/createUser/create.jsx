import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import Footer from "../../../components/footer/Footer";

import { FaPlus, FaSyncAlt, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllUserRoleLists,
    saveCreateUserAction,
    clearSuccessMessageSave,
    clearErrorMessageSave
} from "../../../redux/slice/cca-grade/ccaGradeSlice";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormInputField from "../../../components/FormInputField";
import FormSelectField from "../../../components/FormSelectField";
import { addRole, getRoles, clearRole, getMenuRole } from "../../../redux/reducer/security/roleReducer";
import Tree from "./Tree";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
const roleMenus1 = {
    "Security": {
        "Security-Transaction": [
            {
                "roleId": "1",
                "menuId": "501",
                "parentModuleName": "Security",
                "parentModuleId": "1",
                "moduleId": "5",
                "moduleName": "Transaction",
                "menuName": "Creation of User",
                "menuLinkName": "/user/creation",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "502",
                "parentModuleName": "Security",
                "parentModuleId": "1",
                "moduleId": "5",
                "moduleName": "Transaction",
                "menuName": "Portal Admin",
                "menuLinkName": "/user/portal-admin",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "503",
                "parentModuleName": "Security",
                "parentModuleId": "1",
                "moduleId": "5",
                "moduleName": "Transaction",
                "menuName": "Change Login Password",
                "menuLinkName": "/user/change-password",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "504",
                "parentModuleName": "Security",
                "parentModuleId": "1",
                "moduleId": "5",
                "moduleName": "Transaction",
                "menuName": "Reset Login Password",
                "menuLinkName": "/user/reset-password",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "505",
                "parentModuleName": "Security",
                "parentModuleId": "1",
                "moduleId": "5",
                "moduleName": "Transaction",
                "menuName": "Creation of Roles",
                "menuLinkName": "/user/role-creation",
                "roleDescription": null
            }
        ]
    },
    "Store": {
        "Store-Master": [
            {
                "roleId": "1",
                "menuId": "1010",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "Depo Master",
                "menuLinkName": "/store/depo-master",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1020",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "Transaction Code Master",
                "menuLinkName": "/store/transection-code-master",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1030",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "Unit Code Master",
                "menuLinkName": "/store/unit-code-master",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1040",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "Depowise Job Master",
                "menuLinkName": "/store/depo-wise-job-master",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1050",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "Depowise Item Master",
                "menuLinkName": "/store/depo-wise-item-master",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1060",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "Indent Instruction",
                "menuLinkName": "/store/indent/instruction",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1070",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "Indent Approval Authority",
                "menuLinkName": "/store/indent/approval-authority",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1080",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "ABC and FSN Analysis",
                "menuLinkName": "/store/abc-fsn-analysis",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1081",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "10",
                "moduleName": "Master",
                "menuName": "Item Alias",
                "menuLinkName": "/store/item-alias",
                "roleDescription": null
            }
        ],
        "Store-Transaction": [
            {
                "roleId": "1",
                "menuId": "1110",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "11",
                "moduleName": "Transaction",
                "menuName": "Item Inspection",
                "menuLinkName": "/store/item/inspection",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1120",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "11",
                "moduleName": "Transaction",
                "menuName": "Challan Entry",
                "menuLinkName": "/store/challan-entry",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1125",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "11",
                "moduleName": "Transaction",
                "menuName": "Stock Adjustment Entry",
                "menuLinkName": "/store/stock-adjustment",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1130",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "11",
                "moduleName": "Transaction",
                "menuName": "SIS Requisition",
                "menuLinkName": "/store/sis-requisition",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1135",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "11",
                "moduleName": "Transaction",
                "menuName": "SIS Issue",
                "menuLinkName": "/store/sis-issue",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1140",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "11",
                "moduleName": "Transaction",
                "menuName": "STN Indent",
                "menuLinkName": "/store/stn-indent",
                "roleDescription": null
            },
            {
                "roleId": "1",
                "menuId": "1145",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "11",
                "moduleName": "Transaction",
                "menuName": "STN Supply",
                "menuLinkName": "/store/stn-supply",
                "roleDescription": null
            }
        ],
        "Store-Report": [
            {
                "roleId": "1",
                "menuId": "1210",
                "parentModuleName": "Store",
                "parentModuleId": "2",
                "moduleId": "12",
                "moduleName": "Report",
                "menuName": "Store Ledger",
                "menuLinkName": null,
                "roleDescription": null
            }
        ]
    }
};

const Label = ({children}) => <span style={{fontSize: 12}}>{children}</span>;



function convertToNodes(data) {
    const nodes = [];

    for (const key in data) {
        if (Array.isArray(data[key])) {
            // If the value is an array, process each item as a child node
            const children = data[key].map(item => ({
                value: item.menuId.toString(),
                label: item.menuName
            }));
            nodes.push({
                value: key.toLowerCase(),
                label: {key},
                children: children
            });
        } else if (typeof data[key] === 'object' && data[key] !== null) {
            // If the value is an object, recursively process it
            nodes.push({
                value: key.toLowerCase(),
                label:  {key},
                children: convertToNodes(data[key])
            });
        }
    }

    return nodes;
}

// Example usage with your provided JSON data:
const jsonData = {
    "Security": {
        "Transaction": [
            {
                "moduleId": 5,
                "moduleName": "Transaction",
                "menuId": 501,
                "menuName": "Creation of User",
                "menuLinkName": "/user/creation",
                "menuReportHeading": "Creation of User",
                "reportPdf": "N",
                "reportXls": "N",
                "reportTxt": "N",
                "isAccess": "Y",
                "parentModuleId": 1,
                "parentModuleName": "Security"
            },
            {
                "moduleId": 5,
                "moduleName": "Transaction",
                "menuId": 502,
                "menuName": "Portal Admin",
                "menuLinkName": "/user/portal-admin",
                "menuReportHeading": "Portal Admin",
                "reportPdf": "N",
                "reportXls": "N",
                "reportTxt": "N",
                "isAccess": "Y",
                "parentModuleId": 1,
                "parentModuleName": "Security"
            },
            // More items...
        ]
    },
    "Store": {
        "Master": [
            {
                "moduleId": 10,
                "moduleName": "Master",
                "menuId": 1010,
                "menuName": "Depo Master",
                "menuLinkName": "/store/depo-master",
                "menuReportHeading": "Depo Master",
                "reportPdf": "N",
                "reportXls": "N",
                "reportTxt": "N",
                "isAccess": "Y",
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            // More items...
        ],
        "Transactions": [
            {
                "moduleId": 11,
                "moduleName": "Transaction",
                "menuId": 1105,
                "menuName": "Indent Entry",
                "menuLinkName": null,
                "menuReportHeading": "Indent Entry",
                "reportPdf": "N",
                "reportXls": "N",
                "reportTxt": "N",
                "isAccess": "Y",
                "parentModuleId": 2,
                "parentModuleName": "Store"
            },
            // More items...
        ]
    }
};

// Convert JSON data to nodes



const CreateUserForm = () => {
    const dispatch = useDispatch();
    const { seterrors, message, roles,success ,roleMenus} = useSelector((state) => state.role);
    // const nodes = convertToNodes(roleMenus);
    const [nodes, setNodes] = useState([]); 
const [checked, setChecked] = useState([]); 
    const [expanded, setExpanded] = useState(false);
    const [roleError, setRoleError] = useState("");
    const [selectFormData, setFormData] = useState({
        selectedData: []
    })
    const toggleExpanded = async(roleId) => { 
       
 
        if (!roleId) {
            setExpanded(false);
            setRoleError("Please select a role before expanding the menu.");
        } else {
            await dispatch(getMenuRole({roleId}));
            const node = convertToNodes(jsonData);
           
            setNodes(node)
            setRoleError(""); 
            setExpanded(true);
            
        }
    };

    const [shouldFetchRoles, setShouldFetchRoles] = useState(false);
    useEffect(() => { 
        dispatch(getRoles());  
    }, [success, dispatch]);


    

   
    
    const validationSchema = Yup.object({
        roleDescription: Yup.string(),
    });

    const initialValues = {
        roleDescription: "",
    };

    const handleFormSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
        await dispatch(clearRole());
        if (!values.roleDescription) {
            setErrors({ roleDescription: 'Role Description cannot be empty.' });
            setSubmitting(false);  
            return;
        }
    
        try { 
            await dispatch(addRole(values)); 
        } catch (error) { 
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || { general: 'An error occurred.' });
            } else {
                console.error("Error submitting form:", error);
                setErrors({ general: 'An unexpected error occurred.' });
            }
        } finally {  
            await dispatch(getRoles()); 
            setSubmitting(false);
        }
    };
    
    return (
        <div className="container-fluid p-0 d-flex flex-row m-0">
            <div className="row m-0 sidebar_container">
                <Sidebar />
            </div>
            <div className="row w-100 m-0 p-0">
                <Header />
                <div className="col-12 children_container m-0 p-4 mt-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                            <li className="breadcrumb-item">Security</li>
                            <li className="breadcrumb-item active" aria-current="page">Create User</li>
                        </ol>
                    </nav>

                    <div className="custome-border pb-4">
                        <h4 className="text-center mt-3 text-danger">Grant User Access Privileges</h4>
                        <hr className="custome-border my-3" />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({ values, touched, errors, setFieldValue, handleChange, handleBlur }) => (
                                <Form className="px-3 py-4 custom-width mx-auto p-2">
                                    <h4 className="text-center mb-3 primary-light-bg text-white">
                                        User Access Details
                                    </h4>
                                    {(seterrors) &&
                                        (
                                            <div className="form-group col-md-12 d-flex align-items-center text-danger alert ">
                                                {seterrors}
                                            </div>
                                        )
                                    }
                                    <div className="row">
                                        <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                            <div className="col-sm-3 col-4">
                                                <label htmlFor="roleDescription" className="mr-3 pe-7">
                                                    Role Description:
                                                </label>
                                            </div>
                                            <div className="col-sm-9 col-8">
                                                <input
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    type="text"
                                                    className="form-control custome-border"
                                                    id="roleDescription"
                                                    placeholder="Name"
                                                    name="roleDescription"
                                                />
                                            </div>
                                        </div> 
                                        <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                            <label htmlFor="cousse" className="mr-3">
                                                <button type="submit" className="btn btn-sm custome-button-color1  text-white mx-2">
                                                    <FaPlus /> Add
                                                </button>
                                            </label>
                                        </div>
                                    </div>
                                    <ErrorMessage name="roleDescription">
                                        {msg => touched.roleDescription && errors.roleDescription && (
                                            <div className="text-danger">{errors.roleDescription}</div>
                                        )}
                                    </ErrorMessage>
                                    <div className="row">
                                        <FormSelectField
                                            id="roleId"
                                            label="Role Description:"
                                            name="roleId"
                                            options={roles.success || []}
                                            value={values.roleId}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setFieldValue("selectedData", []);  // Reset selectedData when role changes
                                                toggleExpanded(e.target.value);  // Toggle menu based on role selection
                                            }}
                                            error={roleError}
                                        />
                                    </div>

                                    {expanded &&
                                        <div className="mt-3 p-3 parent-route text-white text-large">

                                            {/* <Tree
                                                selectedData={selectFormData.selectedData}
                                                setFormData={setFormData}
                                                options={roleMenus}
                                                onSelectionChange={(newSelection) => {
                                                    setFieldValue('selectedData', newSelection);
                                                }}
                                            /> */}
                                            <CheckboxTree
                                                nodes={nodes}
                                                checked={checked}
                                                expanded={expanded}
                                                // onCheck={(checked) => setChecked(checked)}
                                                // onExpand={(expanded) => setExpanded(expanded)}
                                                />
                                        </div>
                                    }

                                </Form>
                            )}
                        </Formik>

                        










                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default CreateUserForm;
