import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RootStackScreenProps } from "../../types/navigation";
import { Header, DetailRow, InfoBadge } from "../molecules";
import { RouteSection, DriverSection } from "../organisms";
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

  return (
    <View style={styles.container}>
      <Header
        title={`SEFER NO : ${currentShipment.id}`}
        showBackButton
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <RouteSection
            pickUpDate={currentShipment.pick_up_date}
            timeInterval={currentShipment.time_interval}
            departureAddress={currentShipment.departure_address}
            deliveryAddress={currentShipment.delivery_address}
          />

          <DriverSection
            driver={currentShipment.driver}
            price={currentShipment.price}
          />

          <View style={styles.companySection}>
            <InfoBadge
              icon="cube-outline"
              iconColor="#5D5FEF"
              backgroundColor="#EEEEFF"
              value={currentShipment.shipper?.name}
            />
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
              <DetailRow
                leftItem={{
                  title: "ARAÇ",
                  value:
                    currentShipment.shipment_detail?.vehicle_type_value || "-",
                }}
                rightItem={{
                  title: "DORSE",
                  value:
                    currentShipment.shipment_detail?.trailer_type_value?.[0] ||
                    "-",
                }}
              />

              <DetailRow
                leftItem={{
                  title: "TONAJ",
                  value:
                    currentShipment.shipment_detail?.tonnage?.min &&
                    currentShipment.shipment_detail?.tonnage?.max
                      ? `${currentShipment.shipment_detail.tonnage.min}-${currentShipment.shipment_detail.tonnage.max} Ton Max.`
                      : "-",
                }}
                rightItem={{
                  title: "ÜRÜN TİPİ",
                  value: currentShipment.shipment_detail?.type_of_goods || "-",
                }}
              />

              <DetailRow
                leftItem={{
                  title: "YÜKLEME TİPİ",
                  value:
                    currentShipment.shipment_detail?.way_of_loading_value ||
                    "-",
                }}
              />
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
  companySection: {
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginBottom: 12,
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
