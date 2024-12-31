 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from '../../utils/axios'
export const submitData = createAsyncThunk(
    'indent/submitData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.post(indicatorsPath, dataInfo);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);
 


export const putData = createAsyncThunk(
    'indent/putData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.post(indicatorsPath, dataInfo);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);
 

// Initial state
const initialState = { 
    rb_menu_list: {},
    result:{},
    isSubmit: false,
    error: null,
    success: false,
    message: '',
    seterrors:null,
    serMessage:null, 
    serPostError:false,
    resSuccess:false,
    serResponse:false

};

// Slice
const apiSlice = createSlice({
    name: 'indent',
    initialState,
    reducers: {
        onSubReset: (state) => {
            state.isSubmit = false;
            state.error = null;
            state.message = '';
            state.success = false;
            state.serPostError = false;
            
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(submitData.pending, (state) => {
                state.isSubmit    = true;
                state.serPostError = false;
                state.serMessage    = null;
            })
            .addCase(submitData.fulfilled, (state, action) => {  
                state.result     = action.payload;
                state.isSubmit  = false;
                state.serResponse= true;
                state.serPostError   = true; 
            })
            .addCase(submitData.rejected, (state, action) => { 
                state.isSubmit = false;
                state.serPostError = true; 
                state.serMessage = action.payload.error || null;
            });
    },
});

export const { onSubReset } = apiSlice.actions;

export default apiSlice.reducer;
