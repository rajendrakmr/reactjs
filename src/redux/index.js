 
import { combineReducers } from '@reduxjs/toolkit';
import AuthSlice from "./slice/login/authSlice";
import MarksGradeFormSlice from "./slice/marksGradeForm/MarksGradeFormSlice";
import ccaGradeSlice from "./slice/cca-grade/ccaGradeSlice";
import storeSlice from "./slice/store/storeSlice";
import commanSlice from "./slice/comman/commanSlice";
import roleReducer from "./reducer/security/transaction/roleReducer";
import userReducer from "./reducer/security/transaction/userReducer";
import authReducer from './reducer/auth/authReducer';
import menuReducer from './reducer/menu/menuReducer';
import searchReducer from './reducer/store/searchReducer';
import IndentReducer from './reducer/store/transaction/IndentReducer';
import apiSlice from './reducer/apiSlice';
import commonApiSlice from './reducer/commonApiSlice';

const rootReducer = combineReducers({
    auth:authReducer,
    menu:menuReducer,
    search:searchReducer,
    adminlogin: AuthSlice,
    marksGradeForm : MarksGradeFormSlice,
    admin : ccaGradeSlice,
    store: storeSlice,
    comman:commanSlice,
    role:roleReducer,
    user:userReducer,
    indent:IndentReducer,
    postRequest:apiSlice,
    commonApi:commonApiSlice
});

export default rootReducer;
