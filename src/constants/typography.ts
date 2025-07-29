import { Platform } from "react-native";

// Font weight values
export const fontWeights = {
  light: "300" as const,
  regular: "400" as const,
  medium: "500" as const,
  semiBold: "600" as const,
  bold: "700" as const,
  extraBold: "800" as const,
};

// Font size values
export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  "5xl": 36,
  "6xl": 48,
} as const;

// Line height values
export const lineHeights = {
  xs: 14,
  sm: 16,
  base: 20,
  md: 22,
  lg: 24,
  xl: 26,
  "2xl": 30,
  "3xl": 34,
  "4xl": 38,
  "5xl": 42,
  "6xl": 56,
} as const;

// Platform-based font family
export const fontFamily = Platform.select({
  ios: {
    regular: "System",
    medium: "System",
    bold: "System",
  },
  android: {
    regular: "Roboto",
    medium: "Roboto_medium",
    bold: "Roboto_bold",
  },
  default: {
    regular: "System",
    medium: "System",
    bold: "System",
  },
});

// Pre-defined text styles
export const textStyles = {
  // Headings
  h1: {
    fontSize: fontSizes["4xl"],
    lineHeight: lineHeights["4xl"],
    fontWeight: fontWeights.bold,
    fontFamily: fontFamily?.bold,
  },
  h2: {
    fontSize: fontSizes["3xl"],
    lineHeight: lineHeights["3xl"],
    fontWeight: fontWeights.bold,
    fontFamily: fontFamily?.bold,
  },
  h3: {
    fontSize: fontSizes["2xl"],
    lineHeight: lineHeights["2xl"],
    fontWeight: fontWeights.semiBold,
    fontFamily: fontFamily?.medium,
  },
  h4: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontFamily?.medium,
  },
  h5: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamily?.medium,
  },
  h6: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamily?.medium,
  },

  // Body text
  body1: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamily?.regular,
  },
  body2: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamily?.regular,
  },

  // Button text
  button: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontFamily?.medium,
  },

  // Caption
  caption: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamily?.regular,
  },

  // Overline
  overline: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamily?.medium,
    textTransform: "uppercase" as const,
    letterSpacing: 1.5,
  },
} as const;

// Type definitions
export type FontWeight = keyof typeof fontWeights;
export type FontSize = keyof typeof fontSizes;
export type LineHeight = keyof typeof lineHeights;
export type TextStyle = keyof typeof textStyles;
