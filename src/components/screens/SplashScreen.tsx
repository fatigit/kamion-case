import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

import { RootStackScreenProps } from "../../types/navigation";
import { colors } from "../../constants";

type Props = RootStackScreenProps<"Splash">;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/splash.png")}
        style={styles.splashImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;
