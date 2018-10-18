import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { addListener } from "../boot/configureStore";
import {
  NavigationActions,
  StackNavigator,
  NavigationContainer,
  addNavigationHelpers,
  NavigationRouteConfigMap,
} from "react-navigation";
import { SignedInRouter, SignedOut } from "./screens";
import { Easing, Animated, BackHandler } from "react-native";

const routes: NavigationRouteConfigMap = {
  SignedOut: {
    screen: SignedOut.LoginScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  SignedIn: {
    screen: SignedInRouter,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
};

export const RootNavigator = StackNavigator(routes, {
  headerMode: "none",
  mode: "modal",
  navigationOptions: {
    gesturesEnabled: false,
  },
  initialRouteName: "SignedOut",
});

class NavigatorComponent extends React.Component<any> {
  /**
   *
   */
  constructor(props) {
    super(props);
    if (props.token) {
      props.dispatch(NavigationActions.navigate({ routeName: "SignedIn" }));
    }

    BackHandler.addEventListener("hardwareBackPress", () => {
      props.dispatch({ ...NavigationActions.back(), physical: true });
      return true;
    });
  }
  render() {
    return (
      <RootNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener,
        })}
      />
    );
  }
}

export default connect(
  (state: any) => ({ nav: state.nav, token: state.login.accessToken }),
  (dispatch: any) => ({ dispatch: dispatch }),
)(NavigatorComponent);
