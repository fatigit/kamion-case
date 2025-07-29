import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomText } from "../atoms";
import { colors } from "../../constants";

interface LoadCardProps {
  item: {
    id: string;
    from: string;
    to: string;
    date: string;
    price: string;
    status: string;
    weight: string;
  };
  onPress: (id: string) => void;
}

const LoadCard: React.FC<LoadCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.topRow}>
        <CustomText
          variant="body"
          weight="600"
          color={colors.textPrimary}
          style={styles.idText}
        >
          {item.id}
        </CustomText>
        <View style={styles.badgeContainer}>
          <View style={styles.dateBadge}>
            <CustomText
              variant="caption"
              color={colors.dateBadgeText}
              style={styles.dateText}
            >
              {item.date}
            </CustomText>
          </View>
          <View style={styles.priceBadge}>
            <CustomText style={styles.priceText}>
              <CustomText style={styles.priceNumber}>
                {item.price.replace("₺+KDV", "")}
              </CustomText>
              <CustomText style={styles.priceCurrency}>₺+KDV</CustomText>
            </CustomText>
          </View>
        </View>
      </View>

      <View style={styles.routeAndStopsRow}>
        <View style={styles.routeSection}>
          <View style={styles.routeItem}>
            <View style={styles.routeIndicator}>
              <View style={[styles.dot, styles.blueDot]} />
            </View>
            <View style={styles.routeContent}>
              <CustomText
                variant="caption"
                color={colors.textSecondary}
                style={styles.routeLabelClose}
              >
                ÇIKIŞ
              </CustomText>
              <CustomText
                variant="body"
                weight="bold"
                color={colors.textPrimary}
                style={styles.cityNameWithMargin}
              >
                {item.from}
              </CustomText>
            </View>
          </View>

          <View style={styles.connectingLineRow}>
            <View style={styles.connectingLine}>
              <View style={styles.dashContainer}>
                <View style={styles.dashDot} />
                <View style={styles.dashDot} />
                <View style={styles.dashDot} />
                <View style={styles.dashDot} />
                <View style={styles.dashDot} />
              </View>
            </View>
            <View style={styles.spacer} />
          </View>

          <View style={styles.routeItem}>
            <View style={styles.routeIndicator}>
              <View style={[styles.dot, styles.outlineDot]} />
            </View>
            <View style={styles.routeContent}>
              <CustomText
                variant="caption"
                color={colors.textSecondary}
                style={styles.routeLabelClose}
              >
                VARIŞ
              </CustomText>
              <CustomText
                variant="body"
                color={colors.textPrimary}
                style={styles.cityNameWithMargin}
              >
                {item.to}
              </CustomText>
            </View>
          </View>
        </View>

        {/* Stops count */}
        <View style={styles.stopsBadge}>
          <Ionicons
            name="chevron-down"
            size={14}
            color={colors.textSecondary}
          />
          <CustomText
            variant="caption"
            color={colors.textSecondary}
            style={styles.stopsText}
          >
            3 DURAK
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  idText: {
    fontSize: 14,
    lineHeight: 18,
    textTransform: "uppercase",
    fontFamily: "Axiforma",
  },
  routeSection: {
    flex: 1,
    marginTop: 8,
  },
  routeAndStopsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  routeIndicator: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2,
    width: 20,
  },
  routeContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  routeLabelClose: {
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 8,
  },
  cityNameWithMargin: {
    flex: 1,
    fontSize: 12,
  },
  connectingLineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -4,
  },
  connectingLine: {
    alignItems: "center",
    width: 20,
  },
  spacer: {
    flex: 1,
  },
  dashContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
  },
  dashDot: {
    width: 2,
    height: 3,
    backgroundColor: colors.dotBlue,
    borderRadius: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  blueDot: {
    backgroundColor: colors.dotBlue,
  },
  outlineDot: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.dotBlue,
  },
  routeLabel: {
    fontSize: 10,
    fontWeight: "bold",
  },
  dateBadge: {
    backgroundColor: colors.dateBadgeBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 106,
  },
  priceBadge: {
    backgroundColor: colors.priceBadgeBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 106,
  },
  dateText: {
    fontFamily: "Axiforma",
    fontSize: 12,
    lineHeight: 22,
    textAlign: "right",
  },
  priceText: {
    textAlign: "right",
  },
  priceNumber: {
    fontFamily: "Axiforma-SemiBold",
    fontSize: 12,
    lineHeight: 12,
    color: colors.priceBadgeText,
  },
  priceCurrency: {
    fontFamily: "Axiforma",
    fontSize: 12,
    lineHeight: 12,
    color: colors.priceBadgeText,
  },
  cityName: {
    flex: 1,
  },
  stopsBadge: {
    backgroundColor: colors.stopsBadgeBackground,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stopsText: {
    fontSize: 12,
    fontWeight: "400",
  },
  bottomRow: {
    alignItems: "flex-end",
  },
});

export default LoadCard;
