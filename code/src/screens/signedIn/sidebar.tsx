import React from "react";
import { connect } from "react-redux";
import { translate, InjectedTranslateProps } from "react-i18next";
import {
  AppRegistry,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  Button,
  Switch,
} from "react-native";
import { Container, Header, Content, Text, List, ListItem, View } from "native-base";
import { DrawerItems, NavigationNavigatorProps, NavigationActions } from "react-navigation";

import { Logout } from "../../reducers/login/login.reducer.functions";

import {
  StopLogCollection,
  StartLogCollection,
  SendLogs,
  LoggerReducerState,
} from "../../reducers/logger";

import { byteCountReadable } from "../../helpers/byte-count";

const basicData = require("../../../assets/mockdata/exapmle.basicData.json");

interface StateProps extends InjectedTranslateProps {
  routes: Array<string>;
  loggingEnabled: boolean;
  logsSize: string;
}

interface DispatchProps extends NavigationNavigatorProps<SideBar> {
  logout: () => void;
  startLogging: () => void;
  stopLogging: () => void;
  sendLogs: () => void;
}

interface Props extends StateProps, DispatchProps {}

class SideBar extends React.Component<Props> {
  renderList() {
    return (
      <List
        dataArray={this.props.routes}
        renderRow={data => {
          return (
            <ListItem
              button
              onPress={() => {
                this.props.navigation.dispatch(NavigationActions.navigate({ routeName: data }));
              }}>
              <Text>{this.props.t(`sidebar:navigation:${data}`)}</Text>
            </ListItem>
          );
        }}
      />
    );
  }

  logout() {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "SignedOut",
          }),
        ],
      }),
    );
    this.props.logout();
  }

  render() {
    const { routes, t } = this.props;
    return (
      <Container>
        <Header style={{ height: 200, backgroundColor: "#fff" }}>
          <View style={{ flex: 1 }}>
            <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
            <Text>{basicData.firstName} {basicData.lastName}</Text>
            
            {/* <View>
              <Switch
                value={this.props.loggingEnabled}
                onValueChange={value => {
                  value ? this.props.startLogging() : this.props.stopLogging();
                }}
              />
              <Text>Log size: {this.props.logsSize}</Text>
            </View>
            <View>
              <Button onPress={() => this.props.sendLogs()} title="Send logs to server" />
            </View> */}
          </View>
        </Header>
        <Content>
          <ScrollView>{this.renderList()}</ScrollView>
        </Content>
        <Button title={t("LOG_OUT")} onPress={() => this.logout()} />
      </Container>
    );
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

const mapStateToProps = ({ logger }: { logger: LoggerReducerState }) =>
  ({
    loggingEnabled: logger.collectionStarted,
    logsSize: byteCountReadable(logger.logs),
  } as StateProps);
const mapDispatchToProps = (dispatch): Partial<DispatchProps> => {
  return {
    logout: () => dispatch(Logout()),
    startLogging: () => dispatch(StartLogCollection(false)),
    stopLogging: () => dispatch(StopLogCollection(false, false)),
    sendLogs: () => dispatch(SendLogs("http://dummy.not.existing.address/")),
  };
};
export default translate("common")(connect(mapStateToProps, mapDispatchToProps)(SideBar));
