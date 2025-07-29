import type { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  LoadList: undefined;
  LoadDetail: { loadId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
