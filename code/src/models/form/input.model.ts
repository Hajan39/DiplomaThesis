import {
  KeyboardTypeAndroid,
  KeyboardTypeIOS,
  KeyboardType,
  ReturnKeyType,
  ReturnKeyTypeAndroid,
  ReturnKeyTypeIOS,
  TextStyle,
} from "react-native";

import { Normalizer as ReduxFormNormalizer } from "redux-form";
import { IFieldIcon } from "./icon.model";

export class ServerDefinedExpression {
  regExp: string;
  errorMessage: string;
  static isExpression(object: any): object is ServerDefinedExpression {
    return typeof object !== "string" && "regExp" in object;
  }
}

/**
 * Available implementations
 */
export type NormalizerTypes = "numberNormalizer" | "phoneNumberNormalizer";

/**
 * Normalizer for input fields (like text/number)
 */
export class Normalizer {
  /**
   * Normalizer implementation
   * @required
   */
  name: NormalizerTypes | string;

  /**
   * Parameters (if have any)
   */
  parameters?: any;

  static isNormalizer(object: any): object is Normalizer {
    return typeof object !== "string" && "regExp" in object;
  }
}

export type Validator = "alphanumeric" | "numeric" | "required" | ServerDefinedExpression;

/**
 * Available types of input fields
 */
export type InputFieldType =
  | "text"
  | "password"
  | "number"
  | "date"
  | "picker"
  | "picker-list"
  | "inputGroup";

export interface IInputMetadata {
  /**
   * Type of Input field
   * @required
   * @order 0
   */
  type: InputFieldType;

  /**
   * Name of input field
   * @required
   * @order 1
   */
  name: string;

  /**
   * Label of input field
   * @default ""
   */
  label?: string;

  /**
   * Hint text showed on form
   * @default ""
   */
  hint?: string;

  /**
   * Is the field required?
   * @default false
   * @TJS-type boolean
   */
  required?: boolean;

  /**
   * Order on form
   * @default 0
   * @minimum 0
   * @TJS-type integer
   */
  order?: number;

  /**
   * Default value on field
   * @example "sajt"
   */
  defaultValue?: any;

  /**
   * Validators for field
   */
  validators?: Validator[];
}

export interface ITextBox {
  /**
   * Type of upcoming keyboard
   */
  keyboardType?: KeyboardType;

  /**
   * Type of return key on keyboard
   */
  returnKey?: ReturnKeyType;

  /**
   * Type of label
   * @default "floating"
   */
  labelType?: "stacked" | "floating" | "inline";

  /**
   * Type of textbox border
   * @default "underlined"
   */
  textboxType?: "rounded" | "underlined" | "regular";

  /**
   * Icon for the field
   */
  icon?: IFieldIcon;

  /**
   * Normalizers for field
   */
  normalizer?: Normalizer;
}

export interface IPlaceholder {
  /**
   * Placeholder text showed in input when it's empty
   * @default ""
   */
  placeholder?: string;
}

export interface ILength {
  /**
   * Minimum length of input
   * @default 0
   * @minimum 0
   * @TJS-type integer
   */
  minLength?: number;

  /**
   * Maximum length of input
   * @default null
   * @minimum 1
   * @TJS-type integer
   */
  maxLength?: number;
}

/**
 * Input metadata for TextField inputs
 */
export interface ITextInputMetadata extends IInputMetadata, ITextBox, IPlaceholder, ILength {
  /**
   * Type constant
   */
  type: "text" | "password";

  /**
   * Default value (if exists)
   */
  defaultValue?: string;

  /**
   * true if multiline text input
   * @default false
   */
  multiline?: boolean;

  /**
   * AutoCapitalize keyboard input
   * @default "none"
   */
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

/**
 * NumberInput field on form
 */
export interface INumberInputMetadata extends IInputMetadata, ITextBox, IPlaceholder {
  /**
   * Type of Input field is restricted to 'number'
   * @required
   */
  type: "number";

  /**
   * DefaultValue's type is restricted to be a number
   */
  defaultValue?: number;
  /**
   * Mimimum value to set
   */
  minimumValue?: number;

  /**
   * Maximum value to set
   */
  maximumValue?: number;

  /**
   * restrict keyboardType for numeric input
   * @default "numeric"
   */
  keyboardType?: "numeric" | "phone-pad";
}

/**
 * NumberInput field on form
 */
export interface IDateInputMetadata extends IInputMetadata, ITextBox, IPlaceholder {
  /**
   * Type of DateInput is restricted to 'date'
   * @required
   */
  type: "date";

  /**
   * Mimimum value to set
   */
  minimumValue?: Date;

  /**
   * Maximum value to set
   */
  maximumValue?: Date;
}

export interface IPickerOptions {
  /**
   * Value of option
   * @required
   */
  value: any;
  /**
   * Label of option
   * @required
   */
  label: string;
  /**
   * Disable option
   * @default false
   */
  disabled?: boolean;
}

/**
 * Native Picker field on form (dropdown)
 */
export interface IPickerMetadata extends IInputMetadata {
  /**
   * 'type' of PickerInput is restricted to 'picker'
   */
  type: "picker" | "picker-list";

  /**
   * Options which will be selectable
   * @required
   */
  options: IPickerOptions[];
}
