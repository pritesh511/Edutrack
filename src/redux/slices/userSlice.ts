import axiosInstance from "@/helpers/axios/axiosInstance";
import { CurrentUser } from "@/utils/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// export const getCurrentUser = createAsyncThunk(
//   "user/getCurrentUser",
//   async () => {
//     const response = await axiosInstance.get("/api/users/currentUser");
//     return response.data;
//   }
// );

// export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
//   const response = await axiosInstance.get("/api/users/logout");
//   return response.data;
// });

interface InitialState {
  currentUser: CurrentUser | null;
}

const user = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
    setEmptyCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getCurrentUser.pending, (state) => {
  //     state.isUserDataLoading = true;
  //   });

  //   builder.addCase(getCurrentUser.fulfilled, (state, action) => {
  //     state.isUserDataLoading = false;
  //     state.currentUser = action.payload.user;
  //   });

  //   builder.addCase(getCurrentUser.rejected, (state) => {
  //     state.isUserDataLoading = false;
  //   });

  //   // logout user
  //   builder.addCase(logoutUser.fulfilled, (state, action) => {
  //     state.isUserDataLoading = false;
  //     state.currentUser = null;
  //   });

  //   builder.addCase(logoutUser.rejected, (state) => {
  //     state.isUserDataLoading = false;
  //   });
  // },
});

export const { setCurrentUser, setEmptyCurrentUser } = user.actions;

export const getUserData = (state: { user: InitialState }) => state.user;

export default user.reducer;
