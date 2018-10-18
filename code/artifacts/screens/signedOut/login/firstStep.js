import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Form, CardItem, Toast, Button, View, Text, } from "native-base";
import { reduxForm, focus } from "redux-form";
import { translate } from "react-i18next";
import { StartFirstStep } from "../../../reducers/login";
import { required, minLength6, numeric, minLength4 } from "./validators";
import styles from "./styles";
import { CustomField, Input } from "../../../components";
const FORM_NAME = "login_1st";
class LoginFirst extends Component {
    login() {
        if (this.props.valid === true) {
            this.props.initiateLoginProcess();
        }
        else {
            Toast.show({
                text: this.props.t("ENTER_VALID_CREDENTIALS"),
                duration: 10000,
                position: "top",
                textStyle: { textAlign: "center" },
            });
        }
    }
    _focusNextField(nextField) {
        this.refs[nextField].ref.wrappedInstance.ref.getWrappedInstance().focus();
    }
    render() {
        const { t } = this.props;
        return (<Card style={styles.internalContainer}>
        <CardItem>
          {this.props.errorMessage ? (<View>
              <Text style={{ color: "#d30", fontSize: 18 }}>
                {t(`loginErrors:${this.props.errorMessage}:title`)}
              </Text>
              <Text style={{ color: "#d30", fontSize: 14 }}>
                {t(`loginErrors:${this.props.errorMessage}:subtitle`)}
              </Text>
            </View>) : null}
        </CardItem>
        <CardItem cardBody>
          <Form style={{ width: "100%" }}>
            <CustomField name="representativeId" ref="representativeId" label={t("REPRESENTATIVE_ID")} withRef placeholder="15000001" onSubmit={() => this._focusNextField("phoneNumber")} returnKeyType="next" keyboardType="numeric" component={Input} validate={[required, numeric, minLength4]}/>
            <CustomField name="phoneNumber" ref="phoneNumber" placeholder="+36203391540" withRef label={t("PHONE_NUMBER")} onSubmit={() => this.login()} returnKeyType="done" keyboardType="phone-pad" component={Input} validate={[required, minLength6]}/>
            <View padder>
              <Button onPress={this.onClicked.bind(this)}>
                <Text>{t("LOGIN")}</Text>
              </Button>
            </View>
          </Form>
        </CardItem>
      </Card>);
    }
    onClicked(e) {
        this.props.initiateLoginProcess();
    }
}
const mapStateToProps = ({ login }) => ({
    isLoading: login.loading,
    errorMessage: login.errorMessage,
    initialValues: {
        phoneNumber: login.phoneNumber,
        representativeId: login.representativeId,
    },
});
const mapDispatchToProps = dispatch => ({
    initiateLoginProcess: () => dispatch(StartFirstStep()),
    focusToField: fieldName => dispatch(focus(FORM_NAME, fieldName)),
});
export const LoginFirstStep = translate("common")(connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: FORM_NAME })(LoginFirst)));
