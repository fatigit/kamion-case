import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../types/navigation";
import { CustomText } from "../atoms";
import { colors } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, clearError } from "../../store/slices/authSlice";

type Props = RootStackScreenProps<"Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("frontend@kamion.co"); // Test credentials pre-filled
  const [password, setPassword] = useState("Frontend.2024");

  // Navigate to LoadList when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("LoadList");
    }
  }, [isAuthenticated, navigation]);

  // Show error alert when there's an error
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
            <View style={styles.circleBadge}>
              <Image
                source={require("../../../assets/images/kamionVector.png")}
                style={styles.badgeIcon}
                resizeMode="contain"
              />
            </View>

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

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Email Adresiniz"
                  placeholderTextColor={colors.textBlue}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Ionicons
                  name="mail-outline"
                  size={24}
                  color={colors.primaryDark}
                  style={styles.inputIcon}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Şifreniz"
                  placeholderTextColor={colors.textBlue}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={colors.primaryDark}
                  style={styles.inputIcon}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <CustomText variant="button" color={colors.white}>
                  Giriş Yapın
                </CustomText>
              )}
            </TouchableOpacity>
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
  circleBadge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryDark,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 30,
  },
  badgeIcon: {
    width: 80,
    height: 42,
  },
  title: {
    marginBottom: 12,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingRight: 50,
    fontFamily: "Axiforma",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlignVertical: "center",
    backgroundColor: colors.white,
  },
  inputIcon: {
    position: "absolute",
    right: 20,
    top: "50%",
    marginTop: -12,
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: colors.primaryDark,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default LoginScreen;
