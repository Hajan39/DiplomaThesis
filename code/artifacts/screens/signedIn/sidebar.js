import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { Image, ScrollView, StyleSheet, Button, } from "react-native";
import { Container, Header, Content, Text, List, ListItem, View } from "native-base";
import { NavigationActions } from "react-navigation";
import { Logout } from "../../reducers/login/login.reducer.functions";
import { StopLogCollection, StartLogCollection, SendLogs, } from "../../reducers/logger";
import { byteCountReadable } from "../../helpers/byte-count";
const basicData = require("../../../assets/mockdata/exapmle.basicData.json");
class SideBar extends React.Component {
    renderList() {
        return (<List dataArray={this.props.routes} renderRow={data => {
            return (<ListItem button onPress={() => {
                this.props.navigation.dispatch(NavigationActions.navigate({ routeName: data }));
            }}>
              <Text>{this.props.t(`sidebar:navigation:${data}`)}</Text>
            </ListItem>);
        }}/>);
    }
    logout() {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "SignedOut",
                }),
            ],
        }));
        this.props.logout();
    }
    render() {
        const { routes, t } = this.props;
        return (<Container>
        <Header style={{ height: 200, backgroundColor: "#fff" }}>
          <View style={{ flex: 1 }}>
            <Image source={require("../../../assets/images/logo.png")} style={styles.logo}/>
            <Text>{basicData.firstName} {basicData.lastName}</Text>
            
            
          </View>
        </Header>
        <Content>
          <ScrollView>{this.renderList()}</ScrollView>
        </Content>
        <Button title={t("LOG_OUT")} onPress={() => this.logout()}/>
      </Container>);
    }
}
const styles = StyleSheet.create({
    logo: {
        height: 100,
        flex: 0,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 20,
    },
});
const mapStateToProps = ({ logger }) => ({
    loggingEnabled: logger.collectionStarted,
    logsSize: byteCountReadable(logger.logs),
});
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(Logout()),
        startLogging: () => dispatch(StartLogCollection(false)),
        stopLogging: () => dispatch(StopLogCollection(false, false)),
        sendLogs: () => dispatch(SendLogs("http://dummy.not.existing.address/")),
    };
};
export default translate("common")(connect(mapStateToProps, mapDispatchToProps)(SideBar));
