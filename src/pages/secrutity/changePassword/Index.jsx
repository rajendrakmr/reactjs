import React, { useCallback, useState } from "react";
import { FaPlus, FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import SearchLoading from "../../../helperFuc/validationMessages/SearchLoading";

import InputFieldComponent from "../../../components/formComponent/InputFieldComponent";
import { submitPostData } from "../../../redux/reducer/commonApiSlice";
import MandatoryField from "../../../components/MandatoryField";
import BreadCrumb from "../../../components/layout/BreadCrumb";


const Index = () => {
    const dispatch = useDispatch();
    const { isSubmit } = useSelector(state => state.commonApi);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  

    const handleFormSubmit = useCallback(async (values, { resetForm}) => { 

        const {
            loginName,
            oldPassword,
            newPassword,
            confirmNewPassword } = values;



        const payload = {
            oldPassword,
            newPassword,
            loginName,
            confirmNewPassword
        };

        try {
            const action = await dispatch(submitPostData({ dataInfo: payload, indicatorsPath: '/user/changepassword' })); 
            if (submitPostData.fulfilled.match(action)) { 
                if(action.payload.error){
                    setErrorMessage("Please enter correct login Name and Old Password. ")
                }else{ 
                    setSuccessMessage("Password Updated successfully. ")
                    resetForm()
                } 
            } else {
                setErrorMessage("Unable to update password. Try again") 

            }

        } catch (error) {
            setErrorMessage("Unable to update password. Try again")
        }  
    },[]);













    const resetBtn = useCallback(() => {
        setErrorMessage('')
        setSuccessMessage('') 
    }, []);


    const validationSchema = Yup.object({
        oldPassword: Yup.string().required("Old Password is required."),
        loginName: Yup.string().required("Login name is required."),
        newPassword: Yup.string().required("New Password is required.").min(6, "Password must be at least 6 characters."),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm Password is required."),
    });

    const initialValues = {
        oldPassword: "",
        loginName: "",
        newPassword: "",
        confirmNewPassword: "",

    };



    return (
        <section>
            <div className="col-12 mt-5">
                <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current: 'Change Login Password' }} />
                <div className="pb-4">
                    <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                        <h6>Change Login Password</h6>
                    </div>
                    <MandatoryField />
                    <div className="_rkContentBorder row py-2">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({ touched, errors,handleChange}) => (
                                <Form className="px-3   mx-auto ">
                                    <div className="row">
                                        <InputFieldComponent label="Login Name" type="text" name="loginName" onChange={handleChange} touched={touched} errors={errors} col="col-md-6" isRequired={true} />
                                        <InputFieldComponent label="Old Password" name="oldPassword" onChange={handleChange} touched={touched} errors={errors} type="password" col="col-md-6" isRequired={true} />

                                    </div>
                                    <div className="row">
                                        <InputFieldComponent label="New Password" name="newPassword" onChange={handleChange} touched={touched} errors={errors} type="password" col="col-md-6" isRequired={true} />
                                        <InputFieldComponent label="Confirm Password" name="confirmNewPassword" onChange={handleChange} touched={touched} errors={errors} type="password" col="col-md-6" isRequired={true} />

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


                                        <div className="d-flex justify-content-end gap-3 mt-3 flex-wrap">
                                            <button disabled={isSubmit} onClick={resetBtn} type="reset" className="btn btn-sm custome-button-danger text-white  ">
                                                <FaSyncAlt /> Reset
                                            </button>
                                            <button type="submit" disabled={isSubmit} className="btn btn-sm custome-button-color1 text-white">
                                            {isSubmit?"Updating...":<><FaPlus /> Update</>}  
                                            </button>
                                        </div>
                                    </div>
                                    {isSubmit && (<SearchLoading />)}

                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
