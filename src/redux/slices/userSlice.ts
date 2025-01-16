import axiosInstance from "@/helpers/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const response = await axiosInstance.get("/api/users/currentUser");
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const response = await axiosInstance.get("/api/users/logout");
  return response.data;
});

interface InitialState {
  currentUser: any;
  isUserDataLoading: boolean;
}

const user = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isUserDataLoading: false,
  },
  reducers: {
    setCurrentUser: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isUserDataLoading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isUserDataLoading = false;
      state.currentUser = action.payload.user;
    });

    builder.addCase(getCurrentUser.rejected, (state) => {
      state.isUserDataLoading = false;
    });

    // logout user
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isUserDataLoading = false;
      state.currentUser = null;
    });

    builder.addCase(logoutUser.rejected, (state) => {
      state.isUserDataLoading = false;
    });
  },
});

export const getUserData = (state: { user: InitialState }) => state.user;

export default user.reducer;
