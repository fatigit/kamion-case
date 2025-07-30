import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomText } from "../atoms";
import { colors } from "../../constants";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightButton?: {
    icon: string;
    onPress: () => void;
    color?: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightButton,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          <CustomText
            variant="title"
            weight="bold"
            color={colors.textPrimary}
            style={styles.title}
          >
            {title}
          </CustomText>
        </View>

        <View style={styles.rightSection}>
          {rightButton && (
            <TouchableOpacity
              style={styles.rightButton}
              onPress={rightButton.onPress}
              activeOpacity={0.7}
            >
              <Ionicons
                name={rightButton.icon as any}
                size={24}
                color={rightButton.color || colors.textPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  leftSection: {
    width: 60,
    justifyContent: "flex-start",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
  },
  rightSection: {
    width: 60,
    alignItems: "flex-end",
  },
  backButton: {
    padding: 4,
  },
  rightButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Header;
