import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../interface";
import { authApi } from "../../Api";

export const emptyUserState: userModel = {
  fullName: "",
  id: "",
  email: "",
  role: "",
};
export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setLoggedUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
