import React, { Component } from "react";
import { StyleSheet, Platform, RefreshControl, ScrollView, Alert } from "react-native";
import { connect } from "react-redux";
import {
  View,
  Text,
  Header,
  Container,
  List,
  ListItem,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Button,
} from "native-base";
import { NavigationActions, NavigationProp, NavigationInjectedProps } from "react-navigation";
import { translate, InjectedI18nProps, InjectedTranslateProps } from "react-i18next";
import { Logout } from "../../../reducers/login";
import {
  answerAboutChanges,
  checkForUpdates,
  NEW_VERSION_AVAILABLE,
  ToCReducerState,
} from "../../../reducers/toc";

import { ToCFormat } from "../../../models";

import styles from "./styles";

const productTable = require("../../../../assets/mockdata/example.productTable.json");

interface Props extends InjectedTranslateProps, NavigationInjectedProps {
  logout: () => void;
  toc: ToCFormat;
  tocState: any;
  isLoading: boolean;
  checkForUpdates: () => void;
  userResponse: (accepted: boolean) => void;
}
interface State {
  isLoading: boolean;
  userAsked: boolean;
}
class TableOfCharges extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isLoading: false, userAsked: false };
  }

  componentDidMount() {
    if (!this.props.toc) {
      this.props.checkForUpdates();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { t } = this.props;
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({ isLoading: nextProps.isLoading });
    }

    if (nextProps.tocState === NEW_VERSION_AVAILABLE) {
      if (!this.state.userAsked) {
        this.setState({ userAsked: true });

      }
    } else {
      this.setState({ userAsked: false });
    }
  }

  createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }


  renderPost(item, i) {
    let row = [];
    row.push(<ListItem itemDivider key={i}><Text>{item.name}</Text></ListItem>);
    for (let count = 0; count < item.fields.length; count++) {
      let f = item.fields[count];
      row.push(<ListItem icon key={f.key}>
        <Left>
          <Icon name={f.iconName} />
        </Left>
        <Body>
          <Text>{f.name}</Text>
        </Body>
        <Right />
      </ListItem>)
    }
    return row;
    ;
  }

  render() {
    const { t, toc } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{t("sidebar:navigation:TableOfCharges")}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.setState({ isLoading: true });
                this.props.checkForUpdates();
              }}
            />
          }>
          <Content padder>
            <List>
              {productTable.map((item, i) => {
                return (this.renderPost(item, i))
              })}
            </List>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: { tableOfCharges: ToCReducerState }): Partial<Props> => ({
  toc: state.tableOfCharges.data,
  isLoading: state.tableOfCharges.isLoading,
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Logout()),
  checkForUpdates: () => dispatch(checkForUpdates()),
  userResponse: (accepted: boolean) => dispatch(answerAboutChanges(accepted)),
});

export const ToCScreen = translate("common")(
  connect(mapStateToProps, mapDispatchToProps)(TableOfCharges),
);
