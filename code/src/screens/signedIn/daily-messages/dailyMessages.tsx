import React from "react";
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

import FAIcon from "react-native-vector-icons/FontAwesome";

import { Picker, Item, Label, Input, Radio, InputGroup } from "native-base";
import { List, ListItem } from "native-base";
import { translate } from "react-i18next";

import { connect } from "react-redux";

import { Props } from "./props";
import { StyleSheet, Alert } from "react-native";
import { FormComponent } from "../../../components/form/builder/form";
import Communications from 'react-native-communications';

import { Form as FormModel } from "../../../models";
import { getFormValues } from "redux-form";
import formValueSelector from "redux-form/lib/formValueSelector";

// import formSettings from '../../../../assetst/example.forms.json'

// tslint:disable-next-line:no-var-requires
const formSettings: any = require("../../../../assets/mockdata/example.Results.json");
const basicData = require("../../../../assets/mockdata/exapmle.basicData.json");

class DailyMessages extends React.Component<Props, { picked: string }> {
  constructor(props: Props) {
    super(props);
    this.state = { picked: null };
  }

  sendDailyReport() {
    const text = Object.keys(this.props.FormState.values).map(key => this.props.FormState.values[key]).join("#")

    Communications.text(basicData.companyPhone, '#RES#' + text)
    
    Alert.alert(
      this.props.t("dailyMessages:Header"),
      this.props.t("dailyMessages:Body"),
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )

    
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
            <Title>{t("sidebar:navigation:DailyMessages")}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.sendDailyReport()}>

              <Icon name="paper-plane" />
            </Button>
          </Right>
        </Header>
        <Content>
          <FormComponent formName="dailyMessage" formMetadata={formSettings.DailyMessage} />
          <Button block onPress={() => this.sendDailyReport()}>
            <Text>{t("dailyMessages:Send")}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 17,
    paddingBottom: 10,
  },
});
const mapStateToProps = (state): Partial<Props> => ({
  FormState: state.form.Form
})
export const DailyMessagesScreen = translate("common")(
  connect(mapStateToProps)(DailyMessages)
);
