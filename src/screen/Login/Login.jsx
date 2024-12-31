import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { authLogin } from '../../redux/reducer/auth/authReducer'; 
import "./login.css";
import { getCookie } from '../../utils/cookieService';

const Login = () => { 
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {  
    const token = getCookie('access_token'); 
    if(token) { 
      navigate('/dashboard');
    }else{ 
      navigate('/');
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  
    const { userName, password } = formData; 
    const logindata = { userName, password };   
    try {
      const action = await dispatch(authLogin(logindata))
      if (authLogin.fulfilled.match(action)) {  
        navigate('/dashboard');
      } else {
        setError('Invalid login name or password. Please try again.');
      } 
    } catch (error) { 
      setError('Invalid login name or password. Please try again.');
    } finally {
      setIsLoading(false);
    } 
  };


  const handleReset = () => {
    setFormData({
      userName: '',
      password: ''
    });
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = formData.userName && formData.password;

  return (
    <>
      <div className="wrapper login_form">
        <div className="logo" style={{ borderRadius: '50%', backgroundColor: '#156565', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
          DPL
        </div>
        <div className="text-center mt-4 name">
          Authentication - Login
        </div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            {/* <span className="far fa-user"></span> */}
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Login Name"
            />
          </div>
          <div className="form-field d-flex align-items-center position-relative">
            {/* <span className="fas fa-key"></span> */}
            <input
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="password-toggle-icon position-absolute end-0 me-3"
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <div className="error-validation-message">{error}</div>}
          <div className="login_form_button_container d-flex justify-content-center mt-3">
            <button className="btn btn-small me-2" disabled={!isFormValid}>
              {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
            </button>
            <button onClick={handleReset} type="reset" className="btn btn-small ms-2">Reset</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
