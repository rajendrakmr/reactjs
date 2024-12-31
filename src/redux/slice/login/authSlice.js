import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
    token:  null,
    isLoggedIn: false,
    error: null
  };


export const AdminLoginHandler = createAsyncThunk("adminLogin", async (body, { rejectWithValue }) => {
  const path = `${process.env.REACT_APP_API_DPL_URL}/${body.url}`;
  let config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${body.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body.logindata),
  };
  try {
    const response = await fetch(path, config);
    const data = await response.json();
    console.log(data,"login data==================================")

    if (!response.ok) {
      return rejectWithValue(data);
    }
    localStorage.setItem('adminLogin', JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const AuthSlice = createSlice({
  name: "AdminLogin",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logoutHandler: (state, action) => { 
      state.token = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminLoginHandler.pending, (state) => {
        state.isLoggedIn = true;
        console.log("pending state....");
      })
      .addCase(AdminLoginHandler.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(AdminLoginHandler.rejected, (state, action) => {
        state.isLoggedIn = false;
        // state.message = action.payload.message;
        state.error =action.error.message;// Capture the error message
      });
  },
});


export const { loginHandler, logoutHandler } = AuthSlice.actions;
export default AuthSlice.reducer;
