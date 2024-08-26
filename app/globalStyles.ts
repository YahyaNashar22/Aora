import { StyleSheet } from "react-native";

const colors = {
  primary: "#161622",
  secondary: {
    DEFAULT: "#FF9C01",
    100: "#FF9001",
    200: "#FF8E01",
  },
  black: {
    DEFAULT: "#000",
    100: "#1E1E2D",
    200: "#232533",
  },
  gray: {
    100: "#CDCDE0",
  },
};

const fontFamily = {
  pthin: "Poppins-Thin",
  pextralight: "Poppins-ExtraLight",
  plight: "Poppins-Light",
  pregular: "Poppins-Regular",
  pmedium: "Poppins-Medium",
  psemibold: "Poppins-SemiBold",
  pbold: "Poppins-Bold",
  pextrabold: "Poppins-ExtraBold",
  pblack: "Poppins-Black",
};

const globalStyles = StyleSheet.create({
  // Colors
  primary: { color: colors.primary },
  secondary: { color: colors.secondary.DEFAULT },
  secondary100: { color: colors.secondary[100] },
  secondary200: { color: colors.secondary[200] },
  black: { color: colors.black.DEFAULT },
  black100: { color: colors.black[100] },
  black200: { color: colors.black[200] },
  gray100: { color: colors.gray[100] },

  // Background Colors
  bgPrimary: { backgroundColor: colors.primary },
  bgSecondary: { backgroundColor: colors.secondary.DEFAULT },
  bgSecondary100: { backgroundColor: colors.secondary[100] },
  bgSecondary200: { backgroundColor: colors.secondary[200] },
  bgBlack: { backgroundColor: colors.black.DEFAULT },
  bgBlack100: { backgroundColor: colors.black[100] },
  bgBlack200: { backgroundColor: colors.black[200] },
  bgGray100: { backgroundColor: colors.gray[100] },

  // Fonts
  pthin: { fontFamily: fontFamily.pthin },
  pextralight: { fontFamily: fontFamily.pextralight },
  plight: { fontFamily: fontFamily.plight },
  pregular: { fontFamily: fontFamily.pregular },
  pmedium: { fontFamily: fontFamily.pmedium },
  psemibold: { fontFamily: fontFamily.psemibold },
  pbold: { fontFamily: fontFamily.pbold },
  pextrabold: { fontFamily: fontFamily.pextrabold },
  pblack: { fontFamily: fontFamily.pblack },

  // layout
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { globalStyles, colors, fontFamily };
