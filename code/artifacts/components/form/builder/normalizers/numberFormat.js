export const numberNormalizer = ({ currency }) => value => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
        return value;
    }
    const x = `${numericValue.toLocaleString("hu-HU")}`;
    console.log(x);
    return x;
};
