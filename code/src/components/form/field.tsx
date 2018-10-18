import React from "react";

import { Field, BaseFieldProps } from "redux-form";
import { ReturnKeyType, KeyboardType } from "react-native";

interface Props extends BaseFieldProps {
  placeholder?: string;
  label?: string;
  icon?: string;
  returnKeyType?: ReturnKeyType;
  keyboardType?: KeyboardType;
  onSubmit?: () => void;
}

export class CustomField extends Field<Props> {}
