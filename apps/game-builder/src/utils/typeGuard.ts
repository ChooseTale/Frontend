export const isString = (value: any): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: any): value is number => {
  return typeof value === "number";
};

export const isBoolean = (value: any): value is boolean => {
  return typeof value === "boolean";
};

export const isDate = (value: any): value is Date => {
  return value instanceof Date;
};
