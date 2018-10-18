export const regexp = (exp) => value => {
    return new RegExp(exp.regExp).test(value) ? false : exp.errorMessage;
};
