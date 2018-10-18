import { TextStyle } from "react-native";

export type IconLibraries =
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcon"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

/**
 * Structure for provide Icons to the application's fields
 */
export interface IFieldIcon {
  /**
   * Choosen Icon library
   * @required
   */
  library: IconLibraries;

  /**
   * Choosen icon's name from the library
   * @required
   */
  name: string;

  /**
   * Icon's place in box
   */
  place?: "left" | "right";

  /**
   * CSS properties
   */
  style?: TextStyle;
}
