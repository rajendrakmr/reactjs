import React, { useEffect, useState } from "react";

import "../createuser.css";
import { FaChevronDown, FaPlus, FaSyncAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../../../components/header/Header";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Footer from "../../../../components/footer/Footer";

const EmployeeDetails = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const courses = ["Java", "Python", "JavaScript", "Web Application", "ReacJa"];

    return (
        <div className="container-fluid p-0 d-flex flex-row m-0">
            {/* Sidebar Section */}
            <div
                className={`row m-0 sidebar_container ${toggleSidebar ? "" : "sidebarToogleCls"
                    }`}
            >
                <Sidebar
                    isCollapse={isCollapse}
                    handleDropdownToggle={handleDropdownToggle}
                />
            </div>

            {/* Main Content Section */}
            <div className="row w-100 m-0 p-0">
                <Header
                    toggleSidebar={toggleSidebar}
                    setToggleSidebar={setToggleSidebar}
                />

                {/* Children Section */}
                <div className="col-12 children_container m-0 p-4 mt-3 ">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                            <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                Security
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Create User
                            </li>
                        </ol>
                    </nav>

                    <div className="custome-border pb-4">
                        <div className="d-flex gap-3 align-items-center primary-light-bg text-white p-2">
                            <Link to="#" className="text-white text-decoration-none">
                                Create User
                            </Link>
                            <Link to="/user/modify" className="text-white text-decoration-none">
                                Modify Existing
                            </Link>
                            <Link to="/user/creation" className="text-white text-decoration-none">
                                User Home
                            </Link>
                            <Link to="/dashboard" className="text-white text-decoration-none">
                                Home
                            </Link>
                        </div>
                        <h5 className="text-center mt-3 text-danger">
                            Employee Search Deatils
                        </h5>
                        <hr className="custome-border my-3" />
                        <form className="px-3 custom-width mx-auto p-2 shadow-sm">
                            <table className="table table-hover tttt" custome-button-danger>
                                <thead className="table-header-bg text-white">
                                    <tr>
                                        <th scope="col">S,No </th>
                                        <th scope="col">Login Name</th>
                                        <th scope="col tttt">Employee Id</th>
                                        <th scope="col">Employee Name</th>
                                        <th scope="col">Employee Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>TEST</td>
                                        <td>09999</td>
                                        <td>Null</td>
                                        <td>BAMS ADMIN</td>
                                    </tr>
                                    
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>TEST</td>
                                        <td>09999</td>
                                        <td>Null</td>
                                        <td>BAMS ADMIN</td>
                                    </tr>
                                </tbody>
                            </table>


                            <div id="myModal" className="modal fade" role="dialog">
                                <div className="modal-dialog">


                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title">Row information</h4>
                                        </div>
                                        <div className="modal-body">

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </form>


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

export default EmployeeDetails;
