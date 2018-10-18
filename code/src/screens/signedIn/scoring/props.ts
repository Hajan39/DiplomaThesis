import { NavigationScreenProps } from "react-navigation";
import { InjectedTranslateProps } from "react-i18next";

export interface Props extends InjectedTranslateProps, NavigationScreenProps {
  // Redux form state
  FormState: any;
}
