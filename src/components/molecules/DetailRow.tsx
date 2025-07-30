import React from "react";
import { View, StyleSheet } from "react-native";

import { DetailItem } from ".";

interface DetailRowProps {
  leftItem: {
    title: string;
    value: string | number;
  };
  rightItem?: {
    title: string;
    value: string | number;
  };
}

const DetailRow: React.FC<DetailRowProps> = ({ leftItem, rightItem }) => {
  return (
    <View style={styles.detailRow}>
      <DetailItem title={leftItem.title} value={leftItem.value} />
      {rightItem ? (
        <DetailItem title={rightItem.title} value={rightItem.value} />
      ) : (
        <View style={styles.emptyItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  emptyItem: {
    flex: 1,
  },
});

export default DetailRow;
