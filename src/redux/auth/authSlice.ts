import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  authData: any;
}

const initialState: AuthState = {
  authData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthDataRedux: (state, action) => {
      return {
        ...state,
        authData: action.payload,
      };
    },
  },
});

export const { setAuthDataRedux } = authSlice.actions;
export default authSlice.reducer;
