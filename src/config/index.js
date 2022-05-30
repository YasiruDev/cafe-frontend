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
  EMPLOYEE: "Employee",
};

export const BUTTON = {
  ADD_CAFE: "Add Cafe",
  ADD_EMPLOYEE: "Add Employee",
};

export const MODAL = {
  ADD_CAFE: "MODAL_ADD_CAFE",
  ADD_EMPLOYEE: "MODAL_ADD_EMPLOYEE",
};
export const ROUTES = {
  CAFE: "/cafe",
  EMPLOYEE: "/employee",
};
export const VALIDATION = {
  REQUIRED: "Required !",
};
export const DROPDOWN = {
  GENDER: [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ],
};
export const validateEmail = (from, to) => {
  return moment.duration(from.diff(to)).asDays();
};
