import {
  ITextInputMetadata,
  INumberInputMetadata,
  IDateInputMetadata,
  IPickerMetadata,
} from "./input.model";
import { IInputGroupMetadata } from "./inputGroup.model";

/**
 * Form object. It contains the inputs and input groups
 */
export class Form {
  fields: (
    | ITextInputMetadata
    | INumberInputMetadata
    | IDateInputMetadata
    | IPickerMetadata
    | IInputGroupMetadata)[];
}
