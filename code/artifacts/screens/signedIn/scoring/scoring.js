import React from "react";
import { Text, Header, Container, Content, Left, Right, Icon, Body, Title, Button } from "native-base";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { StyleSheet, Alert } from "react-native";
import { FormComponent } from "../../../components/form/builder/form";
import Communications from 'react-native-communications';
// import formSettings from '../../../../assetst/example.forms.json'
// tslint:disable-next-line:no-var-requires
const formSettings = require("../../../../assets/mockdata/example.forms.json");
const basicData = require("../../../../assets/mockdata/exapmle.basicData.json");
class Scoring extends React.Component {
    constructor(props) {
        super(props);
        this.state = { picked: null };
    }
    sendScoring() {
        const text = Object.keys(this.props.FormState.values).map(key => this.props.FormState.values[key]).join("#");
        Communications.text(basicData.companyPhone, '#SCOR#' + text);
        Alert.alert(this.props.t("scoring:sent:header"), this.props.t("scoring:sent:body"), [
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
            <Title>{t("sidebar:navigation:Scoring")}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.sendScoring()}>
              <Icon name="paper-plane"/>
            </Button>
          </Right>
        </Header>
        <Content>
          <FormComponent formName="scoring" formMetadata={formSettings.Scoring}/>
          <Button block onPress={() => this.sendScoring()}>
            <Text>{t("scoring:send")}</Text>
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
// For get the ReduxForm values, you have to use the redux-connect method, and map the redux state to your component's state, like this: 
// The "state" is the redux state, there will be a "form" structure in it, and in that form structure,
// you'll have your Form (it will be the name of your form anyway, you can't create it dinamically)
// If you want to see, what your redux state is, easily navigate to: http://127.0.0.1/debugger-ui/ 
// there will be some kind of debug-ui for react-redux, and you'll be able to see what your application state is :)
const mapStateToProps = (state) => ({
    FormState: state.form.Form
});
export const ScoringScreen = translate("common")(connect(mapStateToProps)(Scoring));
