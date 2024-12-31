 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookie,clearCookie } from '../../../utils/cookieService';
 
export const clearAuth = createAsyncThunk(
    'auth/clear',
    async (payload, { rejectWithValue }) => { 
        return true   
    }
);
 
 
export const authLogin = createAsyncThunk(
    'user/authLogin',
    async (payload, { rejectWithValue }) => {
        try {  
            const url = `${process.env.REACT_APP_API_DPL_URL}/user/login`; 
            const config = {
                headers: { 
                    "Content-Type": "application/json",
                },
            }; 
            const { data } = await axios.post(url, payload, config);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);

 
// Initial state
const initialState = {  
    isLoading: false,
    error: null,
    success: false,
    message: '',
    seterrors:null,
    serMessage:null, 
    serError:false,
    resSuccess:false,
    serResponse:false

};

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        logoutHandler: (state, action) => { 
            state.token      = null;
            state.isLoggedIn = false;
            localStorage.clear();
            clearCookie();
          },
    },
    extraReducers: (builder) => {
        builder  
            .addCase(authLogin.pending, (state) => {
                state.isLoading    = true;
                state.serError     = null;
                state.serMessage   = null;
            })
            .addCase(authLogin.fulfilled, (state, action) => { 
                state.isLoading  = false;
                state.data       = action.payload;
                state.serResponse= false 
                state.serError   = true;
                setCookie('access_token', action.payload.token, { path: '/', maxAge: 86400 });
                setCookie('userInfo', action.payload, { path: '/', maxAge: 86400 });
                setCookie('session', 'active', { path: '/' });
                localStorage.setItem('adminLogin', JSON.stringify(action.payload));
                localStorage.setItem("token", JSON.stringify(action.payload.token));
                
            })
            .addCase(authLogin.rejected, (state, action) => { 
                state.isLoading  = false;
                state.serError   = true;
                state.serMessage = action.payload.error || null;;
            }) 
            .addCase(clearAuth.fulfilled, (state, action) => { 
                state.message = '';
                state.success = false; 
                state.seterrors=null;
                state.serMessage=null;
                state.isLoading=false;
                state.serError=false;
                state.serResponse=false;
            });
    },
});

export const { logoutHandler } = authSlice.actions;
export default authSlice.reducer;
