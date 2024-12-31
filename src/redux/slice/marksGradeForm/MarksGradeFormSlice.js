import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  class: null,
  academinYear: null,
  section : null,
  subject : null,
  stream:null,
  allFormData : null,
};

export const academinYearHandler = createAsyncThunk("academinYearHandler", async (body) => {
 
  let path = `${process.env.TFFS_PUBLIC_URL}/${body.academicUrl}`;
  let config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${body.token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(path, config);
  const data = await response.json();
  return data;
});

export const classHandler = createAsyncThunk("classHandler", async (body) => {
  let path = `${process.env.TFFS_PUBLIC_URL}/${body.classUrl}`;
  let config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${body.token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(path, config);
  const data = await response.json();
  return data;
});

export const sectionHandler = createAsyncThunk("sectionHandler", async (body) => {
  let path = `${process.env.TFFS_PUBLIC_URL}/${body.sectionUrl}`;
  let config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${body.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body.classData),
  };
  const response = await fetch(path, config);
  const data = await response.json();
  return data;
});

export const subjectHandler = createAsyncThunk("subjectHandler", async (body) => {
  let path = `${process.env.TFFS_PUBLIC_URL}/${body.subjectUrl}`;
  let config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${body.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body.classData),
  };
  const response = await fetch(path, config);
  const data = await response.json();
  return data;
});

export const streamHandler = createAsyncThunk("streamHandler", async (body) => {
  let path = `${process.env.TFFS_PUBLIC_URL}/${body.streamUrl}`;
  let config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${body.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body.classData),
  };
  const response = await fetch(path, config);
  const data = await response.json();
  return data;
});




const MarksGradeFormSlice = createSlice({
  name: "marksGradeForm",
  initialState,
  reducers:{
    formDataHandler: (state, action)=>{
      state.allFormData = action.payload;
      localStorage.setItem("allFormData",JSON.stringify(action.payload));
    }
  },

  extraReducers: (builder) => {
    builder
      // For Class
      .addCase(academinYearHandler.pending, (state) => {
         
      })
      .addCase(academinYearHandler.fulfilled, (state, action) => {
        state.academinYear = action.payload.data;
      })
      .addCase(academinYearHandler.rejected, (state) => { 
      })

      // For Academic Year
      .addCase(classHandler.pending, (state) => {
        // console.log("pending state classs....");
      })
      .addCase(classHandler.fulfilled, (state, action) => {
        state.class = action.payload.data;
      })
      .addCase(classHandler.rejected, (state) => {
        // console.log("rejected message class--->");
      })

      //For Section
      .addCase(sectionHandler.pending, (state) => {
        // console.log("pending state section....");
      })
      .addCase(sectionHandler.fulfilled, (state, action) => {
        state.section = action.payload.data;
      })
      .addCase(sectionHandler.rejected, (state) => {
        // console.log("rejected message section--->");
      })

      // For Subject 
      .addCase(subjectHandler.pending, (state) => {
        // console.log("pending state section....");
      })
      .addCase(subjectHandler.fulfilled, (state, action) => {
        state.subject = action.payload.data;
      })
      .addCase(subjectHandler.rejected, (state) => {
        // console.log("rejected message section--->");
      })

      .addCase(streamHandler.fulfilled, (state,action)=>{
        state.stream = action.payload.data;
      })
  },
});

export const { formDataHandler} = MarksGradeFormSlice.actions;
export default MarksGradeFormSlice.reducer;