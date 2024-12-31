import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faAngleDoubleRight, faDownLong, fas, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { library } from '@fortawesome/fontawesome-svg-core';
import { logoutHandler } from "../../redux/slice/login/authSlice";
import { getMenu } from '../../redux/reducer/menu/menuReducer';
import { getCookie } from '../../utils/cookieService';
library.add(fas);

const Sidebar = ({isCollapse,}) => {
    const dispatch = useDispatch();
    const menuList = useSelector((state) => state.menu.menuList);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);
    const location = useLocation();
    const currentPath = location.pathname;
    useEffect(() => {
        const fetchMenuList = async () => {
            const adminLoginData = getCookie('userInfo') 
            if (adminLoginData && adminLoginData.token) {
                const { loginId } = adminLoginData;
                const dataInfo = { login_id: loginId || '' };
                try {
                    await dispatch(getMenu(dataInfo));
                } catch (error) {
                    console.error('Error fetching menu list:', error);
                }
            } else {
                console.error('No valid adminLogin data found in localStorage');
            }
        };

        fetchMenuList();
    }, []);

    useEffect(() => {
        Object.entries(menuList).forEach(([parentModuleName, subModules], index) => {
            Object.entries(subModules).forEach(([subModuleName, menuItems]) => {
                menuItems.forEach(menuItem => {
                    if (menuItem.menuLinkName === currentPath) {
                        setActiveMenuIndex(index);
                        setActiveSubMenuIndex(subModuleName);
                    }
                });
            });
        });
    }, [location, menuList]);

    const renderSubMenuItems = (subMenus) => (
        <ul className="p-0 accordion-body child-route-con">
            {subMenus.map((menuItem, i) => (

                <li key={i} className={`child-route ${currentPath == menuItem.menuLinkName ? 'child-active' : ''}`}>
                    <Link to={menuItem.menuLinkName} className="c-route-link">
                        <FontAwesomeIcon icon={faAngleDoubleRight} className="c-route-icon c-cl-w" />
                        <span className="c-cl-w">{menuItem.menuName}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );

    const toggleMenuCollapse = (index) => {
        setActiveMenuIndex(prevIndex => (prevIndex === index ? null : index));
        setActiveSubMenuIndex(null);
    };

    const toggleSubMenuCollapse = (subModuleName) => {
        setActiveSubMenuIndex(prevIndex => (prevIndex === subModuleName ? null : subModuleName));
    };

    const renderMenuItems = () => (
        <ul className="p-0 accordion text-white" style={{ listStyle: 'none' }}>
            {Object.entries(menuList).map(([parentModuleName, subModules], index) => (
                <li key={index} className="parent-route accordion-item border-none">
                    <div className={`p-route-link accordion-header ${activeMenuIndex === index ? 'child-active' : ''}`} onClick={() => toggleMenuCollapse(index)}>
                        <div className="d-flex align-items-center gap-2">
                            <span className="ps-1 p-cl-white">{parentModuleName}</span>
                            <FontAwesomeIcon icon={activeMenuIndex === index ? faAngleDown : faAngleRight} className="p-route-icon p-cl-white p-abs" />
                        </div>
                    </div>
                    <div className={`accordion-collapse collapse ${activeMenuIndex === index ? 'show' : ''}`}>
                        {Object.entries(subModules).map(([subModuleName, menuItems], subIndex) => (
                            <div key={subIndex}>
                                <div className={`p-route-link-submenu accordion-header ${activeSubMenuIndex === subModuleName ? 'child-active' : ''}`} onClick={() => toggleSubMenuCollapse(subModuleName)}>
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="ps-1 p-cl-white">{subModuleName}</span>
                                        <FontAwesomeIcon icon={activeSubMenuIndex === subModuleName ? faMinus : faPlus} className="p-route-icon p-cl-white p-abs" />
                                    </div>
                                </div>
                                <div className={`accordion-collapse collapse ${activeSubMenuIndex === subModuleName ? 'show' : ''}`}>
                                    {renderSubMenuItems(menuItems)}
                                </div>
                            </div>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );

    const handleLogout = () => {
        dispatch(logoutHandler());
        window.location.href = '/';
    };

    if (!menuList || typeof menuList !== 'object') {
        return null;
    }

    return (
        <div className="sidebar_fixed mt-5">
            <div className="sidebar_logo_container col-12"></div>
            <div className="col-12 p-0 sidebar_routes_container">
                <div className="sidebarRoutes">{renderMenuItems()}</div>
            </div>
        </div>
    );
};

export default Sidebar;
