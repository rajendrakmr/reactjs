 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from '../../../utils/axios'
 
export const getSearchAction = createAsyncThunk(
    'user/getSearchAction',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {  // Destructure payload
        try {
            const { data } = await axios.post(indicatorsPath, dataInfo);  // Use indecatorPath
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

 
// Initial state
const initialState = { 
    data_search_list:[],
    rb_menu_list: {},
    isSearchLoading: false,
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
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSearchLoading = false;
            state.error = null;
            state.message = '';
            state.success = false;
            
        },
    },
    extraReducers: (builder) => {
        builder 
            .addCase(getSearchAction.pending, (state) => {
                state.isSearchLoading     = true;
                state.serError      = null;
                state.serMessage    = null;
            })
            .addCase(getSearchAction.fulfilled, (state, action) => { 
                state.isSearchLoading   = false;
                state.data_search_list= action.payload;
                state.serResponse = false  
            })
            .addCase(getSearchAction.rejected, (state, action) => {  
                state.isSearchLoading  = false;
                state.serError   = true;
                // state.serMessage = action.payload.error || null;;
            });
    },
});

export const { indentReset } = searchSlice.actions;

export default searchSlice.reducer;
