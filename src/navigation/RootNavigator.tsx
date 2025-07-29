import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

import {
  SplashScreen,
  LoginScreen,
  LoadListScreen,
  LoadDetailScreen,
} from "../components/screens";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2196F3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoadList"
          component={LoadListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoadDetail"
          component={LoadDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
