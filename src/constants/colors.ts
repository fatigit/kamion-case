// main color palette
export const colors = {
  // Primary Colors
  primary: "#2196F3",
  primaryLight: "#64B5F6",
  primaryDark: "#0F5FBD",
  primaryBlue: "#4A90E2",
  dotBlue: "#7EAFE8",
  stopsBadgeBackground: "#F2F3F4",

  // Secondary Colors
  secondary: "#FF9800",
  secondaryLight: "#FFB74D",
  secondaryDark: "#F57C00",

  // Status Colors
  success: "#4CAF50",
  successLight: "#81C784",
  successDark: "#388E3C",

  warning: "#FF9800",
  warningLight: "#FFB74D",
  warningDark: "#F57C00",

  error: "#F44336",
  errorLight: "#E57373",
  errorDark: "#D32F2F",

  info: "#2196F3",
  infoLight: "#64B5F6",
  infoDark: "#1976D2",

  // Neutral Colors
  white: "#FFFFFF",
  black: "#000000",

  // Gray Scale
  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#EEEEEE",
  gray300: "#E0E0E0",
  gray400: "#BDBDBD",
  gray500: "#9E9E9E",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",

  // Text Colors
  textPrimary: "#212121",
  textSecondary: "#757575",
  textDisabled: "#BDBDBD",
  textHint: "#9E9E9E",
  textBlue: "#0A2468",

  // Background Colors
  background: "#FFFFFF",
  backgroundSecondary: "#F5F5F5",
  backgroundTertiary: "#EEEEEE",
  backgroundGray: "#F1F1F1",

  // Border Colors
  border: "#E0E0E0",
  borderLight: "#F0F0F0",
  borderDark: "#BDBDBD",
  borderInput: "#E0E0E0",

  // Load Status Colors (Transportation specific)
  loadActive: "#FF9800", // On Route
  loadCompleted: "#4CAF50", // Delivered
  loadPending: "#F44336", // Waiting
  loadCancelled: "#9E9E9E", // Cancelled

  // Badge Colors
  dateBadgeBackground: "#6C2DF20F", // Purple badge background
  priceBadgeBackground: "#ECF5FF", // Light blue badge background
  dateBadgeText: "#1B18BD", // Date text color
  priceBadgeText: "#0F5FBD", // Price text color
} as const;

// Theme-based color sets
export const theme = {
  light: {
    background: colors.white,
    surface: colors.white,
    primary: colors.primary,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    border: colors.border,
  },
  dark: {
    background: colors.gray900,
    surface: colors.gray800,
    primary: colors.primaryLight,
    text: colors.white,
    textSecondary: colors.gray300,
    border: colors.gray600,
  },
} as const;

export type ColorKey = keyof typeof colors;
export type ThemeType = "light" | "dark";
