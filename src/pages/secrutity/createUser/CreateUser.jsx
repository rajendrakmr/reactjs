import React, { useCallback, useEffect, useState } from "react";
import { FaPlus, FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import SearchLoading from "../../../helperFuc/validationMessages/SearchLoading";
import debounce from 'lodash/debounce';
import SelectFieldComponent from "../../../components/formComponent/SelectFieldComponent";
import InputFieldComponent from "../../../components/formComponent/InputFieldComponent";
import { fetchGetPreData, submitPostData } from "../../../redux/reducer/commonApiSlice";
import MandatoryField from "../../../components/MandatoryField";
import BreadCrumb from "../../../components/layout/BreadCrumb";
import { getMenuRole, getRoles } from "../../../redux/reducer/security/transaction/roleReducer";
import { assignedMenu, collectCheckedMenus, convertToNodes } from "../../../utils/helper";
import EmployeeTypeModal from "./EmployeeTypeModal";
import DataLoading from "../../../components/DataLoading";
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRoleBaseMenu } from "../../../redux/reducer/security/transaction/userReducer";

const CreateUser = () => {
    const dispatch = useDispatch();
    const { isSubmit } = useSelector(state => state.commonApi);


    const [items, setItems] = useState([]);
    const [menus, setMenus] = useState('');
    const [userType, setUserType] = useState(false);
    const [isValidEmpID, setIsValidEmpID] = useState(false);
    const [userRoles, setUserRoles] = useState([{ value: '', label: 'Select Role Description' }]);
    const [expanded, setExpanded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [checked, setChecked] = useState([]);
    const [selectedExapanded, setSelectedExpanded] = useState([]);
    const { rb_menu_list } = useSelector((state) => state.user);
    const { roles, role_menu_list } = useSelector((state) => state.role);
    const [empList, setEmpList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);  
    const [selectedUser, setSelectedUser] = useState(null); 


    useEffect(() => {
        dispatch(getRoles());
    }, []);

    useEffect(() => {
        const { nodes } = convertToNodes(rb_menu_list);
        setItems(nodes)
    }, [rb_menu_list]);


    useEffect(() => {
        const data = assignedMenu(rb_menu_list);
        setMenus(data.default);
        setChecked(data.default)
    }, [rb_menu_list]);

    useEffect(() => {
        if (roles?.success?.length > 0) {
            const newUpted = roles.success.map((item) => ({
                value: item?.id,
                label: `${item?.role}`,
                items: item
            }))
            setUserRoles((preUpt) => [ ...newUpted]);
        }else{
            setUserRoles([{ value: '', label: 'Role not available' }]);
        }

    }, [roles])

    const [roleLoading, setRoleLoading] = useState(false);



    const handleFormSubmit = async (values, { resetForm, setFieldError, setFieldTouched, setFieldValue }) => {
        const checkedNodes = collectCheckedMenus(role_menu_list, menus);
        if (!checkedNodes.length > 0) {
            setErrorMessage('Select At Least One Menu')
            return;
        }
        if (!isValidEmpID) {
            setFieldError('ngs', 'Please enter valid Employee ID')
            return
        }



        const { loginName, ngs, password, roleId, confirmPassword } = values;
        if (menus && !menus.length > 0) {
            setErrorMessage('Select At Least One Menu')
            return;
        }


        const payload = {
            ngs: ngs,
            loginName, 
            userType: selectedUser?.loginName?false:true,
            roleId,
            ...(!selectedUser?.loginName && { password: password }),
            ...(!selectedUser?.loginName && { confirmPassword: confirmPassword }),
            ...(selectedUser?.loginName && { exitingLoginName: selectedUser?.loginName }),
            data: checkedNodes
        };

        try { 
            const action = await dispatch(submitPostData({ dataInfo: payload, indicatorsPath: '/user/save' }));
            
            if (submitPostData.fulfilled.match(action)) {
               
                    setSuccessMessage(action.payload.success)
                    setExpanded(false)
                    setIsValidEmpID(false)
                    setUserType(false)
                    setFieldValue('roleId', '')
                    setSelectedUser(null)
                    resetForm() 
            }else{
                await setFieldTouched('loginName', true);
                await setFieldError('loginName', `${loginName} is already exist`);

            }

        } catch (error) {
        } finally {
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    };









    const debouncedCheckEmployee = useCallback(
        debounce(async (value, setFieldError, setFieldTouched) => {
            const action = await dispatch(fetchGetPreData({ dataInfo: {}, indicatorsPath: `/user/get/login-list/${value}` }));
            if (fetchGetPreData.fulfilled.match(action)) {
                if (action.payload.success.length > 0) {
                    setModalVisible(true);
                    setEmpList(action.payload.success)
                    setUserType(false)
                    setIsValidEmpID(true)
                } else {
                    setIsValidEmpID(false)
                    setEmpList([])
                    await setFieldTouched('ngs', true);
                    await setFieldError('ngs', 'Invalid Employee ID');
                }

            } else {
                await setFieldTouched('ngs', true);
                await setFieldError('ngs', 'Invalid Employee ID');
                setIsValidEmpID(false)
            }

        }, 300),
        []
    );



    const checkEmployee = async (e, setFieldError, setFieldTouched, setFieldValue) => {
        e.preventDefault();
        const { value } = e.target
        await debouncedCheckEmployee(value, setFieldError, setFieldTouched);
        setFieldValue('ngs', value)
    };






    const handleConfirm = (user, setFieldValue) => {
        setLoading(true);

        setTimeout(() => {
            if (user?.loginName) {
                setUserType(true)
            }
            setLoading(false);
            setSelectedUser(user);
            setModalVisible(false);
            setFieldValue('exitingLoginName', user?.loginName)
            setFieldValue('applicationName', user?.application)
        }, 1000);
    };

    const handleClose = () => {
        setModalVisible(false);
    };


    const resetBtn = useCallback(() => {
        setSelectedUser(null); 
    },[selectedUser]);





    const handleCheck = (checked) => {
        setChecked(checked);
        setMenus(checked.join(', '));
    };



    //on role select

    const handleChangeRole = async (e, setValue, field, setFieldError, setFieldTouched) => {
        const { value } = e;
        setRoleLoading(true)
        setValue(field, value);
        setFieldError(field, '')
        setFieldTouched(field, false)
        if (!value) {
            setExpanded(false);
        } else {
            setExpanded(true);
            await dispatch(getMenuRole({ roleId: `${value}` }));
            await dispatch(getRoleBaseMenu({ roleId: value }));
            setRoleLoading(false)
        }
    };

    const validationSchema = Yup.object({
        ngs: Yup.string().required("Employee ID is required."),
        loginName: Yup.string().required("Login name is required."),
        roleId: Yup.string().required("role is required."),
        password: userType
            ? Yup.string()
            : Yup.string().required("Password is required.").min(6, "Password must be at least 6 characters."),
        confirmPassword: userType
            ? Yup.string()
            : Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required."),
    });

    const initialValues = {
        ngs: "",
        loginName: "",
        roleId: "",
        password: "",
        confirmPassword: "",

    };



    return (
        <section>
            <div className="col-12 mt-5">
                <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current: 'Creation of User' }} />
                <div className="pb-4">
                    <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                        <h6>Creation of User</h6>
                    </div>
                    <MandatoryField />
                    <div className="_rkContentBorder row py-2">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({ values, touched, errors, setFieldValue, handleChange, setTouched, setFieldTouched, setFieldError }) => (
                                <Form className="px-3   mx-auto ">
                                    <div className="row">
                                        <InputFieldComponent label="Employee ID" name="ngs" onChange={(event) => checkEmployee(event, setFieldError, setFieldTouched, setFieldValue)} touched={touched} errors={errors} type="number" max="7" col="col-md-4" isRequired={true} />
                                        <InputFieldComponent label="Login Name" type="text" name="loginName" onChange={handleChange} touched={touched} errors={errors} col="col-md-4" isRequired={true} />
                                        {
                                             !selectedUser && (
                                                <>
                                                    <InputFieldComponent label="Password" type="password" name="password" onChange={handleChange} touched={touched} errors={errors} isRequired={true} col="col-md-4" />
                                                    <InputFieldComponent label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} touched={touched} isRequired={true} errors={errors} col="col-md-4" />

                                                </>
                                            )
                                        }
                                        {
                                            selectedUser && values.ngs && (
                                                <>
                                                    <InputFieldComponent label="App. Name" type="text" name="applicationName" onChange={handleChange} touched={touched} errors={errors} isDisabled={true} col="col-md-4" />
                                                    <InputFieldComponent label="Existing Name" type="text" name="exitingLoginName" onChange={handleChange} touched={touched} errors={errors} isDisabled={true} col="col-md-4" />

                                                </>
                                            )
                                        }

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
                                            col="col-md-4"
                                        />
                                    </div>

                                    {successMessage && (<div className="row custom-width mx-auto"  >
                                        <div className="form-group col-md-12 mt-3 d-flex justify-content-end text-success">
                                            {successMessage}
                                        </div>
                                    </div>)}



                                    {errorMessage && (<div className="row custom-width mx-auto"  >
                                        <div className="form-group col-md-12 mt-3 d-flex justify-content-end text-danger">
                                            {errorMessage}
                                        </div>
                                    </div>)}



                                    <div className="row mx-auto mw-100 mt-3">
                                        {expanded && values.roleId &&
                                            (<>
                                                <hr className="custome-border" />
                                                <div className="d-flex   align-items-center">
                                                    <h6 className="text-danger">Menus</h6>
                                                   
                                                </div>
                                                {roleLoading ? <DataLoading /> : ""}
                                                {
                                                    !items.length > 0 && (<div className="form-group col-md-12 mt-3 d-flex justify-content-start text-danger">
                                                        Permission have not assigned.
                                                    </div>)
                                                }
                                                
                                                {items.length > 0 && (
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
                                                    </div>)}
                                            </>
                                            )
                                        }


                                        <div className="d-flex justify-content-end gap-3 mt-3 flex-wrap">
                                            <button disabled={isSubmit} onClick={resetBtn} type="reset" className="btn btn-sm custome-button-danger text-white  ">
                                                <FaSyncAlt /> Reset
                                            </button>
                                            <button type="submit" disabled={isSubmit} className="btn btn-sm custome-button-color1 text-white">
                                                <FaPlus className={isSubmit ? "spn" : ""} /> Save
                                            </button>
                                        </div>
                                    </div>
                                    {isSubmit && (<SearchLoading />)}
                                    <EmployeeTypeModal
                                        show={modalVisible}
                                        handleClose={handleClose}
                                        handleConfirm={handleConfirm} 
                                        errorMessage={errorMessage}
                                        loading={loading}
                                        users={empList}
                                        setFieldValue={setFieldValue}
                                    />
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateUser;
