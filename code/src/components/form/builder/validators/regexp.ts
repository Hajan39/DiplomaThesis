import { ServerDefinedExpression } from "../../../../models";

export const regexp = (exp: ServerDefinedExpression) => value => {
  return new RegExp(exp.regExp).test(value) ? false : exp.errorMessage;
};
