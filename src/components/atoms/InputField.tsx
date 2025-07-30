import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../constants";

interface InputFieldProps extends TextInputProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  containerStyle?: object;
}

const InputField: React.FC<InputFieldProps> = ({
  iconName,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textBlue}
          {...props}
        />
        {iconName && (
          <Ionicons
            name={iconName}
            size={24}
            color={colors.primaryDark}
            style={styles.inputIcon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default InputField;
