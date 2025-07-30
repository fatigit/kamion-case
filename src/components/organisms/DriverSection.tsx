import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { InfoBadge } from "../molecules";
import { CustomText } from "../atoms";
import { colors } from "../../constants";

interface DriverSectionProps {
  driver?: {
    name: string;
    surname: string;
    phone: string;
  };
  price?: {
    shipper?: {
      freight_price: string;
    };
  };
}

const DriverSection: React.FC<DriverSectionProps> = ({ driver, price }) => {
  return (
    <View style={styles.driverSection}>
      <View style={styles.driverInfo}>
        <View style={styles.driverAvatar}>
          <Image
            source={require("../../../assets/images/person.png")}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.driverDetails}>
          <CustomText style={styles.driverName}>
            {driver?.name} {driver?.surname}
          </CustomText>
          <CustomText style={styles.driverPhone}>{driver?.phone}</CustomText>
        </View>
        <InfoBadge
          icon="wallet-outline"
          iconColor={colors.priceBadgeText}
          backgroundColor={colors.priceBadgeBackground}
          title="KAZANCINIZ"
          value={`${parseInt(price?.shipper?.freight_price || "0")}₺ + KDV`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  driverSection: {
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontFamily: "Axiforma",
    fontWeight: "600",
    fontSize: 11,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.textBlue,
  },
  driverPhone: {
    fontFamily: "Axiforma",
    fontWeight: "300",
    fontSize: 11,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.textBlue,
  },
});

export default DriverSection;
