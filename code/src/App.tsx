import React, { Component } from "react";
import { Platform, NetInfo } from "react-native";
import { connect } from "react-redux";
import RootNavigator from "./screens/router";
import {
  NavigationActions,
  NavigationNavigatorProps,
  addNavigationHelpers,
} from "react-navigation";

import { welcomeUser } from "./services/push-notifications";

import { LoginReducerState, Logout, Steps } from "./reducers/login";

import { i18n } from "./i18n";

interface State {
  i18n: any;
}

interface Props extends LoginReducerState, NavigationNavigatorProps<App> {}

class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      i18n: i18n,
    };
  }

  componentDidMount() {
    if (Platform.OS.toLowerCase() === "ios") {
      NetInfo.isConnected.addEventListener("connectionChange", isConnected => {
        console.log("Connection state changed");
      });
    }
  }

  render() {
    return <RootNavigator />;
  }
}

export default App;
