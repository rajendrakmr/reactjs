import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form} from "formik";
import * as Yup from "yup"; 
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  convertToNodes } from '../../../utils/helper';
import { useToast } from "../../../components/ToastMessage"
import { addRole, getRoles, clearRole,getAccessMenuByRole } from "../../../redux/reducer/security/transaction/roleReducer";
import BreadCrumb from '../../../components/layout/BreadCrumb';
import MandatoryField from '../../../components/MandatoryField';
import InputFieldComponent from '../../../components/formComponent/InputFieldComponent';
import SelectFieldComponent from '../../../components/formComponent/SelectFieldComponent';
import { submitPostData } from '../../../redux/reducer/commonApiSlice';

import SearchLoading from "../../../helperFuc/validationMessages/SearchLoading";
import DataLoading from '../../../components/DataLoading';


function CreateRoleForm() {
    const { isSubmit } = useSelector(state => state.commonApi);
    const { serMessage, roles, serResponse,  serError, isLoading } = useSelector((state) => state.role);
    const dispatch = useDispatch();
    const showToast = useToast();
    const [formData, setFormData] = useState({});
    const [checked, setChecked] = useState([]);
    const [selectedExapanded, setSelectedExpanded] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const [items, setItems] = useState([]);
    const [userRoles, setUserRoles] = useState([{ value: '', label: 'Select Role Description' }]);
    const [menus, setMenus] = useState('');
    const [roleError, setRoleError] = useState("");
    const [roleFormError, setRoleFormError] = useState(false);
    const [formError, setFormError] = useState(false);
    const [error, setError] = useState(null);
    const [roleLoading, setRoleLoading] = useState(false);

    useEffect(() => {
        if(roles?.success?.length > 0) {
            const newUpted = roles.success.map((item) => ({
                value: item?.id,
                label: `${item?.role}`,
                items: item
            }))
            setUserRoles((preUpt) => [...newUpted]);
        } else {
            setUserRoles([{ value: '', label: 'Role not available' }]);
        }

    }, [roles])

    useEffect(() => {
        dispatch(getRoles()); 
    }, []);


 




    const handleChangeRole = async (e, setValue, field, setFieldError, setFieldTouched) => {
        setRoleLoading(true)
        const { value } = e;
        if (!value) {
            setExpanded(false);
            setRoleError("Please select a role before expanding the menu.");
        } else {
            setFormData({ roleId: value })
            setExpanded(true);
            const response = await dispatch(getAccessMenuByRole({ roleId: `${value}` })); 
            if (getAccessMenuByRole.fulfilled.match(response) && Object.keys(response?.payload?.success).length > 0) {
                const { nodes, defult } = convertToNodes(response.payload.success);
                setItems(nodes)
                setChecked(defult) 
            }
        }

        setRoleLoading(false)
        setValue(field, value);
        setFieldError(field, '')
        setFieldTouched(field, false)

    };

    const validationSchema = Yup.object({
        roleDescription: Yup.string().matches(/^[a-zA-Z0-9]*$/, 'Only alphanumeric characters are allowed'),
    });

    const initialValues = {
        roleDescription: "",
        roleId: "",
    };

    //add role function call
    const handleFormSubmit = async (values, { setSubmitting, setErrors, resetForm, setValues }) => {
        await dispatch(clearRole());
        setFormError(false)
        if (!values.roleDescription) {
            setErrors({ roleDescription: 'Role Description cannot be empty.' });
            setSubmitting(false);
            return;
        }
        setRoleFormError(true)
        try {
            const action = await dispatch(addRole(values));
            if (addRole.fulfilled.match(action)) {
                setValues({ roleDescription: "" })
                await dispatch(getRoles());
            }
        } catch (error) {
            showToast('error', 'Server error!', 'An unexpected error occurred.');
        } finally {
            setTimeout(async () => {
                setRoleFormError(false)
                dispatch(clearRole());
            }, 5000);
        }
    };


    const handleCheck = (checked) => {
        setChecked(checked);
        setMenus(checked.join(', '));
        if (checked && checked.length > 0) {
            setError(null);
            setFormError(false)
        }
    };

 
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleSave = async (setFieldValue) => {
        if (!menus) {
            setFormError(true)
            setError('Select At Least One Menu.');
            setTimeout(async () => {
                setError('')
                setFormError(false)
            }, 3000);
            return;
        }

        try {
            const payload = {
                roleId: formData.roleId,
                menuList: menus
            };
            const action = await dispatch(submitPostData({ dataInfo: payload, indicatorsPath: '/role/save/menu/roleaccess' }));
            if (submitPostData.fulfilled.match(action)) {

                setSuccessMessage(action.payload.success)
                setExpanded(false)
                setFieldValue('roleId', null)

            } else {
                setErrorMessage(action.payload.error)

            }

 
        } catch (error) {
            setFormError(false) 
        } finally {
            setTimeout(async () => {
                setFormError(false)
                setSuccessMessage(null)
                setErrorMessage(null)
                dispatch(clearRole());
            }, 5000);
        }
    };
    return (
        <section>
            <div className="col-12 mt-5">
                <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current: 'Creation of Roles' }} />
                <div className="pb-4">
                    <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                        <h5>Creation of Roles</h5>
                    </div>
                    <MandatoryField />
                    <div className="_rkContentBorder row py-2">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({ values, touched, errors, setFieldValue, handleChange, setFieldError, setFieldTouched }) => (
                                <Form className="py-1 custom-width mx-auto">
                                    <div className="row">
                                        <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                            <InputFieldComponent label="Role Description" name="roleDescription" onChange={handleChange} touched={touched} errors={errors} isRequired={true} col="col-md-12" />

                                        </div>
                                        <div className="form-group col-md-6 d-flex mt-4 align-items-center">
                                            <label htmlFor="cousse" className="mr-1">
                                                <button type="btn" disabled={isSubmit} className="btn btn-sm custome-button-color1  text-white mx-1">
                                                    {(roleFormError && isLoading) ? 'Processing...' : <><FaPlus /> Add</>}
                                                </button>
                                            </label>
                                        </div>
                                    </div>
                                    {
                                        (roleFormError && serError) && (
                                            <div className={` ${serResponse ? 'text-success' : 'text-danger'}`}>{serMessage}</div>
                                        )
                                    }
                                    <div className="row">

                                        <SelectFieldComponent
                                            options={userRoles}
                                            id="roleId"
                                            label="Role Description"
                                            name="roleId"
                                            value={values.roleId}
                                            error={errors.roleId}
                                            touched={touched.roleId}
                                            onChange={(selectedOption) => handleChangeRole(selectedOption, setFieldValue, 'roleId', setFieldError, setFieldTouched)}
                                            required={true}
                                            col="col-md-6"
                                            isDisabled={isSubmit}
                                        />
                                    </div>
                                    {(formError || (serError && serResponse)) && <div className={`alert ${serResponse ? 'alert-success' : 'alert-danger'} mt-3`}>{serMessage}{error}</div>}

                                    {roleLoading ? <DataLoading /> : ""}
                                    { items.length>0 && expanded  &&
                                        (<>
                                            <hr className="custome-border" />
                                            <div className="d-flex   align-items-center">
                                                <h6 className="text-danger">Menus</h6>
                                            </div>
                                            <div className="mt-3 p-3 parent-route text-white text-large">

                                                <CheckboxTree
                                                    icons={{
                                                        check: <FontAwesomeIcon style={{ backgroundColor: 'blue', fontWeight: 'bold' }} className="rct-icon rct-icon-check" icon="check-square" />,
                                                        uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
                                                        halfCheck: <FontAwesomeIcon style={{ backgroundColor: 'red' }} className="rct-icon rct-icon-half-check" icon="check-square" />,
                                                        expandClose: '[+]',
                                                        expandOpen: '[-]',
                                                        expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
                                                        collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
                                                        parentClose: '',
                                                        parentOpen: '',
                                                        leaf: ''
                                                    }}
                                                    nodes={items}
                                                    checked={checked}
                                                    expanded={selectedExapanded}
                                                    onCheck={handleCheck}
                                                    onExpand={(selectedExapanded) => setSelectedExpanded(selectedExapanded)}
                                                />
                                            </div>
                                        </>
                                        )
                                    }

                                    {expanded && items.length>0 && <div className="row px-1 py-4 custom-width mx-auto p-2">
                                        <div className="form-group col-md-12 mt-3 d-flex justify-content-end">
                                            <button
                                                type="button"
                                                className="btn btn-sm custome-button-color1 text-white mx-2"
                                                onClick={() => handleSave(setFieldValue)}
                                                disabled={isSubmit}
                                            >
                                                <FaPlus /> Save
                                            </button>
                                        </div>

                                    </div>}

                                </Form>
                            )}
                        </Formik>

                        {isSubmit && (<SearchLoading />)}

                        {successMessage && <div className={`alert alert-success mt-3`}>{successMessage}</div>}
                        {errorMessage && <div className={`alert alert-danger mt-3`}>{errorMessage}</div>}

                    </div>
                </div>

            </div>
        </section>);
}

export default CreateRoleForm;
