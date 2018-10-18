import { Normalizer } from "redux-form";

export const numberNormalizer: Normalizer = ({ currency }) => value => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    return value;
  }
  const x = `${numericValue.toLocaleString("hu-HU")}`;
  console.log(x);
  return x;
};
