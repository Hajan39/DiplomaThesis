import React, { Component } from "react";
import { Platform, NetInfo } from "react-native";
import RootNavigator from "./screens/router";
import { i18n } from "./i18n";
class App extends Component {
    constructor(props) {
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
