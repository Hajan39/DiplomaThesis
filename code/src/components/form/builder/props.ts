import { NativeBase } from "native-base";
import { InjectedTranslateProps, InjectedI18nProps } from "react-i18next";

import { Form } from "../../../models";

export interface Props extends InjectedTranslateProps {
  formMetadata: Form;
  formName: string;
  initialValues: any;
  valid: boolean;
}
