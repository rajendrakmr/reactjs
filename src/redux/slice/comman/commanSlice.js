import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postGetPreData } from "../../reducer/commonApiSlice";
 



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


export const postSearchWithPagination = createAsyncThunk(
    "postSearchWithPagination",
    async ({ endPoint, dataInfo, token, pageNumber = 0, pageSize = 10 }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo, pageNumber, pageSize }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);

export const getAllDataAction = createAsyncThunk(
    "getAllDataAction",
    async (body) => {
        try {
            let url = `${process.env.REACT_APP_API_DPL_URL}/${body.endPoint}`;
            let config = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${body.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body.dataInfo),
            };
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.text(); // Get error message as text
                throw new Error(errorData || "Failed ");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            throw error;
        }
    }
);

export const getDataWithoutBody = createAsyncThunk(
    "getDataWithoutBody",
    async (body) => {
        try {
            let url = `${process.env.REACT_APP_API_DPL_URL}/${body.endPoint}`;
            
            let config = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${body.token}`,
                    "Content-Type": "application/json",
                },
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




export const postAllDataAction = createAsyncThunk(
    "postAllDataAction",
    async (body) => {
        try {
            let url = `${process.env.REACT_APP_API_DPL_URL}/${body.endPoint}`;
          
            let config = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${body.token}`,
                    "Content-Type": "application/json",
                },
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


export const postAllDataBodyAction = createAsyncThunk(
    "postAllDataBodyAction",
    async (body) => {
        try {
            let url = `${process.env.REACT_APP_API_DPL_URL}/${body.endPoint}`;
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


export const postAllDataBodySecondAction = createAsyncThunk(
    "postAllDataBodySecondAction",
    async ({ endPoint, dataInfo, token, pageNumber = 0, pageSize = 100 }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo, pageNumber, pageSize }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);


export const postAllDataBodyThirdAction = createAsyncThunk(
    "postAllDataBodyThirdAction",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);



export const postAllDataBodyForthAction = createAsyncThunk(
    "postAllDataBodyForthAction",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);


export const postAllDataBodyFiveAction = createAsyncThunk(
    "postAllDataBodyFiveAction",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);

export const resetGetPostBody4Data = createAction('reset/getPostBody4Data');


export const postAllDataBodySixAction = createAsyncThunk(
    "postAllDataBodySixAction",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);


export const postAllDataBody7Action = createAsyncThunk(
    "postAllDataBody7Action",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);


export const postAllDataBody8Action = createAsyncThunk(
    "postAllDataBody8Action",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);


export const postAllDataBody9Action = createAsyncThunk(
    "postAllDataBody9Action",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);


export const postAllDataBody = createAsyncThunk(
    "postAllDataBody",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dataInfo }),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }
);


export const getAddAction = createAsyncThunk(
    "getAddAction",
    async (body) => {
        try {
            let url = `${process.env.REACT_APP_API_DPL_URL}/${body.endPoint}`;
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

export const putUpdateAction = createAsyncThunk(
    "putUpdateAction",
    async (body) => {
        try {
            let url = `${process.env.REACT_APP_API_DPL_URL}/${body.endPoint}`;
            let config = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${body.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body.dataInfo),
            };
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.text(); // Get error message as text
                throw new Error(errorData || "Failed ");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            throw error;
        }
    }
);


export const deleteAction = createAsyncThunk(
    "deleteAction",
    async (body) => {
        try {
            let url = `${process.env.REACT_APP_API_DPL_URL}/${body.endPoint}`;
            let config = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${body.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body.dataInfo),
            };
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.text(); // Get error message as text
                throw new Error(errorData || "Failed ");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            throw error;
        }
    }
);

export const reportGenerateAction = createAsyncThunk(
    "reportGenerateAction",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataInfo),
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.blob(); // Return Blob instead of JSON
    }
);


export const getReportListing = createAsyncThunk(
    "getReportListing",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: dataInfo
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Assuming you're expecting JSON data
        const data = await response.json(); // Change this to .blob() if expecting a file
        return data;  // Return the parsed data
    }
);

export const getReportListing1 = createAsyncThunk(
    "getReportListing1",
    async ({ endPoint, dataInfo, token }) => {
        const url = `${process.env.REACT_APP_API_DPL_URL}/${endPoint}`;
        const config = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: dataInfo
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Assuming you're expecting JSON data
        const data = await response.json(); // Change this to .blob() if expecting a file
        return data;  // Return the parsed data
    }
);


