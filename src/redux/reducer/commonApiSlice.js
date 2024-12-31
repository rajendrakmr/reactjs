import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from '../../utils/axios';
import { getCookie } from '../../utils/cookieService';

// Async thunk actions
// submir request POST method
export const submitPostData = createAsyncThunk(
    'indent/submitPostData',
    async ({ dataInfo, indicatorsPath,responseType=false }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.post(indicatorsPath, dataInfo,{
               ...(responseType && { responseType: 'blob' }),
            });
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const submitGetData = createAsyncThunk(
    'indent/submitGetData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.get(indicatorsPath, dataInfo);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
// submit request PUT method
export const submitPutData = createAsyncThunk(
    'indent/submitPutData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.put(indicatorsPath, dataInfo);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);



export const fetchGetPreData = createAsyncThunk(
    'cmnSlice/fetchGetPreData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.get(indicatorsPath, { params: dataInfo });  
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);




export const fetchPostPreData = createAsyncThunk(
    'cmnSlice/fetchPostPreData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.post(indicatorsPath, dataInfo);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

 

export const deletePostPreData = createAsyncThunk(
    'cmnSlice/deletePostPreData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {  
            const url = `${process.env.REACT_APP_API_DPL_URL}${indicatorsPath}`;
            const accessToken = getCookie('access_token'); 
            const response = await fetch(url, {
                method: 'DELETE',  
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${accessToken}`,
                }, 
                body: JSON.stringify(dataInfo), 
            }); 
            if (!response.ok) {
                const errorData = await response.json();  
                throw new Error(errorData.error || 'An error occurred');  
            } 
            const data = await response.json();  
            return data;  
        } catch (error) { 
            return rejectWithValue(error.message || 'An error occurred');  
        }
    }
);




export const postGetData = createAsyncThunk(
    'cmnSlice/postGetData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.post(indicatorsPath, dataInfo);  
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const postGetPreData = createAsyncThunk(
    'cmnSlice/postGetPreData',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.post(indicatorsPath, dataInfo);  
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Search actions
export const searchPostGetAction = createAsyncThunk(
    'cmnSlice/searchPostGetAction',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.post(indicatorsPath, dataInfo);  
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const searchGetAction = createAsyncThunk(
    'cmnSlice/searchGetGetAction',
    async ({ dataInfo, indicatorsPath }, { rejectWithValue }) => {
        try {   
            const { data } = await axios.get(indicatorsPath, { params: dataInfo });  
            return data;
        } catch (error) { 
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Initial state
const initialState = { 
    rb_menu_list: {},
    result: {},
    dataRecords: [],
    dataLoading: false,
    dataError: false,
    dataErrorMessage: "",
    isSubmit: false,
    isUpdating: false,
    error: null,
    success: false,
    message: '',
    seterrors: null,
    serMessage: null, 
    serPostError: false,
    resSuccess: false,
    serResponse: false
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
            // Handle searchGetAction
            .addCase(searchGetAction.pending, (state) => {  
                state.dataLoading = true;
                state.dataError = false;
                state.dataErrorMessage = '';
            })
            .addCase(searchGetAction.fulfilled, (state, action) => {  
                state.dataRecords = action.payload;
                state.dataLoading = false;
                state.dataError = false;
            })
            .addCase(searchGetAction.rejected, (state, action) => { 
                state.dataLoading = false;
                state.dataError = true; 
                state.dataErrorMessage = action.payload || 'An error occurred';
            })

            // Handle searchPostGetAction
            .addCase(searchPostGetAction.pending, (state) => {  
                state.dataLoading = true;
                state.dataError = false;
                state.dataErrorMessage = '';
            })
            .addCase(searchPostGetAction.fulfilled, (state, action) => {  
                state.dataRecords = action.payload;
                state.dataLoading = false;
                state.dataError   = false;
            })
            .addCase(searchPostGetAction.rejected, (state, action) => { 
                state.dataLoading = false;
                state.dataError = true; 
                state.dataErrorMessage = action.payload || 'An error occurred';
            })

            // Handle submitPostData
            .addCase(submitPostData.pending, (state) => {
                state.isSubmit = true;
                state.serPostError = false;
                state.serMessage = null;
            })
            .addCase(submitPostData.fulfilled, (state, action) => {  
                state.result = action.payload;
                state.isSubmit = false;
                state.serResponse = true;
                state.serPostError = false; 
            })
            .addCase(submitPostData.rejected, (state, action) => { 
                state.isSubmit = false;
                state.serPostError = true; 
                state.serMessage = action.payload || 'An error occurred';
            })

            .addCase(submitPutData.pending, (state) => {
                state.isSubmit = true; 
            })
            .addCase(submitPutData.fulfilled, (state, action) => {  
                state.isSubmit = false; 
            })
            .addCase(submitPutData.rejected, (state, action) => { 
                state.isSubmit = false; 
            })

            // Handle fetchGetPreData
            .addCase(fetchGetPreData.pending, (state) => {  
                // state.dataLoading = true;
                state.dataError = false;
                state.dataErrorMessage = '';
            })
            .addCase(fetchGetPreData.fulfilled, (state, action) => {  
                state.dataRecords = action.payload;
                state.dataLoading = false;
                state.dataError = false;
            })
            .addCase(fetchGetPreData.rejected, (state, action) => { 
                state.dataLoading = false;
                state.dataError = true; 
                state.dataErrorMessage = action.payload || 'An error occurred';
            })

            // Handle postGetData
            .addCase(postGetData.pending, (state) => {
                state.dataLoading = true;
                state.dataError = false;
                state.dataErrorMessage = '';
            })
            .addCase(postGetData.fulfilled, (state, action) => {  
                state.dataRecords = action.payload;
                state.dataLoading = false;
                state.dataError = false;
            })
            .addCase(postGetData.rejected, (state, action) => { 
                state.dataLoading = false;
                state.dataError = true; 
                state.dataErrorMessage = action.payload || 'An error occurred';
            });
    },
});

export const { onSubReset } = apiSlice.actions;
export default apiSlice.reducer;
