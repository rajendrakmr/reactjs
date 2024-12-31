 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../../../utils/cookieService';
import axios from '../../../../utils/axios'

// Async thunks

export const getAccessMenuByRole = createAsyncThunk(
    'role/getAccessMenuByRole',
    async (payload, { rejectWithValue }) => {
        try { 
            const formData = {  roleId:payload.roleId }; 
            const { data }  = await axios.post('/role/getmenubyrole', formData);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);
export const addRole = createAsyncThunk(
    'roles/addRole',
    async (payload, { rejectWithValue }) => {
        try { 
            const userData = getCookie('userInfo')
            const formData = {
                data: {
                    roleDescription: payload.roleDescription,
                    loginId: userData.loginId
                }
            };

            const { data } = await axios.post('/role/addrole', formData);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);


export const clearRole = createAsyncThunk(
    'roles/clear',
    async (payload, { rejectWithValue }) => { 
        return true   
    }
);

export const getRoles = createAsyncThunk(
    'roles/getRoles',
    async (_, { rejectWithValue }) => {
        try {  
            const { data }  = await axios.get('/role/allroles'); 
            return data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const getMenuRole = createAsyncThunk(
    'roles/getMenuRole',
    async (payload, { rejectWithValue }) => {
        try {  
            const formData = { 
                roleId:payload.roleId
            }; 
            const { data } = await axios.post('/role/getmenubyrole', formData);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);
export const createRole = createAsyncThunk(
    'roles/createRole',
    async (payload, { rejectWithValue }) => {
        try {  
            const formData = { 
                roleId:payload.roleId,
                menuList:payload.menus
            };

            const { data } = await axios.post('/role/save/menu/roleaccess', formData);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);


// Initial state
const initialState = {
    roles: [],
    role_menu_list: {},
    isLoading: false,
    error: null,
    serResponse:false,
    message: '',
    seterrors:null,
    serMessage:null,
    saveLoading:false,
    serError:false
};

// Slice
const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.message = '';
            state.serResponse = false;
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRole.pending, (state) => {
                state.isLoading = true;  
            })
            .addCase(createRole.fulfilled, (state, action) => {  
                state.serError = true
                state.serResponse = true
                state.isLoading  = false;
                state.serMessage =action.payload.success; 
            })
            .addCase(createRole.rejected, (state, action) => {
                state.serError  = true
                state.isLoading = false; 
                state.serMessage = action.payload.error || null;;
            })
            .addCase(getMenuRole.fulfilled, (state, action) => {  
                state.message = '';
                state.serResponse = false; 
                state.seterrors=null
                state.role_menu_list=action.payload.success
            }) 
            .addCase(addRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRole.fulfilled, (state, action) => { 
                state.serError = true
                state.serResponse = true
                state.isLoading  = false;
                state.serMessage =`"${action.meta.arg.roleDescription}" has been added successfully.` 
            })
            .addCase(addRole.rejected, (state, action) => {     
                state.isLoading = false;
                state.serError  = true;
                state.serMessage= action.payload.error || null; 
            })
            .addCase(getRoles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles     = action.payload;
                // state.serResponse = true;
            })
            .addCase(getRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.serResponse = false;
            })
            .addCase(clearRole.fulfilled, (state, action) => { 
                state.message = '';
                state.serResponse = false; 
                state.seterrors=null;
                state.serMessage=false;
                state.isLoading =false;
                state.serError  =false;
            });
    },
});

export const { resetState } = roleSlice.actions;

export default roleSlice.reducer;
