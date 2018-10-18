import React, { Component, FormEventHandler } from "react";
import { connect } from "react-redux";
import { Image, StyleSheet, TextInput } from "react-native";
import {
  Container,
  Card,
  Form,
  CardItem,
  Item,
  Icon,
  Toast,
  Label,
  Button,
  View,
  Text,
} from "native-base";

import FAIcon from "react-native-vector-icons/FontAwesome";

import { reduxForm, InjectedFormProps, formValues, focus } from "redux-form";
import { NavigationActions } from "react-navigation";
import { translate, InjectedTranslateProps, InjectedI18nProps } from "react-i18next";
import { StartFirstStep } from "../../../reducers/login";
import { LoginReducerState, Steps } from "../../../reducers/login/login.reducer.types";
import { required, minLength6, numeric, minLength4 } from "./validators";
import { i18n } from "../../../i18n";
import styles from "./styles";
import { CustomField, Input } from "../../../components";

interface StateProps extends InjectedTranslateProps, InjectedFormProps {
  valid: boolean;
  initialValues: any;
  isLoading?: boolean;
  errorMessage?: string;
}

interface DispatchProps extends InjectedTranslateProps {
  initiateLoginProcess: () => void;
  focusToField: (fieldName: string) => void;
}

interface Props extends DispatchProps, StateProps {}

const FORM_NAME = "login_1st";

class LoginFirst extends Component<Props> {
  login() {
    if (this.props.valid === true) {
      this.props.initiateLoginProcess();
    } else {
      Toast.show({
        text: this.props.t("ENTER_VALID_CREDENTIALS"),
        duration: 10000,
        position: "top",
        textStyle: { textAlign: "center" },
      });
    }
  }

  _focusNextField(nextField) {
    (this.refs[nextField] as any).ref.wrappedInstance.ref.getWrappedInstance().focus();
  }

  render() {
    const { t } = this.props;
    return (
      <Card style={styles.internalContainer}>
        <CardItem>
          {this.props.errorMessage ? (
            <View>
              <Text style={{ color: "#d30", fontSize: 18 }}>
                {t(`loginErrors:${this.props.errorMessage}:title`)}
              </Text>
              <Text style={{ color: "#d30", fontSize: 14 }}>
                {t(`loginErrors:${this.props.errorMessage}:subtitle`)}
              </Text>
            </View>
          ) : null}
        </CardItem>
        <CardItem cardBody>
          <Form style={{ width: "100%" }}>
            <CustomField
              name="representativeId"
              ref="representativeId"
              label={t("REPRESENTATIVE_ID")}
              withRef
              placeholder="15000001"
              onSubmit={() => this._focusNextField("phoneNumber")}
              returnKeyType="next"
              keyboardType="numeric"
              component={Input}
              validate={[required, numeric, minLength4]}
            />
            <CustomField
              name="phoneNumber"
              ref="phoneNumber"
              placeholder="+36203391540"
              withRef
              label={t("PHONE_NUMBER")}
              onSubmit={() => this.login()}
              returnKeyType="done"
              keyboardType="phone-pad"
              component={Input}
              validate={[required, minLength6]}
            />
            <View padder>
              <Button onPress={this.onClicked.bind(this)}>
                <Text>{t("LOGIN")}</Text>
              </Button>
            </View>
          </Form>
        </CardItem>
      </Card>
    );
  }

  onClicked(e) {
    this.props.initiateLoginProcess();
  }
}

const mapStateToProps = ({ login }: { login: LoginReducerState }) => ({
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

export const LoginFirstStep = translate("common")(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm<Props, any>({ form: FORM_NAME })(LoginFirst),
  ),
);
