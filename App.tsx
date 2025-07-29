import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Axiforma: require("./assets/fonts/Axiforma-Regular.otf"),
    "Axiforma-Medium": require("./assets/fonts/Axiforma-Medium.otf"),
    "Axiforma-SemiBold": require("./assets/fonts/Axiforma-SemiBold.otf"),
    "Axiforma-Bold": require("./assets/fonts/Axiforma-Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
};

export default App;
