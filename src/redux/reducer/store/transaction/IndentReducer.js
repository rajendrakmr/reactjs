 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from '../../../../utils/axios'
export const getPreDefData = createAsyncThunk(
    'indent/getPreDefData',
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
const indentSlice = createSlice({
    name: 'indent',
    initialState,
    reducers: {
        indentReset: (state) => {
            state.isLoading = false;
            state.error = null;
            state.message = '';
            state.success = false;
            
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getPreDefData.pending, (state) => {
                state.isLoading    = true;
                state.serError      = false;
                state.serMessage    = null;
            })
            .addCase(getPreDefData.fulfilled, (state, action) => {  
                state.result     = action.payload;
                state.isLoading  = false;
                state.serResponse= true;
                state.serError   = true; 
            })
            .addCase(getPreDefData.rejected, (state, action) => { 
                state.isLoading = false;
                state.serError  = true; 
                state.serMessage = action?.payload?.error || null;
            });
    },
});

export const { indentReset } = indentSlice.actions;

export default indentSlice.reducer;
