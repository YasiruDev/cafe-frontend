import axios from "axios";
import { BASE_URL } from "../config";
import { CREATE_EMPLOYEE, EMPLOYEE_LIST, SHOW_NOTIFICATION } from "./types";

axios.defaults.baseURL = BASE_URL;

export function addNewEmployee(data) {
  return function (dispatch) {
    const url = `api/v1/employees`;
    axios
      .post(url, data)
      .then(({ data }) => {
        if (data.status) {
          dispatch(getEmployeeList());
          dispatch({
            type: SHOW_NOTIFICATION,
            payload: { type: "success", message: data.friendly_message },
          });
        } else {
          dispatch({
            type: SHOW_NOTIFICATION,
            payload: { type: "warning", message: data.friendly_message },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: { type: "warning", message: error.response?.data.friendly_message },
        });
      });
  };
}

export function getEmployeeList() {
  return function (dispatch) {
    const url = `api/v1/employees`;
    axios
      .get(url)
      .then(({ data }) => {
        if (data.status) {
          dispatch({
            type: EMPLOYEE_LIST,
            payload: data,
          });
        } else {
          dispatch({
            type: SHOW_NOTIFICATION,
            payload: { type: "warning", message: data.friendly_message.message },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: { type: "warning", message: error.response?.data.friendly_message },
        });
      });
  };
}
