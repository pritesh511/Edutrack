import { CurrentUser } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setCurrentUser, setEmptyCurrentUser } = user.actions;

export const getUserData = (state: { user: InitialState }) => state.user;

export default user.reducer;
