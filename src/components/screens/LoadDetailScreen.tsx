import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../types/navigation";
import { Header } from "../molecules";
import { CustomText } from "../atoms";
import { colors } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchShipmentDetail,
  clearError,
} from "../../store/slices/shipmentSlice";

type Props = RootStackScreenProps<"LoadDetail">;

const LoadDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { currentShipment, isDetailLoading, error } = useAppSelector(
    (state) => state.shipments
  );

  const { loadId } = route.params;

  useEffect(() => {
    if (loadId) {
      dispatch(fetchShipmentDetail(parseInt(loadId)));
    }
  }, [dispatch, loadId]);

  useEffect(() => {
    if (error) {
      Alert.alert("Hata", error, [
        {
          text: "Tamam",
          onPress: () => dispatch(clearError()),
        },
      ]);
    }
  }, [error, dispatch]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (isDetailLoading) {
    return (
      <View style={styles.container}>
        <Header
          title="Yük Detayı"
          showBackButton
          onBackPress={handleBackPress}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryDark} />
          <CustomText
            variant="body"
            color={colors.textSecondary}
            style={styles.loadingText}
          >
            Yük detayı yükleniyor...
          </CustomText>
        </View>
      </View>
    );
  }

  if (!currentShipment) {
    return (
      <View style={styles.container}>
        <Header
          title="Yük Detayı"
          showBackButton
          onBackPress={handleBackPress}
        />
        <View style={styles.emptyContainer}>
          <CustomText
            variant="title"
            color={colors.textSecondary}
            align="center"
          >
            Yük Bulunamadı
          </CustomText>
        </View>
      </View>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("tr-TR");
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title={`SEFER NO : ${currentShipment.id}`}
        showBackButton
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <View style={styles.dateTimeHeader}>
            <CustomText variant="body" color={colors.textPrimary} weight="600">
              Güzergah
            </CustomText>
            <View style={styles.dateTimeContainer}>
              <Ionicons
                name="time-outline"
                size={16}
                color={colors.primaryDark}
              />
              <CustomText
                variant="caption"
                color={colors.dateBadgeText}
                style={styles.dateTimeText}
              >
                {formatDate(currentShipment.pick_up_date)} /{" "}
                {currentShipment.time_interval?.start}-
                {currentShipment.time_interval?.end}
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
              <Ionicons
                name="git-network-outline"
                size={16}
                color={colors.white}
              />
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
                  {currentShipment.departure_address?.city?.name},{" "}
                  {currentShipment.departure_address?.district?.name}
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
                  {currentShipment.delivery_address?.city?.name},{" "}
                  {currentShipment.delivery_address?.district?.name}
                </CustomText>
              </View>
            </View>
          </View>

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
                  {currentShipment.driver?.name}{" "}
                  {currentShipment.driver?.surname}
                </CustomText>
                <CustomText style={styles.driverPhone}>
                  {currentShipment.driver?.phone}
                </CustomText>
              </View>
              <View style={styles.priceContainer}>
                <View style={styles.priceBadge}>
                  <Ionicons
                    name="wallet-outline"
                    size={20}
                    color={colors.priceBadgeText}
                  />
                </View>
                <View style={styles.priceInfo}>
                  <CustomText style={styles.priceTitle}>KAZANCINIZ</CustomText>
                  <CustomText style={styles.priceAmount}>
                    {parseInt(
                      currentShipment.price?.shipper?.freight_price || "0"
                    )}
                    ₺ + KDV
                  </CustomText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.companySection}>
            <View style={styles.companyInfo}>
              <View style={styles.companyBadge}>
                <Ionicons name="cube-outline" size={16} color="#5D5FEF" />
              </View>
              <CustomText style={styles.companyName}>
                {currentShipment.shipper?.name}
              </CustomText>
            </View>
          </View>

          <View style={styles.detailsSection}>
            <CustomText
              variant="body"
              color={colors.textPrimary}
              weight="600"
              style={styles.sectionTitle}
            >
              Taşıma Gereksinimleri
            </CustomText>

            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <CustomText style={styles.detailTitle}>ARAÇ</CustomText>
                  <CustomText style={styles.detailValue}>
                    {currentShipment.shipment_detail?.vehicle_type_value}
                  </CustomText>
                </View>

                <View style={styles.detailItem}>
                  <CustomText style={styles.detailTitle}>DORSE</CustomText>
                  <CustomText style={styles.detailValue}>
                    {currentShipment.shipment_detail?.trailer_type_value?.[0] ||
                      "-"}
                  </CustomText>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <CustomText style={styles.detailTitle}>TONAJ</CustomText>
                  <CustomText style={styles.detailValue}>
                    {currentShipment.shipment_detail?.tonnage?.min}-
                    {currentShipment.shipment_detail?.tonnage?.max} Ton Max.
                  </CustomText>
                </View>

                <View style={styles.detailItem}>
                  <CustomText style={styles.detailTitle}>ÜRÜN TİPİ</CustomText>
                  <CustomText style={styles.detailValue}>
                    {currentShipment.shipment_detail?.type_of_goods || "-"}
                  </CustomText>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <CustomText style={styles.detailTitle}>
                    YÜKLEME TİPİ
                  </CustomText>
                  <CustomText style={styles.detailValue}>
                    {currentShipment.shipment_detail?.way_of_loading_value ||
                      "-"}
                  </CustomText>
                </View>
                <View style={styles.detailItem} />
              </View>
            </View>
          </View>

          <View style={styles.statusSection}>
            <CustomText style={styles.statusText}>
              Taşıma Durumu : {currentShipment.latest_status?.type_value}
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 32,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  routeStopIndicator: {
    alignItems: "center",
    marginRight: 16,
    width: 20,
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
  stopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  stopLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  stopNumber: {
    fontSize: 10,
    textAlign: "center",
  },
  routeStopInfo: {
    flex: 1,
  },
  locationText: {
    marginBottom: 2,
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
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: colors.borderLight,
    marginLeft: 5,
    marginBottom: -12,
  },
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
  priceContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 10,
  },
  priceBadge: {
    width: 40,
    height: 40,
    borderRadius: 111,
    padding: 10,
    backgroundColor: colors.priceBadgeBackground,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  priceInfo: {
    alignItems: "flex-start",
  },
  priceTitle: {
    fontFamily: "Axiforma",
    fontWeight: "300",
    fontSize: 11,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.textBlue,
  },
  priceAmount: {
    fontFamily: "Axiforma",
    fontWeight: "600",
    fontSize: 11,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.textBlue,
  },
  companySection: {
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginBottom: 12,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  companyBadge: {
    width: 40,
    height: 40,
    borderRadius: 1111,
    padding: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  companyName: {
    fontFamily: "Axiforma",
    fontWeight: "300",
    fontSize: 11,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.textBlue,
  },
  detailsSection: {
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  detailsGrid: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
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
  statusSection: {
    backgroundColor: "#DAF5EC",
    borderRadius: 111,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    opacity: 1,
    paddingVertical: 9,
    paddingHorizontal: 16,
    alignSelf: "stretch",
    minHeight: 38,
  },
  statusText: {
    fontFamily: "Axiforma",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#1FCB91",
    flexShrink: 1,
  },
});

export default LoadDetailScreen;
