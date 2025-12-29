import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= FETCH BANK ================= */

export const fetchEmployeeBank = createAsyncThunk(
  "bank/fetchEmployeeBank",
  async (employeeId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/admin/bank/employee/${employeeId}`
      );
      return res.data.data;
    } catch (err) {
      if (err.response?.status === 404) {
        return null;
      }
      return thunkAPI.rejectWithValue("Failed to fetch bank details");
    }
  }
);

/* ================= ADD / UPDATE BANK ================= */

export const saveEmployeeBank = createAsyncThunk(
  "bank/saveEmployeeBank",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/admin/bank/add", payload);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to save bank details");
    }
  }
);

const bankSlice = createSlice({
  name: "bank",
  initialState: {
    loading: false,
    error: null,
    bank: null,
  },
  reducers: {
    clearBankState: (state) => {
      state.bank = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeBank.fulfilled, (state, action) => {
        state.loading = false;
        state.bank = action.payload;
      })
      .addCase(fetchEmployeeBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveEmployeeBank.fulfilled, (state, action) => {
        state.bank = action.payload;
      });
  },
});

export const { clearBankState } = bankSlice.actions;
export default bankSlice.reducer;
