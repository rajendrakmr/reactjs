import React, { useEffect, useState } from "react";

import logo from "../../assets/img/logo.jpg";
import { SidebarMenu } from "./routes";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

function Layout({ children }) {
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
  const cardStyle = {
    background: 'linear-gradient(135deg, #4c4670, #060620, #4c4670)',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-in-out' // Apply fade-in animation
  };
  

  return (
    <div className="container-fluid p-0 d-flex flex-row m-0">
      {/* Sidebar Section Start */}
      <div className={`row m-0 sidebar_container ${toggleSidebar ? "" : "sidebarToogleCls"}`}>
        <Sidebar isCollapse={isCollapse} handleDropdownToggle={handleDropdownToggle}/>
      </div>
      {/* Sidebar Section End */}

      <div className="row w-100 d-flex m-0 p-0">
        <Header  toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} logo={logo}
        />
        
        {/* Children Section Start */}
        <div className="col-12 children_container m-0 p-0 mt-5">
        <div className="container mt-5">
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title text-center">The Durgapur Projects Limited</h5>
          <h6 className="card-subtitle mb-2 text-center font-italic">
            (A Government of West Bengal Enterprise)
            Administrative Building
            Durgapur - 713201
          </h6>
        </div>
      </div>
    </div>
        </div>
        {/* Children Section End */}

        {/* Sidebar Footer Section start  */}
        <Footer />
        {/* Sidebar Footer Section end */}
      </div>
    </div>
  );
}

export default Layout;
