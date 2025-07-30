import React from "react";
import { View, StyleSheet } from "react-native";

import { CustomText } from "../atoms";
import { colors } from "../../constants";

interface DetailItemProps {
  title: string;
  value: string | number;
}

const DetailItem: React.FC<DetailItemProps> = ({ title, value }) => {
  return (
    <View style={styles.detailItem}>
      <CustomText style={styles.detailTitle}>{title}</CustomText>
      <CustomText style={styles.detailValue}>{value || "-"}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  detailItem: {
    flex: 1,
    alignItems: "flex-start",
    gap: 8,
  },
  detailTitle: {
    fontFamily: "Axiforma",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: 0,
    textTransform: "uppercase",
    color: colors.textSecondary,
  },
  detailValue: {
    fontFamily: "Axiforma",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: colors.textBlue,
  },
});

export default DetailItem;
