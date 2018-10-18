import React from "react";
import { connect } from "react-redux";
import { addListener } from "../boot/configureStore";
import { NavigationActions, StackNavigator, addNavigationHelpers, } from "react-navigation";
import { SignedInRouter, SignedOut } from "./screens";
import { BackHandler } from "react-native";
const routes = {
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
class NavigatorComponent extends React.Component {
    /**
     *
     */
    constructor(props) {
        super(props);
        if (props.token) {
            props.dispatch(NavigationActions.navigate({ routeName: "SignedIn" }));
        }
        BackHandler.addEventListener("hardwareBackPress", () => {
            props.dispatch(Object.assign({}, NavigationActions.back(), { physical: true }));
            return true;
        });
    }
    render() {
        return (<RootNavigator navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener,
        })}/>);
    }
}
export default connect((state) => ({ nav: state.nav, token: state.login.accessToken }), (dispatch) => ({ dispatch: dispatch }))(NavigatorComponent);
