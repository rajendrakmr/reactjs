import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import BreadCrumb from "../../../components/layout/BreadCrumb";
import { Formik, Form, ErrorMessage } from "formik";
import { getMenuRole, getRoles } from "../../../redux/reducer/security/transaction/roleReducer";
import { fetchGetPreData, submitPostData } from "../../../redux/reducer/commonApiSlice";
import { getRoleBaseMenu } from "../../../redux/reducer/security/transaction/userReducer";
import { assignedMenu, collectCheckedMenus, convertToNodes } from "../../../utils/helper";
import InputFieldComponent from "../../../components/InputFieldComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataLoading from "../../../components/DataLoading";
import Select from "react-select";
import debounce from 'lodash/debounce';
import CheckboxTree from 'react-checkbox-tree';
import Loader from "../../../components/Loader";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const { dataLoading, isSubmit } = useSelector((state) => state.commonApi);

  const { roles, role_menu_list } = useSelector((state) => state.role);

  const initialValues = {
    loginName: "",
    ngs: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    selectedData: []
  };

  const [loginName, setLoginName] = useState(null)

  const handleChangeSelect = async (e, setValue, field, selectedOption) => {
    const { value, label,  items } = e;
    // setLoginName(`${value} (${label})`)
    setLoginName(`${value}`)
    setValue(field, value);
    setValue('exitingLoginName', items?.loginName);
    setSelectedUser(selectedOption);
    debugger;
    if (value) {
      setUserType(true)

    } else {
      setUserType(false)
    }
    setOpen(false)

  };

  const [items, setItems] = useState([]);
  const [menus, setMenus] = useState('');
  const [userType, setUserType] = useState(false);
  const [isValidEmpID, setIsValidEmpID] = useState(false);
  const [userOptions, setUserOptions] = useState([{ value: '', label: 'Select ID' }])
  const [selectedUser, setSelectedUser] = useState(null);;
  const [userRoles, setUserRoles] = useState([{ value: '', label: 'Select Role Description' }]);
  const [expanded, setExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [checked, setChecked] = useState([]);
  const [selectedExapanded, setSelectedExpanded] = useState([]);
  const { rb_menu_list } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);



  const debouncedCheckEmployee = useCallback(
    debounce(async (value, setFieldError, setFieldTouched) => {
      const action = await dispatch(fetchGetPreData({ dataInfo: {}, indicatorsPath: `/user/get/login-list/${value}` }));
      if (fetchGetPreData.fulfilled.match(action)) {
        if (action.payload.success.length > 0) {
          const newUpted = action.payload.success.map((item) => ({
            value: item?.loginName,
            label: `${item?.loginName} (${item?.ngs})`,
            items: item
          }))
          setUserOptions((preUpt) => [...preUpt, ...newUpted]);
          setIsValidEmpID(true)
          setOpen(true)
          await setFieldError('ngs', '');
        } else {
          setUserOptions([{ value: '', label: 'Select ID' }])
          await setFieldTouched('ngs', true);
          setIsValidEmpID(false)
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




  const handleFormSubmit = async (values, { resetForm, setFieldError, setFieldTouched, setFieldValue }) => {

    if (!isValidEmpID) {
      setFieldError('ngs', 'Please enter valid Employee ID')
      return
    }


    const { loginName, ngs, password, roleId } = values;
    if (menus && !menus.length > 0) {
      setErrorMessage('Select At Least One Menu')
      return;
    }
    const checkedNodes = collectCheckedMenus(role_menu_list, menus);
    if (!checkedNodes.length > 0) {
      setErrorMessage('Select At Least One Menu')
      return;
    }

    const payload = {
      ngs: ngs,
      loginName,
      password,
      roleId,
      data: checkedNodes,
      userType
    };

    try {
      const action = await dispatch(submitPostData({ dataInfo: payload, indicatorsPath: '/user/save' })); 
      if (submitPostData.fulfilled.match(action)) {
        if (action.payload.error) {
          await setFieldTouched('loginName', true);
          await setFieldError('loginName', action.payload.error);
        } else {
          setSuccessMessage(action.payload.success)
          setExpanded(false)
          setIsValidEmpID(false)
          setUserType(false)
          setFieldValue('roleId', '')
          resetForm()
        }
      }

    } catch (error) {
    } finally {
      setTimeout(() => {
      }, 5000);
    }
  };


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



  useEffect(() => {
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    const { nodes } = convertToNodes(role_menu_list);
    setItems(nodes)
  }, [role_menu_list]);


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
      setUserRoles((preUpt) => [...preUpt, ...newUpted]);
    }

  }, [roles])


  const validationSchema = Yup.object({
    // loginName: Yup.string().matches(/^[a-zA-Z0-9]*$/, 'Only alphanumeric characters are allowed').required("Login Name is required."),
    // ngs: Yup.number()
    //   .typeError('Must be a number')
    //   .required('Employee ID is required')
    //   .positive('Must be a positive number')
    //   .integer('Must be an integer'),
    // password: userType
    //   ? Yup.string()
    //   : Yup.string().required("Password is required."),
    // confirmPassword: userType
    //   ? Yup.string()
    //   : Yup.string()
    //     .oneOf([Yup.ref("password"), null], "Passwords must match")
    //     .required("Confirm Password is required."),
    // roleId: Yup.string().required("Role Description is required.")
  });

 

  return (
    <section>
      <div className="container mt-5">
        <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current: 'Creation of User' }} />
        <div className="custome-border ">
          <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
            <h5>Creation of User</h5>
          </div>
          <div className="px-4 mx-auto p-1 text-bold text-end w-100 ">
            <span className="text-danger">(*) Indicates Mandatory Fields.</span>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, touched, errors, setFieldValue, handleChange, setFieldError, setFieldTouched }) => (
              <Form style={{ boxSizing: "border-box" }} className="py-4 mx-auto shadow-sm">
                <div className="row mx-auto mw-100">
                  <InputFieldComponent
                    label="Employee ID"
                    type="number"
                    name="ngs"
                    onChange={(event) => checkEmployee(event, setFieldError, setFieldTouched, setFieldValue)}
                    touched={touched}
                    errors={errors}
                    isRequired={true}
                  />

                  <InputFieldComponent
                    label="Login Name"
                    type="text"
                    name="loginName"
                    onChange={handleChange}
                    touched={touched}
                    errors={errors}
                    isRequired={true}
                  />

                </div>

                <div className={`row mx-auto mw-100 ${userOptions.length > 1 && values.ngs ? "" : "d-none"}`}>
                  {open && <div>
                    <div className="popup-overlay">
                      <div className="popup-content">
                        <h2>Application Name</h2>
                        {userOptions.map((item, index) => (
                          <div key={index}>
                            <label>
                              <input
                                type="radio"
                                value={item.value} 
                                onChange={() => handleChangeSelect({ label: item?.items?.loginName, value: item?.items?.application, items: item?.items }, setFieldValue, 'loginUser')}
                              />
                              {item?.items?.loginName} ({item?.items?.application})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>}
                  {loginName != null && <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                    <div className="col-sm-4 col-4">
                      <label htmlFor="selecteUser" className="mr-3">
                        Application Name
                      </label>
                    </div>
                    <div className="col-sm-8 col-8">
                      <div className="select-container"> 
                        <h5>{loginName}</h5>
                      </div>
                    </div>
                  </div>}
                  <InputFieldComponent
                    label="Existing Name"
                    type="text"
                    name="exitingLoginName"
                    onChange={handleChange}
                    touched={touched}
                    errors={errors}
                    isDisabled={true}
                  />
                </div>
                <div className={`row mx-auto mw-100 ${userType ? "d-none" : ""}`}>
                  <InputFieldComponent
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    touched={touched}
                    isRequired={true}
                    errors={errors}
                  />
                  <InputFieldComponent
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    touched={touched}
                    isRequired={true}
                    errors={errors}
                  />
                </div>
                <div className={`row mx-auto mw-100`}>

                  <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                    <div className="col-sm-4 col-4">
                      <label htmlFor="roleId" className="mr-3">
                        Role Description <span className="text-danger text-bold">*</span>
                      </label>
                    </div>
                    <div className="col-sm-8 col-8">
                      <div className="select-container">
                        <Select
                          className={`custome-input-height  ${false ? "is-invalid" : ""}`}
                          id="roleId"
                          name="roleId"
                          options={userRoles}
                          onChange={(selectedOption) => handleChangeRole(selectedOption, setFieldValue, 'roleId', setFieldError, setFieldTouched)}
                          menuPortalTarget={document.body}
                          styles={{ menuPortal: base => ({ ...base, zCreateUserForm: 9999 }) }}
                          value={userRoles.find(option => option.value === values.roleId) || userOptions[0]}
                        />

                        {touched.roleId && errors.roleId ? (
                          <div>
                            <ErrorMessage name="roleId">
                              {msg => touched.roleId && errors.roleId ? (
                                <div className="text-danger">{errors.roleId}</div>
                              ) : null}
                            </ErrorMessage>
                          </div>
                        ) : null}

                      </div>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className='alert alert-danger mt-3'>
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className='alert alert-success mt-3'>
                    {successMessage}
                  </div>
                )}
                <div className="row mx-auto mw-100 mt-3">
                  {expanded &&
                    (<>
                      <hr className="custome-border" />
                      <div className="d-flex   align-items-center">
                        <h6 className="text-danger">Menus</h6>
                      </div>
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
                      </div>
                    </>
                    )
                  }


                  <div className="d-flex justify-content-end gap-3 mt-3 flex-wrap">
                    <button type="reset" className="btn btn-sm custome-button-danger text-white  ">
                      <FaSyncAlt /> Reset
                    </button>
                    <button type="submit" className="btn btn-sm custome-button-color1 text-white">
                      <FaPlus className={dataLoading ? "spn" : ""} /> Save
                    </button>
                  </div>
                </div>
                {isSubmit && <Loader />}
              </Form>
            )}

          </Formik>
        </div>

      </div>




    </section >
  );
};
export default CreateUserForm;
