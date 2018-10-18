export const alphanumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? "ONLY_ALPHANUMERIC_CHARACTERS" : undefined;
