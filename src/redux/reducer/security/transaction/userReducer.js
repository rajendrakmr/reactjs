 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from '../../../../utils/axios'
export const clearUser = createAsyncThunk(
    'user/clear',
    async (payload, { rejectWithValue }) => { 
        return true   
    }
);
 
 
export const getRoleBaseMenu = createAsyncThunk(
    'user/getRoleBaseMenu',
    async (payload, { rejectWithValue }) => {
        try { 
            const formData = { 
                roleId:payload.roleId
            }; 
            const { data } = await axios.post('/menu/rolebasedmenu', formData);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);
export const createUser = createAsyncThunk(
    'user/createUser',
    async (payload, { rejectWithValue }) => {
        try { 
            const { data } = await axios.post('/user/save', payload);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkUserEmployee = createAsyncThunk(
    'user/checkUserEmployee',
    async (payload, { rejectWithValue }) => {
        try {  
            const { data } = await axios.post('/user/employee', {empCode:payload.ngs});
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial state
const initialState = { 
    rb_menu_list: {},
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
const roleSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.message = '';
            state.success = false;
            
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(checkUserEmployee.pending, (state) => {
                state.isLoading    = true;
                state.serError      = false;
                state.serMessage = null;
            })
            .addCase(checkUserEmployee.fulfilled, (state, action) => {  
                state.data       = action.payload;
                state.isLoading  = false;
                state.serResponse= false;
                state.serError   = true;
                state.serMessage = 'Employee ID Verified.'; 
            })
            .addCase(checkUserEmployee.rejected, (state, action) => { 
                state.isLoading = false;
                state.serError  = true; 
                state.serMessage = action.payload.error || null;;
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading    = true;
                state.serError      = null;
                state.serMessage = null;
            })
            .addCase(createUser.fulfilled, (state, action) => { 
                state.isLoading = false;
                state.data = action.payload;
                state.serResponse = false
                if(action.payload.error){ 
                    state.serMessage = action.payload.error; 
                }else{
                    state.serMessage = action.payload.success; 
                    state.serResponse = true
                }
                state.serError   = true;
                
            })
            .addCase(createUser.rejected, (state, action) => { 
                state.isLoading  = false;
                state.serError   = true;
                state.serMessage = action.payload.error || null;;
            })
            .addCase(getRoleBaseMenu.fulfilled, (state, action) => {   
                state.message = '';
                state.success = false; 
                state.seterrors=null
                state.rb_menu_list=action.payload
            })
            .addCase(clearUser.fulfilled, (state, action) => { 
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

export const { resetState } = roleSlice.actions;

export default roleSlice.reducer;
