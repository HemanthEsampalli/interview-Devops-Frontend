import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= FETCH ACTIVE SALARY ================= */

export const fetchEmployeeSalary = createAsyncThunk(
  "salary/fetchEmployeeSalary",
  async (employeeId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/hr/active/${employeeId}`
      );
      return res.data.data;
    } catch (err) {
      if (err.response?.status === 404) {
        return null; // salary not added yet
      }
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch salary"
      );
    }
  }
);

/* ================= ADD SALARY ================= */

export const addEmployeeSalary = createAsyncThunk(
  "salary/addEmployeeSalary",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/hr/add/salary",
        payload
      );
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add salary"
      );
    }
  }
);

/* ================= UPDATE SALARY ================= */

export const updateEmployeeSalary = createAsyncThunk(
  "salary/updateEmployeeSalary",
  async ({ salaryId, data }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `/hr/updateSal/${salaryId}`,
        data
      );
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update salary"
      );
    }
  }
);

const salarySlice = createSlice({
  name: "salary",
  initialState: {
    loading: false,
    error: null,
    salary: null,
  },
  reducers: {
    clearSalaryState: (state) => {
      state.salary = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchEmployeeSalary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.salary = action.payload;
      })
      .addCase(fetchEmployeeSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addEmployeeSalary.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployeeSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.salary = action.payload;
      })
      .addCase(addEmployeeSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateEmployeeSalary.fulfilled, (state, action) => {
        state.salary = action.payload;
      });
  },
});

export const { clearSalaryState } = salarySlice.actions;
export default salarySlice.reducer;
