import { createSlice } from "@reduxjs/toolkit";
import { lightTheme } from "../../theme/light";
import { DefaultTheme } from "styled-components";

interface ThemeState {
  theme: DefaultTheme;
}

const initialState: ThemeState = {
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
