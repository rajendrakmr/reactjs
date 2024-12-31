import React, { useCallback, useEffect, useState } from "react";
import { FaPlus, FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import debounce from 'lodash/debounce';
import SelectFieldComponent from "../../../../components/formComponent/SelectFieldComponent";
import InputFieldComponent from "../../../../components/formComponent/InputFieldComponent";
import { fetchGetPreData, fetchPostPreData, submitPostData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import MandatoryField from "../../../../components/MandatoryField";
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import { getMenuRole, getRoles } from "../../../../redux/reducer/security/transaction/roleReducer";
import { assignedMenu, collectCheckedMenus, convertToNodes, selectedItemMenu } from "../../../../utils/helper";
import EmployeeTypeModal from "./EmployeeTypeModal";
import DataLoading from "../../../../components/DataLoading";
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRoleBaseMenu } from "../../../../redux/reducer/security/transaction/userReducer";

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
    const [modalVisible, setModalVisible] = useState(false);  // Control modal visibility
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [excludedMenus, setExcludedMenus] = useState([]);
    const [includedMenus, setIncludedMenus] = useState([]);




    useEffect(() => {
        const { nodes } = convertToNodes(rb_menu_list);
        setItems(nodes)
        const { preChecked } = selectedItemMenu(rb_menu_list)
        setIncludedMenus(preChecked) 
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
            setUserRoles((preUpt) => [...newUpted]);
        } else {
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
            userType: selectedUser?.loginName ? false : true,
            roleId,
            ...(selectedUser?.loginName && { password: password }),
            ...(selectedUser?.loginName && { confirmPassword: confirmPassword }),
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
            } else {
                await setFieldTouched('loginName', true);
                await setFieldError('loginName', action.payload.error);

            }

        } catch (error) {
        } finally {
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    };








    const [isSearching, setIsSearching] = useState(false);
    const onSearchID = async (values, setFieldError, setFieldTouched, setFieldValue) => {
        setFieldValue('exitingLoginName', null)
        setIsSearching(true)
        const action = await dispatch(fetchGetPreData({ dataInfo: {}, indicatorsPath: `/user/allEmployee/${values.ngs}` }));
        if (fetchGetPreData.fulfilled.match(action)) {
            if (action.payload.success.length > 0) {
                setModalVisible(true);
                setEmpList(action.payload.success)
            } else {
                setEmpList([])
                await setFieldTouched('ngs', true);
                await setFieldError('ngs', 'Invalid Employee ID');
            }

        } else {
            await setFieldTouched('ngs', true);
            await setFieldError('ngs', 'Invalid Employee ID');
            
        }
        setIsSearching(false);

    };

    const get_selected_user_menu = useCallback(async (data) => {
        const action = await dispatch(fetchGetPreData({ dataInfo: {}, indicatorsPath: `/role/modified/user/menu/${data.loginId}/${data.roleId}` }));
        if (fetchGetPreData.fulfilled.match(action)) {
            if (action.payload?.success && action.payload?.success.length > 0) {
                const { preChecked } = selectedItemMenu(action.payload.success)
                setChecked(preChecked)
                setMenus(preChecked);
                setIncludedMenus(preChecked)
            }
        } else {

        }
    }, [])






    const handleConfirm = async (user, setFieldValue) => {
        setLoading(true);
        if (user?.roleId) {
            setFieldValue('exitingLoginName', user?.loginName)
            setFieldValue('roleId', user?.roleId)
            setFieldValue('userId', user?.loginId)
            const action = await dispatch(fetchPostPreData({ dataInfo: { roleId: user?.roleId }, indicatorsPath: `/menu/rolebasedmenu` }));
            if (fetchPostPreData.fulfilled.match(action)) {
                get_selected_user_menu(user)
                const { nodes } = convertToNodes(action.payload);
                setItems(nodes)
                setExpanded(true)
            } else {

            }
            setUserType(true)
        }

        setTimeout(() => {
            setLoading(false);
            setSelectedUser(user);
            setModalVisible(false);
            setFieldValue('exitingLoginName', user?.loginName)
        }, 1000);
    };

    const handleClose = () => {
        setModalVisible(false);
    };







    const handleCheck = useCallback((checked) => {
        setChecked(checked);
        setMenus(checked.join(', '));
    }, []);



    //on role select


    const validationSchema = Yup.object({
        ngs: Yup.string().required("Employee ID is required."),
    });

    const initialValues = {
        ngs: "",
        exitingLoginName: "",
        roleId: "",
        userId: "",

    };


    const onFormSubmit = useCallback(async (e, values, resetForm) => {
        e.preventDefault()
        const totalMenuItem = includedMenus.map(String); 
        const totalCheckItem = checked.map(String); 
        const remaingCheckedItem = totalMenuItem.filter(item => !totalCheckItem.includes(item));
  
     
        const payload = {
            includeMenuId: totalCheckItem,
            excludeMenuId: remaingCheckedItem
        };
        

        try {
            const action = await dispatch(submitPutData({ dataInfo: payload, indicatorsPath: `/user/modify/${values.userId}/${values.roleId}` }));

            if (submitPutData.fulfilled.match(action)) {
                setSuccessMessage(action.payload.success)
                setExpanded(false)
                setUserType(false)
                setSelectedUser(null)
                resetForm()
            } else {

            }

        } catch (error) {
        } finally {
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }


    }, [includedMenus, checked])
    return (
        <section>
            <div className="col-12 mt-5">
                <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current: 'Modify User Access Privileges' }} />
                <div className="pb-4">
                    <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                        <h6>Modify User Access Privileges</h6>
                    </div>
                    <MandatoryField />
                    <div className="_rkContentBorder row py-2">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                        >
                            {({ values, touched, errors, setFieldValue, handleChange, setFieldTouched, setFieldError, resetForm }) => (
                                <Form className="px-3   mx-auto ">
                                    <div className="row">
                                        <div className="form-group col-md-6  d-flex mt-3 align-items-center">
                                            <InputFieldComponent label="Employee ID" place="Search By Employee ID" name="ngs" onChange={handleChange} touched={touched} errors={errors} isRequired={true} col="col-md-12" type="number" max="10" />
                                        </div>
                                        <div className="form-group col-md-6   d-flex mt-4 align-items-center">
                                            <label htmlFor="cousse" className="mr-1">
                                                <button type="btn" disabled={isSubmit} onClick={() => onSearchID(values, setFieldError, setFieldTouched, setFieldValue)} className="btn btn-sm custome-button-color1  text-white mx-1" >
                                                    {isSearching ? 'Searching...' : <><FaSyncAlt /> Search</>}
                                                </button>
                                            </label>
                                        </div>

                                        {
                                            values.exitingLoginName && selectedUser && (

                                                <InputFieldComponent label="Login Name" type="text" name="exitingLoginName" onChange={handleChange} touched={touched} errors={errors} isDisabled={true} col="col-md-6" />


                                            )
                                        }
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
                                        { items.length>0 &&  values.exitingLoginName && expanded && values.ngs &&
                                            (<>
                                                <hr className="custome-border" />
                                                <div className="d-flex   align-items-center">
                                                    <h6 className="text-danger">Menus</h6>

                                                </div> 

                                                {items.length > 0 && (
                                                    <div className="mt-3 p-3 parent-route text-white text-large">
                                                        {roleLoading ? <DataLoading /> : ""}

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

                                        {items.length>0 && values.exitingLoginName && expanded && values.ngs &&
                                            <div className="d-flex justify-content-end gap-3 mt-3 flex-wrap">
                                                <button disabled={isSubmit} type="reset" className="btn btn-sm custome-button-danger text-white  ">
                                                    <FaSyncAlt /> Reset
                                                </button>
                                                <button type="submit" disabled={isSubmit} onClick={(e) => onFormSubmit(e, values, resetForm)} className="btn btn-sm custome-button-color1 text-white">
                                                    <FaPlus className={isSubmit ? "spn" : ""} /> Update
                                                </button>
                                            </div>
                                        }
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
