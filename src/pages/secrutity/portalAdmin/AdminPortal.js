import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

//import { cacheClearSuccessMessage, clearSuccessMessage, getRefreshDatabaseCache } from "../../../redux/slice/cca-grade/ccaGradeSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDepoAddAction, clearErrorMessage } from "../../../redux/slice/store/storeSlice";
import BreadCrumb from "../../../components/layout/BreadCrumb";

const AdminPortal = () => {

    const dispatch = useDispatch();
    const refreshDatabase = useSelector((state) => state.admin.refreshDatabase);
    const error = useSelector((state) => state.admin.error);
    const [addMessage, setAddMessage] = useState(false)

    const handleSearchSubmit = async (event) => {
        const indicatorsPath = "admin/reload";
        const adminLoginData = JSON.parse(localStorage.getItem('adminLogin'));
        const { token, loginId } = adminLoginData;

        const dataInfo = {
            "data": "REFRESH_CACHE"
        };
        try {
            await dispatch(getDepoAddAction({ indicatorsPath, dataInfo, token })).unwrap();
            setAddMessage(true)
            setTimeout(() => {
                setAddMessage(false)
            }, 5000);
        } catch (error) {
            console.error("Error adding depo:", error);
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 5000)
        }
    };


    return (
        <section>
            
        <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current:'Portal Admin' }} />
                    {addMessage && <div className="mt-2 alert alert-success text-red">Cache Refresh successfully</div>}

                    <div className="custome-border pb-4">
                        <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center">
                            <h5>Portal Admin Functions</h5>
                        </div>
                        <div className="px-3 custom-width mx-auto p-2  text-center">
                            <div className="container">
                                <div className="row">

                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        {/* Portal Property File Card  card */}
                                        <div className="        mb-3 card-body">
                                            <div className="row">
                                                <h6 className="custome-background-color1 text-white p-1">
                                                    <FontAwesomeIcon icon={faFile} /> Portal Property File
                                                </h6>
                                                {/* Additional details specific to the Portal Property File */}
                                                <div className="col-xl-6">
                                                    {/* Left Side Content */}
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <Link className="card-title">Load Portal Property File</Link>
                                                            <p className="card-text">
                                                                Re-Loads the file portal.properties
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6">
                                                    {/* Right Side Content */}
                                                    <div className="card mb-3">
                                                        <div className="card-body">
                                                            <Link className="card-title" onClick={handleSearchSubmit}>Refresh Database Cache</Link>
                                                            <p className="card-text">
                                                                Re-Loads all cached database objects.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    );
};

export default AdminPortal;
