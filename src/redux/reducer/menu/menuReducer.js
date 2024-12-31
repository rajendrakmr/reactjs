import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios'

export const getMenu = createAsyncThunk(
    'user/getMenu',
    async (payload, { rejectWithValue }) => {
        try {   
            const { data } = await axios.post('/user/menu', payload);
            return data;
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
);

 
// Initial state
const initialState = {  
    menuList: [],
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
const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: { 
        clearMenu: (state, action) => { 
            state.message = '';
            state.success = false; 
            state.seterrors=null;
            state.serMessage=null;
            state.isLoading=false;
            state.serError=false;
            state.serResponse=false;
          },
    },
    extraReducers: (builder) => {
        builder  
            .addCase(getMenu.pending, (state) => {
                state.isLoading    = true;
                state.serError     = null;
                state.serMessage   = null;
            })
            .addCase(getMenu.fulfilled, (state, action) => { 
                state.isLoading  = false;
                state.data       = action.payload;
                state.serResponse= false 
                state.serError   = true;
                state.menuList   = action.payload;
                
            })
            .addCase(getMenu.rejected, (state, action) => { 
                state.isLoading  = false;
                state.serError   = true;
                state.serMessage = action.payload.error || null;;
            }) 
    },
});

export const { clearMenu } = menuSlice.actions;
export default menuSlice.reducer;
