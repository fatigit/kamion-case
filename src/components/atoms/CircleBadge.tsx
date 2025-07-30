import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { colors } from "../../constants";

interface CircleBadgeProps {
  imageSource: ImageSourcePropType;
  size?: number;
  backgroundColor?: string;
  style?: ViewStyle;
}

const CircleBadge: React.FC<CircleBadgeProps> = ({
  imageSource,
  size = 96,
  backgroundColor = colors.primaryDark,
  style,
}) => {
  const badgeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
  };

  return (
    <View style={[styles.circleBadge, badgeStyle, style]}>
      <Image
        source={imageSource}
        style={styles.badgeIcon}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleBadge: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  badgeIcon: {
    width: "83%", // 80/96 = 0.83
    height: "44%", // 42/96 = 0.44
  },
});

export default CircleBadge;
