
import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import backgroundImage from '../../assets/dpl_back_logo.jpg'

const AppContent = () => {
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

            <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat", 
                zIndex: -1,  
            }}
             className="rk_container">
                <Header toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}
                />
                <div className={`rk_sidebar ${toggleSidebar ? "" : "sidebarToogleCls"}`}>
                    <Sidebar isCollapse={isCollapse} handleDropdownToggle={handleDropdownToggle} />
                </div>
                <div 
                  
                className={`rk_content ${toggleSidebar ? "" : "collapsed-content"}`} 
                >
                    <div className="col-12 mt-5"
                    
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppContent;
