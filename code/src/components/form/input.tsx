import React from "react";
import {
  Container,
  Card,
  Form,
  CardItem,
  Item,
  Input,
  Icon,
  Toast,
  Label,
  Button,
  View,
  Text,
} from "native-base";
import {
  InjectedFormProps,
  WrappedFieldProps,
  WrappedFieldInputProps,
  WrappedFieldMetaProps,
} from "redux-form";
import { Image, StyleSheet, ReturnKeyType, KeyboardType } from "react-native";
import { translate, InjectedTranslateProps } from "react-i18next";
import FAIcon from "react-native-vector-icons/FontAwesome";

interface Props
  extends InjectedTranslateProps,
    WrappedFieldProps,
    WrappedFieldInputProps,
    WrappedFieldMetaProps {
  label?: string;
  placeholder?: string;
  tabIndex?: number;
  icon?: string;
  last?: boolean;
  returnKeyType?: ReturnKeyType;
  keyboardType?: KeyboardType;
  onSubmit?: () => void;
}

class InputComponent extends React.Component<Props> {
  input: any;
  renderError(errorObject) {
    if (typeof errorObject === "string") {
      return <Text>{this.props.t(errorObject)}</Text>;
    } else {
      return <Text>{this.props.t(errorObject.text, errorObject.params)}</Text>;
    }
  }

  public focus(): void {
    this.input._root.focus();
  }

  render() {
    const {
      t,
      input,
      label,
      placeholder,
      tabIndex,
      onSubmit,
      icon,
      last,
      returnKeyType,
      keyboardType,
      meta: { touched, error, active },
    } = this.props;

    return (
      <View style={{ marginTop: 5 }}>
        <Item floatingLabel error={error && touched} last={last === true}>
          <Label style={{ paddingLeft: 0, paddingTop: 5 }}>
            <FAIcon name={icon} />
            {"  "}
            <Text>{label}</Text>
          </Label>
          <Input
            placeholder={active ? placeholder : ""}
            onSubmitEditing={() => (onSubmit ? setTimeout(onSubmit) : null)}
            withRef
            getRef={r => (this.input = r)}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            {...input as any}
          />
        </Item>
        {touched && error ? <View>{this.renderError(error)}</View> : null}
      </View>
    );
  }
}

export default translate("common", { withRef: true })(InputComponent);
