import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  variant?: "title" | "subtitle" | "body" | "caption" | "button";
  color?: string;
  align?: "left" | "center" | "right";
  weight?: "normal" | "bold" | "500" | "600" | "700";
}

const CustomText: React.FC<CustomTextProps> = ({
  variant = "body",
  color,
  align = "left",
  weight,
  style,
  children,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "title":
        return styles.title;
      case "subtitle":
        return styles.subtitle;
      case "body":
        return styles.body;
      case "caption":
        return styles.caption;
      case "button":
        return styles.button;
      default:
        return styles.body;
    }
  };

  const customStyle = {
    color: color,
    textAlign: align,
    fontWeight: weight,
  };

  return (
    <Text style={[getVariantStyle(), customStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: 16,
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
  },
});

export default CustomText;
