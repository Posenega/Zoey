// export default {
//   primaryColor: '#FFC300',
//   accentColor: '#2b2b2b',
//   techTextColors: '#65AEFF',
//   techBackgroundColor: '#D8EAFF',
//   scienceTextColor: '#52C55B',
//   scienceBackgroundColor: '#D4FFD7',
// };

export const lightColors = {
  primary: "#FFC300",
  text: "#2B2B2B",
  placeholder: "#999999",
  idle: "#C9C9C9",
  formBackground: "#EDEDED",
  background: "#F9F9F9",
  main: "#FFFFFF",
  inputBorder: "#2B2B2B",
  horizontalLine: "#D9D9D9",
};

export const darkColors = {
  primary: "#FFC300",
  text: "#FFFFFF",
  placeholder: "#999999",
  idle: "#505050",
  formBackground: "#3D3D3D",
  background: "#202020",
  main: "#131313",
  inputBorder: "#3D3D3D",
  horizontalLine: "#404040",
};

const themes = {
  light: { ...lightColors },
  dark: { ...darkColors },
};

export default themes;

export const getThemeColor = (color, theme = "light") => {
  const themeColor = themes[theme][color];
  const fallbackColor = themes.light[color];
  return themeColor || fallbackColor;
};
