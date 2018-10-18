import React from "react";
import { View, Text } from "react-native";
import {
  DrawerNavigator,
  StackNavigator,
  NavigationRouteConfigMap,
  NavigationScreenConfig,
} from "react-navigation";
import { translate, InjectedTranslateProps } from "react-i18next";
import MIcons from "react-native-vector-icons/MaterialIcons";

import { HomeScreen, ScoringScreen, DailyMessagesScreen, CustomersScreen, CustomerDetailScreen, ToCScreen, SettingsScreen, ContactsScreen } from "./routes";
import { i18n } from "../../i18n";
import SideBar from "./sidebar";

var signedInRoutes: NavigationRouteConfigMap = {
  Home: {
    screen: HomeScreen,
  },
  Scoring: {
    screen: ScoringScreen,
  },
  DailyMessages: {
    screen: DailyMessagesScreen,
  },
  Customers: {
    screen: CustomersScreen,
  },
  TableOfCharges: {
    screen: ToCScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
  Contacts: {
    screen: ContactsScreen
  }
};

var detail: NavigationRouteConfigMap = {
  Home: {
    screen: HomeScreen,
  },
  Scoring: {
    screen: ScoringScreen,
  },
  DailyMessages: {
    screen: DailyMessagesScreen,
  },
  Customers: {
    screen: CustomersScreen,
  },
  TableOfCharges: {
    screen: ToCScreen,
  }, 
  CustomerDetail: {
    screen: CustomerDetailScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
  Contacts: {
    screen: ContactsScreen
  }
};

export const SignedInRouter = DrawerNavigator(detail, {
  initialRouteName: "Home",
  contentComponent: (props: any) => <SideBar {...props} routes={Object.keys(signedInRoutes)} />,
});
