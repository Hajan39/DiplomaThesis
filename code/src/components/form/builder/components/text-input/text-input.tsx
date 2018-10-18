import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { View, Item, Label, Text, Icon, Input as NativeBaseInput } from "native-base";
import {
  INumberInputMetadata,
  ITextInputMetadata,
  IconLibraries,
  IFieldIcon,
} from "../../../../../models";

import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";

import { styles } from "../styles";
import { WrappedFieldProps, WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

interface Props
  extends InjectedTranslateProps,
    WrappedFieldProps,
    WrappedFieldInputProps,
    WrappedFieldMetaProps {
  metadata: ITextInputMetadata | INumberInputMetadata;
  formName: string;
  onSubmit?: () => void;
  groupName?: string;
}

interface State {
  value?: any;
}

export class TextInput extends Component<Props> {
  private input: any;
  constructor(props: Props) {
    super(props);
  }

  public focus(): void {
    this.input._root.focus();
  }

  renderIcon(icon: IFieldIcon) {
    switch (icon.library) {
      case "FontAwesome":
        return <FontAwesomeIcons name={icon.name} style={icon.style} />;
      case "MaterialIcon":
        return <MaterialIcons name={icon.name} style={icon.style} />;
      case "Entypo":
        return <Entypo name={icon.name} style={icon.style} />;
      case "EvilIcons":
        return <EvilIcons name={icon.name} style={icon.style} />;
      case "Feather":
        return <Feather name={icon.name} style={icon.style} />;
      case "Foundation":
        return <Foundation name={icon.name} style={icon.style} />;
      case "Ionicons":
        return <Ionicons name={icon.name} style={icon.style} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={icon.name} style={icon.style} />;
      case "Octicons":
        return <Octicons name={icon.name} style={icon.style} />;
      case "SimpleLineIcons":
        return <SimpleLineIcons name={icon.name} style={icon.style} />;
      case "Zocial":
        return <Zocial name={icon.name} style={icon.style} />;
      default:
        return null;
    }
  }

  render() {
    const {
      t,
      input,
      groupName,
      metadata,
      onSubmit,
      meta: { touched, error, active },
    } = this.props;
    const defaultValue = metadata.defaultValue || "";

    // Initialize label from metadata, or search in translation, or fallback to field name
    const label = metadata.label || t(this.getKey(metadata.name, "labels")) || metadata.name;
    // Initialize placeholder from metadata, or search translation
    const placeholder = metadata.placeholder || t(this.getKey(metadata.name, "placeholders"));

    return (
      <View style={{ paddingTop: active ? 5 : 0, margin: 5 }}>
        <Item
          error={touched && !!error}
          success={touched && !!!error}
          inlineLabel={metadata.labelType === "inline"}
          floatingLabel={!metadata.labelType || metadata.labelType === "floating"}
          stackedLabel={metadata.labelType === "stacked"}
          placeholderLabel
          underline={!metadata.textboxType || metadata.textboxType === "underlined"}
          style={{ flexDirection: metadata.labelType !== "inline" ? "row-reverse" : "row" }}>
          <Label style={{ paddingLeft: 0, paddingTop: 5 }}>
            {metadata.icon && (!metadata.icon.place || metadata.icon.place === "left")
              ? this.renderIcon(metadata.icon)
              : null}
            <Text> {label} </Text>
            {metadata.icon && metadata.icon.place === "right"
              ? this.renderIcon(metadata.icon)
              : null}
          </Label>

          <NativeBaseInput
            returnKeyType={metadata.returnKey}
            placeholder={active ? placeholder : ""}
            withRef
            getRef={r => (this.input = r)}
            keyboardType={
              metadata.keyboardType || metadata.type === "number" ? "numeric" : "default"
            }
            onSubmitEditing={() => (onSubmit ? setTimeout(onSubmit) : null)}
            secureTextEntry={metadata.type === "password"}
            {...input as any}
          />
          {touched && !!error ? (
            <Icon type="FontAwesome" style={styles.errorStyle} name="exclamation-circle" />
          ) : null}
          {touched && !!!error ? (
            <Icon type="FontAwesome" style={styles.successStyle} name="check-circle" />
          ) : null}
        </Item>
        {touched && error ? <View>{this.renderError(error)}</View> : null}
      </View>
    );
  }

  private renderError(errorObject) {
    if (typeof errorObject === "string") {
      const text = this.props.t(errorObject) || errorObject;
      return <Text style={styles.errorStyle}>{text}</Text>;
    } else {
      return (
        <Text style={styles.errorStyle}>{this.props.t(errorObject.text, errorObject.params)}</Text>
      );
    }
  }

  private t(s: string) {
    if (s) {
      return this.props.t(s);
    }
    return null;
  }

  private tt(s: string) {
    if (s) {
      return <Text>{this.t(s)}</Text>;
    }
    return null;
  }

  private getGroup(): string {
    return this.props.groupName ? this.props.groupName : "";
  }

  private getNormalKey(s: string): string {
    return s.toUpperCase().replace(" ", "_");
  }

  private getKey(s: string, type: string): string {
    return `forms:${this.props.formName}:${this.getGroup()}:${type}:${this.getNormalKey(s)}`;
  }
}
export const TextInputComponent = translate("common", { withRef: true })(TextInput);
