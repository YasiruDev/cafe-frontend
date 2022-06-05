import moment from "moment";

export const BASE_URL = process.env.REACT_APP_API_URL;
export const APP_NAME = process.env.REACT_APP_APP_NAME;
export const STRING = {
  BANNER: "Banner",
  ACTIVE: "Active",
  DEACTIVE: "Deactive",
  ADD_CAFE: "Register New Cafe",
  ADD_EMPLOYEE: "Register New Employee",
};

export const PAGE_TITLE = {
  CAFE: "Cafe`s",
  NEW_CAFE: "New Cafe",
  NEW_EMPLOYEE: "New Employee",
  EMPLOYEE: "Employee",
};

export const BUTTON = {
  ADD_CAFE: "Add New Café",
  ADD_EMPLOYEE: "Add New Employee",
};

export const MODAL = {
  ADD_CAFE: "MODAL_ADD_CAFE",
  ADD_EMPLOYEE: "MODAL_ADD_EMPLOYEE",
};
export const ROUTES = {
  CAFE: "/cafe",
  NEW_CAFE: "/new-cafe",
  EMPLOYEE: "/employee",
  NEW_EMPLOYEE: "/new-employee",
  UPLOADS: "uploads",
};
export const VALIDATION = {
  REQUIRED: "Required !",
  INVAL_EMAIL: "Invalid Email !",
};
export const DROPDOWN = {
  GENDER: [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ],
};
export const validateDateDifference = (from, to) => {
  return moment.duration(from.diff(to)).asDays();
};

export const validateEmail = (email) => {
  return !/\S+@\S+\.\S+/.test(email);
};
