import { getLocalStorageItem } from "./Services/localStorage";

export const roundNumber = (number, sep) => +number.toFixed(sep);

export const formatPrice = (number) => number.toLocaleString("ru");

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

export const isUndefined = (value) => value === void 0;

export const removeArrayDuplicates = (array) =>
  array.filter((item, index) => array.indexOf(item) === index);

export const removeArrayUndefined = (array) =>
  array.filter((item) => item !== void 0);

export const getQueryParams = () => ({
  WBToken: getLocalStorageItem("WBToken"),
  "x-supplier-id-external": getLocalStorageItem("x-supplier-id-external"),
});
