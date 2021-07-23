export const THEME_SET = "THEME_SET";
export const FETCH_THEME = "FETCH_THEME";

export const setTheme = (theme) => ({
  type: THEME_SET,
  theme,
});

export const fetchTheme = () => ({
  type: FETCH_THEME,
});
