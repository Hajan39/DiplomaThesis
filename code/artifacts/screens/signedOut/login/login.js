import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, ScrollView, Platform } from "react-native";
import { Container, Button, Spinner, View, Text, } from "native-base";
import { translate } from "react-i18next";
import { Abort } from "../../../reducers/login";
import { LoginFirstStep } from "./firstStep";
import { LoginSecondStep } from "./secondStep";
import styles from "./styles";
// tslint:disable:no-var-requires
const bg = require("../../../../assets/images/bg.jpg");
const logo = require("../../../../assets/images/logo.png");
class Login extends Component {
    renderCardContents() {
        if (!this.props.isLoading) {
            switch (this.props.step) {
                case 1:
                    return <LoginFirstStep />;
                case 2:
                    return <LoginSecondStep />;
                default:
                    return null;
            }
        }
        return (<View style={{
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
            marginBottom: 25,
            height: 150,
            width: 150,
            borderRadius: 150,
        }}>
          <Spinner size={Platform.OS === "ios" ? 0 : 140}/>
        </View>
        <View style={{ alignSelf: "center", height: 75 }}>
          <Button onPress={() => this.props.abort()}>
            <Text>{this.props.t("CANCEL")}</Text>
          </Button>
        </View>
      </View>);
    }
    render() {
        const { t } = this.props;
        return (<Container style={styles.container}>
        <View style={styles.background}>
          <Image source={bg} style={{ width: "100%", height: "100%" }}/>
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
          <View style={{
            display: "flex",
            flex: 0,
            backgroundColor: "rgba(255,255,255,0.95)",
            margin: 15,
            borderRadius: 500,
            width: 250,
            padding: 10,
        }}>
            <Image source={logo} style={{ resizeMode: "contain", height: 120, width: "100%" }}/>
          </View>
          {this.renderCardContents()}
        </ScrollView>
      </Container>);
    }
}
const mapStateToProps = ({ login }) => {
    return {
        isLoading: login.loading,
        step: login.step,
        date: new Date(),
    };
};
const mapDispatchToProps = dispatch => ({
    abort: () => dispatch(Abort()),
    redirect: () => dispatch({ type: "LOGIN/SECOND_FACTOR_RESULT" }),
});
export const LoginScreen = translate("common")(connect(mapStateToProps, mapDispatchToProps)(Login));
