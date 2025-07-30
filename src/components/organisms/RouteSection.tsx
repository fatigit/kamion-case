import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CustomText } from "../atoms";
import { colors } from "../../constants";

interface RouteSectionProps {
  pickUpDate: number;
  timeInterval?: {
    start: string;
    end: string;
  };
  departureAddress?: {
    city?: { name: string };
    district?: { name: string };
  };
  deliveryAddress?: {
    city?: { name: string };
    district?: { name: string };
  };
}

const RouteSection: React.FC<RouteSectionProps> = ({
  pickUpDate,
  timeInterval,
  departureAddress,
  deliveryAddress,
}) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("tr-TR");
  };

  return (
    <>
      <View style={styles.dateTimeHeader}>
        <CustomText variant="body" color={colors.textPrimary} weight="600">
          Güzergah
        </CustomText>
        <View style={styles.dateTimeContainer}>
          <Ionicons name="time-outline" size={16} color={colors.primaryDark} />
          <CustomText
            variant="caption"
            color={colors.dateBadgeText}
            style={styles.dateTimeText}
          >
            {formatDate(pickUpDate)} / {timeInterval?.start}-{timeInterval?.end}
          </CustomText>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={require("../../../assets/images/sampleMap.jpg")}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.routeButton}>
          <Ionicons name="git-network-outline" size={16} color={colors.white} />
          <CustomText variant="caption" color={colors.white} weight="600">
            Yol Tarifi Al
          </CustomText>
        </View>
      </View>

      <View style={styles.routeDetails}>
        <View style={styles.routeStop}>
          <View style={styles.routeStopLeft}>
            <View style={[styles.dot, styles.blueDot]} />
            <CustomText
              variant="caption"
              color={colors.primaryDark}
              weight="600"
              style={styles.stopLabel}
            >
              KALKIŞ
            </CustomText>
          </View>
          <View style={styles.routeStopRight}>
            <CustomText
              variant="caption"
              color={colors.primaryDark}
              weight="600"
              style={styles.cityText}
            >
              {departureAddress?.city?.name}, {departureAddress?.district?.name}
            </CustomText>
          </View>
        </View>

        <View style={styles.routeStop}>
          <View style={styles.routeStopLeft}>
            <View style={[styles.dot, styles.outlineDot]} />
            <CustomText
              variant="caption"
              color={colors.primaryDark}
              weight="600"
              style={styles.stopLabel}
            >
              VARIŞ
            </CustomText>
          </View>
          <View style={styles.routeStopRight}>
            <CustomText
              variant="caption"
              color={colors.textBlue}
              weight="500"
              style={styles.destinationText}
            >
              {deliveryAddress?.city?.name}, {deliveryAddress?.district?.name}
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dateTimeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dateBadgeBackground,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 10,
    borderRadius: 111,
    height: 32,
    gap: 6,
    justifyContent: "center",
  },
  dateTimeText: {
    marginLeft: 6,
  },
  mapContainer: {
    width: "100%",
    height: 120,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
    overflow: "hidden",
    opacity: 1,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  routeButton: {
    position: "absolute",
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    alignSelf: "center",
  },
  routeDetails: {
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  routeStop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  routeStopLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  routeStopRight: {
    alignItems: "flex-end",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  blueDot: {
    backgroundColor: colors.primaryDark,
  },
  outlineDot: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
  stopLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  cityText: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 12,
    textAlign: "right",
  },
  destinationText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 12,
    textAlign: "right",
  },
});

export default RouteSection;
