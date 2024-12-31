import React, { useEffect, useState } from "react";

import "../createuser.css";
import { FaChevronDown, FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../../../components/header/Header";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Footer from "../../../../components/footer/Footer";
import BreadCrumb from "../../../../components/layout/BreadCrumb";

const ModifyUser = () => {
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
    <section>
            <BreadCrumb item={{ label: 'Security', 'sub_label': 'Security', active: true, current:'Modify User' }} />

          <div className="custome-border pb-4">
            {/* <div className="d-flex gap-3 align-items-center primary-light-bg  p-2">
              <Link to="#" className="text-white text-decoration-none">
                Create User
              </Link>
              <Link to="#" className="text-white text-decoration-none">
                Modify Existing
              </Link>
              <Link to="/user/creation" className="text-white text-decoration-none">
                User Home
              </Link>
              <Link to="/dashboard" className="text-white text-decoration-none">
                Home
              </Link>
            </div> */}
            <h4 className="text-center mt-3 text-danger">
              Modify User Access Privileges
            </h4>
            <hr className="custome-border my-3" />
            <form className="px-3 py-4 custom-width mx-auto p-2 shadow-sm">
              <h4 className="text-center mb-3 primary-light-bg text-white">
                Search Parameter
              </h4>

              <div className="row ">

                <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                  <div className="col-sm-3 col-4">
                    <label htmlFor="cousse" className="mr-3">
                      Employee ID:
                    </label>
                  </div>
                  <div className="col-sm-9 col-8">
                    <input
                      type="text"
                      className="form-control custome-border"
                      id="cousse"
                      placeholder="Search by Employee Id"
                    />
                  </div>
                </div>
              </div>

            </form>
            <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap">
              <button type="submit" className="btn btn-sm custome-button-color1  text-white mx-2">
                <FaSearch /> Search
              </button>
            </div>
          </div>
        
   </section>
  );
};

export default ModifyUser;
