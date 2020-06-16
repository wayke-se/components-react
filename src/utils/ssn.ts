export const ssnIsValid = (s?: string) => (s ? /^\d{2,4}\d{2}\d{2}\-?\d{4}$/.test(s) : false);
