import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./themeSlice";
import { RootState } from "../store";
import { lightTheme } from "../../theme/light";
import { darkTheme } from "../../theme/dark";

export const useThemeRedux = () => {
  const store = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const currentThemeMode = store.theme?.mode;

  const isDarkMode = currentThemeMode === "dark";
  const isLightMode = currentThemeMode === "light";

  const currentTheme = isLightMode ? lightTheme : darkTheme;

  const switchTheme = () => {
    if (currentThemeMode === "light") {
      dispatch(setTheme(darkTheme));
      return;
    }

    dispatch(setTheme(lightTheme));
  };

  return {
    switchTheme,
    store,
    currentTheme,
    currentThemeMode,
    isDarkMode,
    isLightMode,
  };
};
