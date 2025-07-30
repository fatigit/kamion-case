import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";

import { RootStackScreenProps } from "../../types/navigation";
import { LoadCard } from "../organisms";
import { Header, SearchBar } from "../molecules";
import { CustomText } from "../atoms";
import { colors } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchShipments,
  searchShipments,
  setSearchTerm,
  clearError,
} from "../../store/slices/shipmentSlice";
import { logout } from "../../store/slices/authSlice";
import { Shipment } from "../../types/api/shipment";

type Props = RootStackScreenProps<"LoadList">;

const LoadListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { shipments, isLoading, error, searchTerm } = useAppSelector(
    (state) => state.shipments
  );

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchShipments({}));
  }, [dispatch]);

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

  const handleSearch = useCallback(
    (text: string) => {
      dispatch(setSearchTerm(text));

      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      if (text.trim() === "") {
        dispatch(fetchShipments({}));
        return;
      }

      const newTimeout = setTimeout(() => {
        const shipmentId = parseInt(text.trim());
        if (!isNaN(shipmentId)) {
          dispatch(searchShipments({ id: shipmentId }));
        }
      }, 500);

      setSearchTimeout(newTimeout);
    },
    [dispatch, searchTimeout]
  );

  const formatShipment = (shipment: Shipment) => {
    try {
      if (!shipment.id) {
        return null;
      }

      const fromCity = shipment.departure_address?.city?.name || "-";
      const fromDistrict = shipment.departure_address?.district?.name || "";
      const from = fromDistrict ? `${fromCity}, ${fromDistrict}` : fromCity;

      const toCity = shipment.delivery_address?.city?.name || "-";
      const toDistrict = shipment.delivery_address?.district?.name || "";
      const to = toDistrict ? `${toCity}, ${toDistrict}` : toCity;

      return {
        id: shipment.id.toString(),
        from: from,
        to: to,
        date: shipment.pick_up_date
          ? new Date(shipment.pick_up_date * 1000).toLocaleDateString("tr-TR")
          : "-",
        price: shipment.price?.shipper?.freight_price
          ? `${shipment.price.shipper.freight_price}₺+KDV`
          : "-",
        status: shipment.latest_status?.type_value || "-",
        weight:
          shipment.shipment_detail?.tonnage?.min &&
          shipment.shipment_detail?.tonnage?.max
            ? `${shipment.shipment_detail.tonnage.min}-${shipment.shipment_detail.tonnage.max} ton`
            : "-",
      };
    } catch (error) {
      console.error("Error formatting shipment:", error, shipment);
      return null;
    }
  };

  const renderLoadCard = ({ item }: { item: Shipment }) => {
    const formattedShipment = formatShipment(item);

    if (!formattedShipment) {
      return null;
    }

    return (
      <LoadCard
        item={formattedShipment}
        onPress={(id) =>
          navigation.navigate("LoadDetail", {
            loadId: id,
          })
        }
      />
    );
  };

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primaryDark} />
      <CustomText
        variant="body"
        color={colors.textSecondary}
        style={styles.loadingText}
      >
        Yükler yükleniyor...
      </CustomText>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <CustomText
        variant="title"
        color={colors.textSecondary}
        align="center"
        style={styles.emptyTitle}
      >
        Yük Bulunamadı
      </CustomText>
      <CustomText
        variant="body"
        color={colors.textSecondary}
        align="center"
        style={styles.emptyText}
      >
        {searchTerm
          ? "Arama kriterlerinize uygun yük bulunamadı."
          : "Henüz yük bulunmuyor."}
      </CustomText>
    </View>
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    Alert.alert("Çıkış Yap", "Çıkış yapmak istediğinizden emin misiniz?", [
      {
        text: "İptal",
        style: "cancel",
      },
      {
        text: "Çıkış Yap",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Yükler"
        onBackPress={handleBackPress}
        rightButton={{
          icon: "log-out-outline",
          onPress: handleLogout,
        }}
      />

      <SearchBar
        value={searchTerm}
        onChangeText={handleSearch}
        placeholder="Arayın..."
      />

      <View style={styles.content}>
        {isLoading ? (
          renderLoading()
        ) : (
          <FlatList
            data={shipments}
            renderItem={renderLoadCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={renderEmpty}
            refreshing={isLoading}
            onRefresh={() => dispatch(fetchShipments({}))}
          />
        )}
      </View>
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
  listContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
  },
});

export default LoadListScreen;
