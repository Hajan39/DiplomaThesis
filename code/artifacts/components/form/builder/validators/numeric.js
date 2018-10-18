export const numeric = value => (value && /[^0-9]/.test(value) ? "ONLY_NUMBERS" : false);
