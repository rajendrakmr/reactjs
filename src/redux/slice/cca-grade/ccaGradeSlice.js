import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const changePasswordAction = createAsyncThunk(
  "changePasswordAction",
  async (body) => {
    try {
      let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
      let config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${body.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body.dataInfo),
      };
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.text(); // Get error message as text
        throw new Error(errorData || "Failed to change password");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);


export const clearSuccessMessage = createAsyncThunk(
  "clearSuccessMessage",
  async () => {
    return null;
  }
);


export const clearErrorMessage = createAsyncThunk(
  "clearErrorMessage",
  async () => {
    return null;
  }
);



export const getAllMenuList = createAsyncThunk(
  "getAllIndicator",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    // const url = `http://localhost:8080/${body.indicatorsPath}`;
    let config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${body.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body.dataInfo),
    };
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  }
);


export const getAllUserRoleLists = createAsyncThunk(
  "getAllUserRoleLists",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${body.token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body.dataInfo),
    };
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  }
);


export const getDepoAction = createAsyncThunk(
  "getDepoMaster",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${body.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body.dataInfo),
    };
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  }
);



export const getRefreshDatabaseCache= createAsyncThunk(
  "getRefreshDatabaseCache",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${body.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body.dataInfo),
    };
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  }
);

export const cacheClearSuccessMessage = createAsyncThunk(
  "cacheClearSuccessMessage",
  async () => {
    return null;
  }
);


export const roleBaseMenuAction = createAsyncThunk(
  "roleBaseMenuAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${body.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body.dataInfo),
    };
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  }
);

export const saveCreateUserAction = createAsyncThunk(
  "saveCreateUserAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${body.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body.dataInfo),
    };
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  }
);

export const clearSuccessMessageSave = createAsyncThunk(
  "clearSuccessMessageSave",
  async () => {
    return null;
  }
);

export const clearErrorMessageSave = createAsyncThunk(
  "clearErrorMessageSave",
  async () => {
    return null;
  }
);


export const employeeIdVlidationAction = createAsyncThunk(
  "employeeIdVlidationAction",
  async (body, { rejectWithValue }) => {
    try {
      let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
      let config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${body.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body.dataInfo),
      };
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.text(); // Get error message as text
        throw new Error(errorData || "Failed to validate employee ID");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to validate employee ID");
    }
  }
);


export const clearSuccessVali = createAsyncThunk(
  "clearSuccessVali",
  async () => {
    return null;
  }
);

export const clearErrorVali = createAsyncThunk(
  "clearErrorVali",
  async () => {
    return null;
  }
);

// Initial state for the slice
const initialState = {
  menuList: [],
  getUserRoleList: [],
  getRoleBaseMenuList:[],
  getDepoData:[],
  refreshDatabase:"",
  loading: false,
  error:null,
  successPCMsfg:"",
  saveSuccessMessage:null,
  validation:""
};

// Create a slice for managing menu data
const ccaGradeSlice = createSlice({
  name: "ccaGradeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state
    builder.addCase(getAllMenuList.pending, (state) => {
      state.loading = true;
    });

    // Handle fulfilled state
    builder.addCase(getAllMenuList.fulfilled, (state, action) => {
      state.loading = false;
      state.menuList = action.payload; // Use action.payload directly
      state.error = null;
    });

    // Handle rejected state
    builder.addCase(getAllMenuList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Capture the error message
    });


    builder.addCase(getAllUserRoleLists.pending, (state) => {
      state.loading = true;
    });

    // Handle fulfilled state
    builder.addCase(getAllUserRoleLists.fulfilled, (state, action) => {
      state.loading = false;
      state.getUserRoleList = action.payload; // Use action.payload directly
      state.error = null;
    });

    // Handle rejected state
    builder.addCase(getAllUserRoleLists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Capture the error message
    });


    
    builder.addCase(getDepoAction.pending, (state) => {
      state.loading = true;
    });

    // Handle fulfilled state
    builder.addCase(getDepoAction.fulfilled, (state, action) => {
      state.loading = false;
      state.getUserRoleList = action.payload; // Use action.payload directly
      state.error = null;
    });

    // Handle rejected state
    builder.addCase(getDepoAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Capture the error message
    });


    builder.addCase(getRefreshDatabaseCache.pending, (state) => {
      state.loading = true;
    });

    // Handle fulfilled state
    builder.addCase(getRefreshDatabaseCache.fulfilled, (state, action) => {
      state.loading = false;
      state.refreshDatabase = action.payload; // Use action.payload directly
      state.error = null;
    });

    // Handle rejected state
    builder.addCase(getRefreshDatabaseCache.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Capture the error message
    });

 
    builder.addCase(cacheClearSuccessMessage.fulfilled, (state) => {
      state.refreshDatabase = null;
    });
   
    builder.addCase(changePasswordAction.pending, (state) => {
      state.loading = true;
    });

    // Handle fulfilled state
    builder.addCase(changePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.successPCMsfg = action.payload; // Use action.payload directly
    });

    // Handle rejected state
    builder.addCase(changePasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.error =action.error.message;// Capture the error message 
    });

    builder.addCase(clearErrorMessage.fulfilled, (state) => {
     state.error=null
    });


    builder.addCase(clearSuccessMessage.fulfilled, (state) => {
      state.successPCMsfg = null; // Reset successPCMsfg state to null
      
    });

    builder.addCase(roleBaseMenuAction.pending, (state) => {
      state.loading = true;
    });

    // Handle fulfilled state
    builder.addCase(roleBaseMenuAction.fulfilled, (state, action) => {
      state.loading = false;
      state.getRoleBaseMenuList = action.payload; // Use action.payload directly
      state.error = null;
    });

    // Handle rejected state
    builder.addCase(roleBaseMenuAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Capture the error message
    });

    builder.addCase(saveCreateUserAction.pending, (state) => {
      state.loading = true;
    });

    // Handle fulfilled state
    builder.addCase(saveCreateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.saveSuccessMessage = action.payload; // Use action.payload directly
    });

    // Handle rejected state
    builder.addCase(saveCreateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error =action.error.message;// Capture the error message
      console.log(action.error.message, "save user==============>"); // Capture the error message
    });

    builder.addCase(clearErrorMessageSave.fulfilled, (state) => {
     state.error=null
    });

    builder.addCase(clearSuccessMessageSave.fulfilled, (state) => {
      state.saveSuccessMessage = null; // Reset successPCMsfg state to null 
    });


    builder.addCase(employeeIdVlidationAction.pending, (state) => {
      state.loading = true;
    });

    // Handle fulfilled state
    builder.addCase(employeeIdVlidationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.validation = action.payload; // Use action.payload directly
    });

    // Handle rejected state
    builder.addCase(employeeIdVlidationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.error.message} Invalid Employee Code`;

      console.log(action ,'validation action============')
    });

    builder.addCase(clearErrorVali.fulfilled, (state) => {
     state.error=null
    });

    builder.addCase(clearSuccessVali.fulfilled, (state) => {
      state.validation = null; // Reset successPCMsfg state to null
      
    });

  },

  
});

export default ccaGradeSlice.reducer;
