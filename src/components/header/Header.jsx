
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutHandler } from '../../redux/reducer/auth/authReducer';
import logo from '../../assets/img/logo.jpg';
import { faBars, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header({ toggleSidebar, setToggleSidebar }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutHandler());
    setTimeout(() => {
      window.location.href = '/Store_Accounts';
    }, 0);
  };



  return (
    <div className="col-12 header_container ps-4 pe-4 d-flex justify-content-between align-items-center">

      <div className="sidebar_logo_container">
        <img src={logo} alt="logo" className='object-fit-contain' />
      </div>
      <div
        className="menu_btn"
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        <FontAwesomeIcon icon={faBars} size="lg" color="white" />
      </div>


      <div className="header_menu_icon">
        <span className="user-welcome-text">
          {`! Hi ${data?.empName || 'Guest'}`}
        </span>
        <span className="user-icon-header">
          <FontAwesomeIcon icon={faUser} size="lg" color="white" />
        </span>
        <button className="logout-popup-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
