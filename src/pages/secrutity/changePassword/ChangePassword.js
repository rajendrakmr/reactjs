import React, { useEffect, useState } from "react";
import { FaPlus, FaSyncAlt } from "react-icons/fa"; // Import FaTimes for cancel icon
import {  useNavigate } from "react-router-dom";
import { changePasswordAction, clearSuccessMessage, clearErrorMessage } from "../../../redux/slice/cca-grade/ccaGradeSlice";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/layout/BreadCrumb";

const ChangePassword = () => {

    const dispatch = useDispatch();
    const error = useSelector((state) => state.admin.error);
    const successPCMsfg = useSelector((state) => state.admin.successPCMsfg);

    const [formData, setFormData] = useState({
        loginName: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error message when user starts typing again
        setFormErrors({ ...formErrors, [e.target.name]: "" });
    };

    const validate = () => {
        const errors = {};

        if (!formData.loginName) {
            errors.loginName = "LoginName is required";
        }
        if (!formData.oldPassword) {
            errors.oldPassword = "Old Password is required";
        }
        if (!formData.newPassword) {
            errors.newPassword = "New Password is required";
        }
        if (!formData.confirmNewPassword) {
            errors.confirmNewPassword = "Confirm Password is required";
        }
        if (formData.newPassword !== formData.confirmNewPassword) {
            errors.confirmNewPassword = "Password && Confirm Password do not match";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const handleReset = () => {
        // Clear form data
        setFormData({
            loginName: "",
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        });

        // Clear form errors
        setFormErrors({});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            const indicatorsPath = "user/changepassword";
            const adminLoginData = JSON.parse(localStorage.getItem('adminLogin'));
            const { token, loginName } = adminLoginData;

            const dataInfo = {
                loginName: loginName,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmNewPassword: formData.confirmNewPassword
            };
            dispatch(changePasswordAction({ indicatorsPath, dataInfo, token }));
            setFormData({
                loginName: "",
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });

            // Show success message on successful form submission
            setTimeout(() => {
                // Hide success message after 5 seconds
                dispatch(clearSuccessMessage()); // Dispatch action to clear success message from Redux store
                dispatch(clearErrorMessage());

            }, 5000)

        }
    };

    return (
        <section>
               <div className="col-12 mt-5">
        <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current:'Change Login Password' }} />
           
                    <div className="custome-border pb-4">
                        <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center">
                            <h5>Change Login Password</h5>
                        </div>
                        <form className="px-3 py-4 custom-width mx-auto p-2 shadow-sm" onSubmit={handleSubmit}>
                            {
                                error &&
                                <>
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                </>
                            }
                            {
                                successPCMsfg?.success &&
                                <>
                                    <div className="alert alert-success">
                                        {successPCMsfg.success}
                                    </div>
                                </>
                            }


                            <div className="row">
                                <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                    <div className="col-sm-3 col-4">
                                        <label htmlFor="name" className="mr-3">
                                            User Login Name:
                                        </label>
                                    </div>
                                    <div className="col-sm-9 col-8">
                                        <input
                                            type="text"
                                            name="loginName"
                                            onChange={handleChange}
                                            className={`form-control custome-border ${formErrors.loginName ? 'is-invalid' : ''}`}
                                            placeholder="Name"
                                            maxLength={30}
                                        />
                                        {formErrors.loginName && <div className="invalid-feedback">{formErrors.loginName}</div>}
                                    </div>
                                </div>
                                <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                    <div className="col-sm-3 col-4">
                                        <label htmlFor="oldPassword" className="mr-3">
                                            Old Password:
                                        </label>
                                    </div>
                                    <div className="col-sm-9 col-8">
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            onChange={handleChange}
                                            className={`form-control custome-border ${formErrors.oldPassword ? 'is-invalid' : ''}`}
                                            placeholder="Old Password"
                                            maxLength={100}
                                        />
                                        {formErrors.oldPassword && <div className="invalid-feedback">{formErrors.oldPassword}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                    <div className="col-sm-3 col-4">
                                        <label htmlFor="newPassword" className="mr-3">
                                            New Password:
                                        </label>
                                    </div>
                                    <div className="col-sm-9 col-8">
                                        <input
                                            type="password"
                                            name="newPassword"
                                            onChange={handleChange}
                                            className={`form-control custome-border ${formErrors.newPassword ? 'is-invalid' : ''}`}
                                            placeholder="New Password"
                                            maxLength={100}
                                        />
                                        {formErrors.newPassword && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                                    </div>
                                </div>
                                <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                    <div className="col-sm-3 col-4">
                                        <label htmlFor="confirmPassword" className="mr-3">
                                            Confirm New Password:
                                        </label>
                                    </div>
                                    <div className="col-sm-9 col-8">
                                        <input
                                            type="password"
                                            className={`form-control custome-border ${formErrors.confirmNewPassword ? 'is-invalid' : ''}`}
                                            name="confirmNewPassword"
                                            onChange={handleChange}
                                            placeholder="Confirm New Password"
                                            maxLength={100}
                                        />
                                        {formErrors.confirmNewPassword && <div className="invalid-feedback">{formErrors.confirmNewPassword}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap">
                                <button type="submit" className="btn btn-sm custome-button-color1 text-white mx-2">
                                    <FaSyncAlt className="me-1" /> Update
                                </button>
                                <button type="reset" onClick={handleReset} className="btn btn-sm btn-secondary mx-2">
                                    <FaPlus className="me-1" /> Reset
                                </button>

                            </div>
                        </form>
                    </div>
                    </div>
        </section>
    );
};

export default ChangePassword;
