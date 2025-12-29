// src/store/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= ADD PROJECT ================= */

export const addProject = createAsyncThunk(
  "project/addProject",
  async ({ data, files }, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append(
        "data",
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        })
      );

      formData.append("quotation", files.quotation);
      formData.append("requirement", files.requirement);
      formData.append("contract", files.contract);

      const res = await axiosInstance.post(
        "/admin/project/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add project"
      );
    }
  }
);

/* ================= CLIENT PROJECT LIST ================= */

export const fetchClientProjects = createAsyncThunk(
  "project/fetchClientProjects",
  async (clientId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/admin/projects/client/${clientId}`
      );
      return res.data.data; // ✅ list<ProjectResponseDto>
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

/* ================= SLICE ================= */

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    success: false,          // only for add/update
    error: null,

    clientProjects: [],      // client-specific list
    selectedProject: null,   // for details page
  },

  reducers: {
    clearProjectStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- ADD PROJECT -------- */
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- CLIENT PROJECT LIST -------- */
      .addCase(fetchClientProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProjects = action.payload;
      })
      .addCase(fetchClientProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ================= EXPORTS ================= */

export const {
  clearProjectStatus,
  setSelectedProject,
} = projectSlice.actions;

export default projectSlice.reducer;
