import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/login/authSlice";
import MarksGradeFormSlice from "./slice/marksGradeForm/MarksGradeFormSlice";
import ccaGradeSlice from "./slice/cca-grade/ccaGradeSlice";
import storeSlice from "./slice/store/storeSlice";
import commanSlice from "./slice/comman/commanSlice";
import roleReducer from "./reducer/security/transaction/roleReducer";
import userReducer from "./reducer/security/transaction/userReducer";




const store = configureStore({
    reducer:{
        adminlogin: AuthSlice,
        marksGradeForm : MarksGradeFormSlice,
        admin : ccaGradeSlice,
        store: storeSlice,
        comman:commanSlice,
        role:roleReducer,
        user:userReducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export default store;