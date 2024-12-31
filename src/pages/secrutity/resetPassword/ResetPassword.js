import React, { useEffect, useState } from "react";

import { FaSyncAlt, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { changePasswordAction, clearSuccessMessage, clearErrorMessage } from "../../../redux/slice/cca-grade/ccaGradeSlice";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/layout/BreadCrumb";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.admin.error);
    const successPCMsfg = useSelector((state) => state.admin.successPCMsfg);

    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        emailId: "",
        loginName: "",
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error message when user starts typing again
        setFormErrors({ ...formErrors, [e.target.name]: "" });
    };

    const validate = () => {
        const errors = {};

        if (!formData.loginName) {
            errors.loginName = "Login Name is required";
        }
       
        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            const indicatorsPath = "user/resetpassword";
            const adminLoginData = JSON.parse(localStorage.getItem('adminLogin'));
            const { token } = adminLoginData;

            const dataInfo = {
                loginName: formData.loginName,
                emailId: formData.emailId,
            };
            dispatch(changePasswordAction({ indicatorsPath, dataInfo, token }));

            setFormData({
                loginName: "",
                emailId: "",
            });

            // Show success message on successful form submission
            setTimeout(() => {
                dispatch(clearSuccessMessage());
                dispatch(clearErrorMessage());
                navigate("/"); // Redirect after form submission
            }, 5000);
        }
    };

    return (
        
        <section>
               <div className="col-12 mt-5">
            <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current:' Reset Login Password' }} />
         
                    <div className="custome-border pb-4">
                        <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center">
                            <h5>Reset Login Password</h5>
                        </div>
                        <form className="px-3 py-4 custom-width mx-auto p-2 shadow-sm" onSubmit={handleSubmit}>
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                            {successPCMsfg?.success && (
                                <div className="alert alert-success">
                                    {successPCMsfg.success}
                                </div>
                            )}

                            {/* Form Inputs */}
                            <div className="row">
                                {/* Login Name Input */}
                                <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                    <div className="col-sm-3 col-4">
                                        <label htmlFor="loginName" className="mr-3">
                                            Login Name:
                                        </label>
                                    </div>
                                    <div className="col-sm-9 col-8">
                                        <input
                                            type="text"
                                            className={`form-control custome-border ${formErrors.loginName ? 'is-invalid' : ''}`}
                                            id="loginName"
                                            placeholder="Login Name"
                                            name="loginName"
                                            onChange={handleChange}
                                            value={formData.loginName}
                                            maxLength={30}
                                        />
                                        {formErrors.loginName && <div className="invalid-feedback">{formErrors.loginName}</div>}
                                    </div>
                                </div>
                                {/* Email Id Input */}
                                <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                    <div className="col-sm-3 col-4">
                                        <label htmlFor="emailId" className="mr-3">
                                            Email Id:
                                        </label>
                                    </div>
                                    <div className="col-sm-9 col-8">
                                        <input
                                            type="email"
                                            className={`form-control custome-border ${formErrors.emailId ? 'is-invalid' : ''}`}
                                            id="emailId"
                                            placeholder="Email Id"
                                            name="emailId"
                                            onChange={handleChange}
                                            value={formData.emailId}
                                            maxLength={100}
                                        />
                                        {/* {formErrors.emailId && <div className="invalid-feedback">{formErrors.emailId}</div>} */}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap">
                                <button type="submit" className="btn btn-sm custome-button-color1 text-white mx-2">
                                    <FaSyncAlt className="me-1" /> Reset Password
                                </button>
                                <Link to="/" className="btn btn-sm btn-danger mx-2">
                                    <FaTimes className="me-1" /> Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                    </div>
        </section>
    );
};

export default ResetPassword;
