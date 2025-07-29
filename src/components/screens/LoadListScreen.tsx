import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { RootStackScreenProps } from "../../types/navigation";
import { LoadCard } from "../organisms";
import { Header, SearchBar } from "../molecules";
import { colors } from "../../constants";

type Props = RootStackScreenProps<"LoadList">;

interface Load {
  id: string;
  from: string;
  to: string;
  date: string;
  price: string;
  status: string;
  weight: string;
}

const LoadListScreen: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const mockLoads: Load[] = [
    {
      id: "22993",
      from: "Adana, Aladağ Türkiye",
      to: "Zonguldak, Ereğli Türkiye",
      date: "22 Mayıs 2023",
      price: "27.500₺+KDV",
      status: "Yolda",
      weight: "15 ton",
    },
    {
      id: "22993",
      from: "Adana, Aladağ Türkiye",
      to: "Zonguldak, Ereğli Türkiye",
      date: "22 Mayıs 2023",
      price: "27.500₺+KDV",
      status: "Beklemede",
      weight: "20 ton",
    },
    {
      id: "22993",
      from: "Adana, Aladağ Türkiye",
      to: "Zonguldak, Ereğli Türkiye",
      date: "22 Mayıs 2023",
      price: "27.500₺+KDV",
      status: "Teslim Edildi",
      weight: "12 ton",
    },
  ];

  const filteredLoads = mockLoads.filter(
    (load) =>
      load.from.toLowerCase().includes(searchText.toLowerCase()) ||
      load.to.toLowerCase().includes(searchText.toLowerCase()) ||
      load.status.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleLoadPress = (id: string) => {
    navigation.navigate("LoadDetail", { loadId: id });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderLoadCard = ({ item }: { item: Load }) => (
    <LoadCard item={item} onPress={handleLoadPress} />
  );

  return (
    <View style={styles.container}>
      <Header title="Yükler" showBackButton onBackPress={handleBackPress} />

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Arayın..."
      />

      <View style={styles.content}>
        <FlatList
          data={filteredLoads}
          renderItem={renderLoadCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
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
});

export default LoadListScreen;
