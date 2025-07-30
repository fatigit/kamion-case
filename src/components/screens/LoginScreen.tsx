import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { RootStackScreenProps } from "../../types/navigation";
import { CustomText, InputField, PrimaryButton, CircleBadge } from "../atoms";
import { colors } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, clearError } from "../../store/slices/authSlice";

type Props = RootStackScreenProps<"Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("LoadList");
    }
  }, [isAuthenticated, navigation]);

  // error alert when there's an error
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun");
      return;
    }

    // Dispatch login action
    dispatch(loginUser({ email, password }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.formContainer}>
            <CircleBadge
              imageSource={require("../../../assets/images/kamionVector.png")}
            />

            <CustomText
              variant="title"
              color={colors.textPrimary}
              align="center"
              style={styles.title}
            >
              Kamion'a Hoşgeldiniz
            </CustomText>

            <CustomText
              variant="body"
              color={colors.textSecondary}
              align="center"
              style={styles.subtitle}
            >
              Lütfen email ve şifrenizi girerek giriş yapınız.
            </CustomText>

            <InputField
              placeholder="Email Adresiniz"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              iconName="mail-outline"
            />

            <InputField
              placeholder="Şifreniz"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              iconName="lock-closed-outline"
            />

            <PrimaryButton
              title="Giriş Yapın"
              onPress={handleLogin}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 120,
    paddingBottom: 60,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginBottom: 12,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
