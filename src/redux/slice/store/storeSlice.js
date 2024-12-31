import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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


export const getDepoSearch = createAsyncThunk(
  "getDepoSearch",
  async (body) => {
    try{
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
        throw new Error(errorData || "Failed to search depo");
      }
      const data = await response.json();
      return data;
    }
    catch (error) {
      throw error;
    }
  }

);

export const getDepoAddAction = createAsyncThunk(
  "getDepoAddAction",
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
        const errorData = await response.text();
        throw new Error(errorData || "Failed to add depo");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // You can handle errors here or just re-throw them
      throw error;
    }
  }
);

// export const getDepoAddAction = createAsyncThunk(
//   "getDepoAddAction",
//   async (body) => {
//     let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
//     let config = {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${body.token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body.dataInfo),
//     };

//     const response = await fetch(url, config);
//     const data = await response.json();
//     return data;
//   }
// );


export const getDepoEditAction = createAsyncThunk(
  "getDepoAddAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "PUT",
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



export const getTranSearch = createAsyncThunk(
  "getTranSearch",
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


export const getTranAddAction = createAsyncThunk(
  "getDepoAddAction",
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


export const getTranEditAction = createAsyncThunk(
  "getDepoAddAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "PUT",
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

export const getUnitAddAction = createAsyncThunk(
  "getDepoAddAction",
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


export const getUnitEditAction = createAsyncThunk(
  "getDepoAddAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "PUT",
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



export const getUnitSearch = createAsyncThunk(
  "getUnitSearch",
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


export const depoWiseGetCodeAction = createAsyncThunk(
  "depoWiseGetCodeAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "GET",
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

export const depoWiseGetUnitCodeAction = createAsyncThunk(
  "depoWiseGetUnitCodeAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${body.token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  }
);


export const addDepoWiseItemAction = createAsyncThunk(
  "addDepoWiseItemAction",
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


export const depoWiseSearchAction = createAsyncThunk(
  "depoWiseSearchAction",
  async ({ indicatorsPath, dataInfo, token, pageNumber = 0, pageSize = 10 }) => {
    const url = `${process.env.REACT_APP_API_DPL_URL}/${indicatorsPath}`;
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dataInfo, page: pageNumber, size: pageSize }),
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  }
);


// export const depoWiseSearchAction = createAsyncThunk(
//   'store/depoWiseSearchAction',
//   async ({ indicatorsPath, dataInfo, token, pageNumber = 0, pageSize = 10 }) => {
//     const response = await api.post(indicatorsPath, dataInfo, {
//       headers: { Authorization: `Bearer ${token}` },
//       params: { page: pageNumber, size: pageSize },
//     });
//     return response.data;
//   }
// );




export const getDepoWiseEditAction = createAsyncThunk(
  "getDepoWiseEditAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "PUT",
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


export const clearSuccessMessageItem = createAsyncThunk(
  "clearSuccessMessageSave",
  async () => {
    return null;
  }
);

export const clearErrorMessageItem = createAsyncThunk(
  "clearErrorMessageSave",
  async () => {
    return null;
  }
);


export const depoWiseJobSearchAction = createAsyncThunk(
  "depoWiseJobSearchAction",
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


export const depoWiseJobAddAction = createAsyncThunk(
  "depoWiseJobAddAction",
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

export const depoWiseJobEditAction = createAsyncThunk(
  "depoWiseJobEditAction",
  async (body) => {
    let url = `${process.env.REACT_APP_API_DPL_URL}/${body.indicatorsPath}`;
    let config = {
      method: "PUT",
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






const initialState = {
  getDepoSearchList: [],
  getTranSearchList: [],
  getUnitSearchList: [],
  getDepoCode: [],
  getUnitCode:[],
  getDepoWiseSearchList: [],
  getDepoJobSearchList: [],
  loading: false,
  error: null,
  successMessage: null
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    clearDepoSearchList(state) {
      state.getDepoSearchList = [];
    },
    clearTransSearchList(state) {
      state.getTranSearchList = [];
    },
    clearUnitSearchList(state) {
      state.getUnitSearchList = [];
    },
    clearDepoWiseSearchList(state) {
      state.getDepoWiseSearchList = [];
    },
    clearDepoJobSearchList(state) {
      state.getDepoJobSearchList = [];
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getDepoSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDepoSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.getDepoSearchList = action.payload;
      state.error = null;
    });
    builder.addCase(getDepoSearch.rejected, (state, action) => {
      state.loading = false;
      state.error =action.error.message;// Capture the error message
       
    });



    builder.addCase(getDepoAddAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDepoAddAction.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
      state.error = null;
    });
    builder.addCase(getDepoAddAction.rejected, (state, action) => {
      state.loading = false;
      state.error =action.error.message;// Capture the error message
      console.log(action); // Capture the error message
    });

    builder.addCase(clearErrorMessage.fulfilled, (state) => {
      state.error = null
    });
    
    builder.addCase(clearSuccessMessage.fulfilled, (state) => {
      state.successMessage = null; // Reset successPCMsfg state to null

    });

    builder.addCase(getTranSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTranSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.getTranSearchList = action.payload;
      state.error = null;
    });
    builder.addCase(getTranSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUnitSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUnitSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.getUnitSearchList = action.payload;
      state.error = null;
    });
    builder.addCase(getUnitSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(depoWiseGetCodeAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(depoWiseGetCodeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.getDepoCode = action.payload;
      state.error = null;
    });
    builder.addCase(depoWiseGetCodeAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(depoWiseGetUnitCodeAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(depoWiseGetUnitCodeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.getUnitCode = action.payload;
      state.error = null;
    });
    builder.addCase(depoWiseGetUnitCodeAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(depoWiseSearchAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(depoWiseSearchAction.fulfilled, (state, action) => {
      state.loading = false;
      state.getDepoWiseSearchList = action.payload;
      state.error = null;
    });
    builder.addCase(depoWiseSearchAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });


    builder.addCase(depoWiseJobSearchAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(depoWiseJobSearchAction.fulfilled, (state, action) => {
      state.loading = false;
      state.getDepoJobSearchList = action.payload;
      state.error = null;
    });
    builder.addCase(depoWiseJobSearchAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  },
});
export const { clearDepoSearchList,clearTransSearchList, clearUnitSearchList, clearDepoWiseSearchList, clearDepoJobSearchList } = storeSlice.actions;
export default storeSlice.reducer;

// In your redux/slice/store/storeSlice.js
// export const depoWiseSearchAction = createAsyncThunk(
//   'store/depoWiseSearchAction',
//   async ({ indicatorsPath, dataInfo, token, pageNumber = 0, pageSize = 10 }) => {
//     const response = await api.post(indicatorsPath, dataInfo, {
//       headers: { Authorization: `Bearer ${token}` },
//       params: { page: pageNumber, size: pageSize },
//     });
//     return response.data;
//   }
// );
