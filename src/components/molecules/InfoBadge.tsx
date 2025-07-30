import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CustomText } from "../atoms";
import { colors } from "../../constants";

interface InfoBadgeProps {
  icon: string;
  iconColor?: string;
  backgroundColor?: string;
  title?: string;
  value?: string;
  size?: "small" | "medium";
}

const InfoBadge: React.FC<InfoBadgeProps> = ({
  icon,
  iconColor = colors.priceBadgeText,
  backgroundColor = colors.priceBadgeBackground,
  title,
  value,
  size = "medium",
}) => {
  const badgeSize = size === "small" ? 32 : 40;
  const iconSize = size === "small" ? 16 : 20;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badge,
          {
            width: badgeSize,
            height: badgeSize,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Ionicons name={icon as any} size={iconSize} color={iconColor} />
      </View>
      {(title || value) && (
        <View style={styles.textContainer}>
          {title && <CustomText style={styles.title}>{title}</CustomText>}
          {value && <CustomText style={styles.value}>{value}</CustomText>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  badge: {
    borderRadius: 111,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  textContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "Axiforma",
    fontWeight: "300",
    fontSize: 11,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.textBlue,
  },
  value: {
    fontFamily: "Axiforma",
    fontWeight: "600",
    fontSize: 11,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.textBlue,
  },
});

export default InfoBadge;
