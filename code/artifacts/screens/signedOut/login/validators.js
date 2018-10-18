export const required = value => (value ? undefined : "FIELD_REQUIRED");
export const maxLength = max => value => value && value.length > max ? { text: "MAX_LENGTH", params: { COUNT: max } } : undefined;
export const minLength = min => value => value && value.length < min ? { text: "MIN_LENGTH", params: { COUNT: min } } : undefined;
export const minLength1 = minLength(1);
export const minLength4 = minLength(4);
export const minLength6 = minLength(6);
export const minLength12 = minLength(12);
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
export const numeric = value => (value && /[^0-9]/.test(value) ? "ONLY_NUMBERS" : false);
export const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value) ? "Only alphanumeric characters" : undefined;
