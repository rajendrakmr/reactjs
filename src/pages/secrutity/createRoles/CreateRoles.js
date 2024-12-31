import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import Footer from "../../../components/footer/Footer";

const CreateRole = () => {
    const [isCollapse, setIsCollapse] = useState(true);
    const [toggleSidebar, setToggleSidebar] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setToggleSidebar(window.innerWidth > 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleDropdownToggle = (index) => {
        setIsCollapse((prev) => (prev === index ? null : index));
    };

    return (
        <div className="container-fluid p-0 d-flex flex-row m-0">
            {/* Sidebar Section */}
            <div className={`row m-0 sidebar_container ${toggleSidebar ? "" : "sidebarToogleCls"}`}>
                <Sidebar isCollapse={isCollapse} handleDropdownToggle={handleDropdownToggle} />
            </div>

            {/* Main Content Section */}
            <div className="row w-100 m-0 p-0">
                <Header toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

                {/* Children Section */}
                <div className="col-12 children_container m-0 p-4 mt-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                            <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                Security
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Creation of Roles
                            </li>
                        </ol>
                    </nav>

                    <div className="custome-border pb-4">
                        <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center">
                            <h5>Role Creation Details</h5>
                        </div>
                        <div className="px-3 custom-width mx-auto p-2 shadow-sm text-center">
                            <div className="container">
                                <div className="row">

                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        {/* Portal Property File Card */}
                                        <div className="card mb-3 card-body">
                                            <div className="row">
                                                <h6 className="custome-background-color1 text-white p-1">
                                                  Role Creation Maintenance
                                                </h6>
                                                {/* Additional details specific to the Portal Property File */}
                                                <div className="col-xl-6">
                                                    {/* Left Side Content */}
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <Link className="card-title"> Add/Modify Role Creation</Link>
                                                            <p className="card-text">
                                                            Create New Role / Modify Role.
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
                </div>

                {/* End Children Section */}

                {/* Footer Section */}
                <Footer />

                {/* End Footer Section */}
            </div>
        </div>
    );
};

export default CreateRole;
