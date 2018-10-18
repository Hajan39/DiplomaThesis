import { Normalizer } from "redux-form";

export const phoneNumberNormalizer: Normalizer = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, "");

  if (onlyNums.length > 2) {
    let formattedValue = "+";
    for (let i = 0; i < onlyNums.length; ++i) {
      if (
        i === 2 ||
        // For phone numbers like +36-1-123-45-67
        (i === 3 && onlyNums[2] === "1") ||
        (i === 6 && onlyNums[2] === "1") ||
        (i === 8 && onlyNums[2] === "1") ||
        // For any other type of phone number
        (i === 4 && onlyNums[2] !== "1") ||
        (i === 7 && onlyNums[2] !== "1") ||
        // Only for mobile phones +36-20-xxx-yy-zz, +36-30-xxx-yy-zz, +36-70-xxx-yy-zz, +36-31-xxx-yy-zz
        ((i === 9 && onlyNums.slice(2, 4) === "20") ||
          onlyNums.slice(2, 4) === "30" ||
          onlyNums.slice(2, 4) === "70" ||
          onlyNums.slice(2, 4) === "31")
      ) {
        formattedValue += "-";
      }
      if (i > 4) {
        console.log(onlyNums.slice(2, 4));
      }
      formattedValue += onlyNums[i];
    }
    return formattedValue;
  } else {
    return `+${onlyNums}`;
  }
};
