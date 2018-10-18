import {
  ITextInputMetadata,
  IDateInputMetadata,
  IPickerMetadata,
  INumberInputMetadata,
} from "./input.model";

/**
 * Declares an input group with a title on the top
 */
export class IInputGroupMetadata {
  /**
   * Type constant
   */
  type: "inputGroup";

  /**
   * Name of input group
   */
  name: string;

  /**
   * Label of the group
   */
  label?: string;

  /**
   * Order on form
   */
  order?: number;

  /**
   * Fields which will be included in this group
   */
  fields: (ITextInputMetadata | INumberInputMetadata | IDateInputMetadata | IPickerMetadata)[];
}
