import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, StyleSheet, TextInput } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Card, Form, CardItem, Item, Icon, Toast, Label, Button, View, Text } from "native-base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { reduxForm, InjectedFormProps, formValues } from "redux-form";
import { translate, InjectedTranslateProps, InjectedI18nProps } from "react-i18next";

import styles from "./styles";
import { minLength, minLength6, required } from "./validators";
import { Input, CustomField } from "../../../components";
import { StartSecondStep, Abort, LoginReducerState, Steps } from "../../../reducers/login";

interface Props extends InjectedTranslateProps, InjectedFormProps, NavigationScreenProps {
  valid: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  verifyLoginWithCode: () => void;
  back: () => void;
}

class LoginSecond extends Component<Props> {
  verifyLogin() {
    if (this.props.valid) {
      this.props.verifyLoginWithCode();
    } else {
      Toast.show({
        text: this.props.t("ENTER_SMS_CODE"),
        duration: 10000,
        position: "top",
        textStyle: { textAlign: "center" },
      });
    }
  }

  back() {
    this.props.back();
  }

  render() {
    const { t } = this.props;

    return (
      <Card style={styles.internalContainer}>
        <CardItem header>
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
              name="smsCode"
              label={t("SMS_CODE")}
              onSubmit={() => this.verifyLogin()}
              validate={[required, minLength6]}
              keyboardType="numeric"
              component={Input}
            />
            <View padder style={{ height: 60 }}>
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}>
                <Button onPress={this.back.bind(this)}>
                  <Text>{t("BACK")}</Text>
                </Button>
                <Button primary onPress={this.verifyLogin.bind(this)}>
                  <Text>{t("LOGIN")}</Text>
                </Button>
              </View>
            </View>
          </Form>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = ({ login }: { login: LoginReducerState }) => ({
  isLoading: login.loading,
  initialValues: {
    smsCode: login.smsCode,
  },
  errorCode: login.errorCode,
  errorMessage: login.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  verifyLoginWithCode: () => dispatch(StartSecondStep()),
  back: () => dispatch(Abort()),
});

export const LoginSecondStep = translate("common")(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm<Props, any>({ form: "login_2nd" })(LoginSecond),
  ),
);
