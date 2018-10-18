import React, { Component } from "react";
import { StyleSheet, Platform, Image, RefreshControl } from "react-native";
import { connect } from "react-redux";
import {
  View,
  Text,
  Header,
  Container,
  Card,
  CardItem,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Button,
} from "native-base";
import styles from "./styles";
import ActionButton from 'react-native-action-button';

import { NavigationActions, NavigationProp } from "react-navigation";
import { translate, InjectedI18nProps, InjectedTranslateProps } from "react-i18next";
import { Logout } from "../../../reducers/login/login.reducer.functions";
import { Col, Row, Grid } from 'react-native-easy-grid';

interface Props extends InjectedTranslateProps {
  navigation: {
    dispatch: any;
    navigate: any;
  };
  isLoading: boolean;
  logout: () => void;
  checkForUpdates: () => void;
}

var state = {
  action: false
};
interface State {
  isLoading: boolean;
  userAsked: boolean;
}
const logo = require("../../../../assets/images/logo.png");
const businessResults = require("../../../../assets/mockdata/example.businessResults.json");
const basicData = require("../../../../assets/mockdata/exapmle.basicData.json");

class Home extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = { isLoading: false, userAsked: false };
  }

  logOut() {
    this.props.logout();
  }
  render() {
    const { t } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{t("sidebar:navigation:Home")}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Image source={logo} />
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text style={styles.username}>{basicData.firstName} {basicData.lastName}</Text>
              </Left>
              <Right>
                <Text style={styles.section}>{basicData.agency} {basicData.section}</Text>
              </Right>
            </CardItem>
          </Card>
          <Card refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.setState({ isLoading: true });
                this.props.checkForUpdates();
              }}
            />
          }>
            <CardItem bordered style={{ backgroundColor: '#009841' }}>
              <Content padder>
                <Text style={styles.topRow}>{t("businessResults:name")}</Text>
              </Content>
            </CardItem>
            <CardItem bordered>
              <Content padder>
                <Grid>
                  <Row>
                    <Col><Text style={styles.firstColumn}></Text></Col>
                    <Col><Text style={styles.names}>{t("businessResults:plan")}</Text></Col>
                    <Col><Text style={styles.names}>{t("businessResults:reality")}</Text></Col>
                  </Row>
                  {
                    businessResults.map((item, i) => {
                      return (
                        <Row key={i} >
                          <Col><Text style={styles.firstColumn}>{item.name}</Text></Col>
                          <Col style={styles.column}><Text>{item.plan}</Text></Col>
                          <Col style={styles.column}><Text>{item.real}</Text></Col>
                        </Row>
                      )})
                      }
                </Grid>
              </Content>
            </CardItem>
          </Card>
        </Content>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' style={styles.smallButton} title={t("sidebar:navigation:Scoring")} onPress={() => this.props.navigation.navigate("Scoring")}>
            <Icon name="md-person-add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title={t("sidebar:navigation:DailyMessages")} onPress={() => this.props.navigation.navigate("DailyMessages")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Logout()),
});



export const HomeScreen = translate("common")(connect(mapStateToProps, mapDispatchToProps)(Home));