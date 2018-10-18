import React from "react";

import { Field, BaseFieldProps } from "redux-form";
import { ITextInputMetadata, INumberInputMetadata } from "../../../../../models";

interface Props extends BaseFieldProps {
  onSubmit?: () => void;
  metadata: ITextInputMetadata | INumberInputMetadata;
  groupName?: string;
  formName: string;
}

export class TextField extends Field<Props> {}
