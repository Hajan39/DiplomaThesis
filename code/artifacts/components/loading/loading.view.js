import React from "react";
import { View, Image, Platform } from "react-native";
import { Spinner } from "native-base";
export class LoadingView extends React.Component {
    render() {
        return (<View style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
        <View style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            margin: 15,
            borderRadius: 500,
            width: 250,
            padding: 10,
        }}>
          <Image source={require("../../../assets/images/logo.png")} style={{ resizeMode: "contain", height: 120, width: "100%" }}/>
        </View>
        <View style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
        }}>
          <View style={{
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: 5,
            height: 150,
            width: 150,
            borderRadius: 150,
        }}>
            <Spinner size={Platform.OS === "ios" ? 0 : 140}/>
          </View>
        </View>
        <View style={{ alignSelf: "center", height: 75 }}/>
      </View>);
    }
}
