import React from "react";
import { Text, Header, Container, Content, Left, Right, Icon, Body, Title, Button, } from "native-base";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { StyleSheet, Alert } from "react-native";
import { FormComponent } from "../../../components/form/builder/form";
import Communications from 'react-native-communications';
// import formSettings from '../../../../assetst/example.forms.json'
// tslint:disable-next-line:no-var-requires
const formSettings = require("../../../../assets/mockdata/example.Results.json");
const basicData = require("../../../../assets/mockdata/exapmle.basicData.json");
class DailyMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { picked: null };
    }
    sendDailyReport() {
        const text = Object.keys(this.props.FormState.values).map(key => this.props.FormState.values[key]).join("#");
        Communications.text(basicData.companyPhone, '#RES#' + text);
        Alert.alert(this.props.t("dailyMessages:Header"), this.props.t("dailyMessages:Body"), [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ], { cancelable: false });
    }
    render() {
        const { t } = this.props;
        return (<Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu"/>
            </Button>
          </Left>
          <Body>
            <Title>{t("sidebar:navigation:DailyMessages")}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.sendDailyReport()}>

              <Icon name="paper-plane"/>
            </Button>
          </Right>
        </Header>
        <Content>
          <FormComponent formName="dailyMessage" formMetadata={formSettings.DailyMessage}/>
          <Button block onPress={() => this.sendDailyReport()}>
            <Text>{t("dailyMessages:Send")}</Text>
          </Button>
        </Content>
      </Container>);
    }
}
const styles = StyleSheet.create({
    listItem: {
        marginLeft: 0,
        paddingLeft: 17,
        paddingBottom: 10,
    },
});
const mapStateToProps = (state) => ({
    FormState: state.form.Form
});
export const DailyMessagesScreen = translate("common")(connect(mapStateToProps)(DailyMessages));