// get depo Code for report
export const GetReportItemCode = async (dispatch, setOptions, payload ={itemCode:"",depoCode: "",pageNumber:1,pageSize:2 }) => {
    const action = await dispatch(postGetPreData({ dataInfo: payload, indicatorsPath: 'sis/requisition/get/item/master-list' })); 
    
    if (postGetPreData.fulfilled.match(action) && action?.payload?.success) { 
        if (action.payload.success.length > 0) {
            const newUpted =  action.payload.success.map((item) => ({
                value: item?.itemCode,
                label: `${item?.itemCode}-${item?.itemDescription}`, 
            })) 
            setOptions((preUpt)=>[...preUpt,...newUpted]); 
        }
    }
};


const initialState = {
    getData: [],
    getWithoutBody :[],
    getPostData: [],
    getPostBodyData: [],
    postAllData: [],
    getPostBodySecondData: [],
    getPostBodyThirdData: [],
    getPostBody4Data: [],
    getPostBody5Data: [],
    getPostBody6Data: [],
    getPostBody7Data: [],
    getPostBody9Data: [],
    getSearchPagination: [],
    getReport:[],
    getReport1:[],
    loading: false,
    error: null,
    successMessage: null,
    update: null,
    generate:null
};

const commanSlice = createSlice({
    name: "comman",
    initialState,
    reducers: {
        clearIndSearchList(state) {
            state.getPostBodyData = [];
        },
    },
    extraReducers: (builder) => {

        builder.addCase(postSearchWithPagination.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postSearchWithPagination.fulfilled, (state, action) => {
            state.loading = false;
            state.getSearchPagination = action.payload;
            state.error = null;
        });
        builder.addCase(postSearchWithPagination.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
          
        });

        builder.addCase(getAllDataAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllDataAction.fulfilled, (state, action) => {
            state.loading = false;
            state.getData = action.payload;
            state.error = null;
        });
        builder.addCase(getAllDataAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
           
        });

        builder.addCase(getDataWithoutBody.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDataWithoutBody.fulfilled, (state, action) => {
            state.loading = false;
            state.getWithoutBody = action.payload;
            state.error = null;
        });
        builder.addCase(getDataWithoutBody.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });

        builder.addCase(postAllDataAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataAction.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostData = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });

        builder.addCase(postAllDataBodyAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBodyAction.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBodyData = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBodyAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });

        builder.addCase(postAllDataBodySecondAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBodySecondAction.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBodySecondData = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBodySecondAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });

        builder.addCase(postAllDataBodyThirdAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBodyThirdAction.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBodyThirdData = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBodyThirdAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });


        builder.addCase(postAllDataBodyForthAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBodyForthAction.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBody4Data = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBodyForthAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });
        builder.addCase(resetGetPostBody4Data, (state) => {
            state.getPostBody4Data = []; // Reset the state to empty
        });



        builder.addCase(postAllDataBodyFiveAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBodyFiveAction.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBody5Data = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBodyFiveAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });



        builder.addCase(postAllDataBodySixAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBodySixAction.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBody6Data = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBodySixAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });


        builder.addCase(postAllDataBody7Action.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBody7Action.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBody7Data = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBody7Action.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });


        builder.addCase(postAllDataBody8Action.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBody8Action.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBody8Data = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBody8Action.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });



        builder.addCase(postAllDataBody9Action.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBody9Action.fulfilled, (state, action) => {
            state.loading = false;
            state.getPostBody9Data = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBody9Action.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });


        builder.addCase(getAddAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAddAction.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload;
            state.error = null;
        });
        builder.addCase(getAddAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });

        builder.addCase(postAllDataBody.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAllDataBody.fulfilled, (state, action) => {
            state.loading = false;
            state.postAllData = action.payload;
            state.error = null;
        });
        builder.addCase(postAllDataBody.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });


        builder.addCase(clearErrorMessage.fulfilled, (state) => {
            state.error = null
        });

        builder.addCase(clearSuccessMessage.fulfilled, (state) => {
            state.successMessage = null; // Reset successPCMsfg state to null

        });


        builder.addCase(putUpdateAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(putUpdateAction.fulfilled, (state, action) => {
            state.loading = false;
            state.update = action.payload;
            state.error = null;
        });
        builder.addCase(putUpdateAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });


        
        builder.addCase(getReportListing.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getReportListing.fulfilled, (state, action) => {
            state.loading = false;
            state.getReport = action.payload;
            state.error = null;
        });
        builder.addCase(getReportListing.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });


        builder.addCase(getReportListing1.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getReportListing1.fulfilled, (state, action) => {
            state.loading = false;
            state.getReport1 = action.payload;
            state.error = null;
        });
        builder.addCase(getReportListing1.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;// Capture the error message
             
        });

       

    },
});

export const { clearIndSearchList } = commanSlice.actions;
export default commanSlice.reducer;

