import React from "react";
import { DrawerNavigator, } from "react-navigation";
import { HomeScreen, ScoringScreen, DailyMessagesScreen, CustomersScreen, CustomerDetailScreen, ToCScreen, SettingsScreen, ContactsScreen } from "./routes";
import SideBar from "./sidebar";
var signedInRoutes = {
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
var detail = {
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
    contentComponent: (props) => <SideBar {...props} routes={Object.keys(signedInRoutes)}/>,
});
