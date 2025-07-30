import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../constants";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Yük ara...",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
        />
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.primaryBlue}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.backgroundGray,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
});

export default SearchBar;
