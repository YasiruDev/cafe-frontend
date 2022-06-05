import axios from "axios";
import { BASE_URL } from "../config";
import { CREATE_EMPLOYEE, EMPLOYEE_LIST, SHOW_NOTIFICATION } from "./types";

axios.defaults.baseURL = BASE_URL;

export function addNewEmployee(data, handleRedirect) {
  return function (dispatch) {
    const url = `api/v1/employees`;
    axios
      .post(url, data)
      .then(({ data }) => {
        if (data.status) {
          dispatch({
            type: SHOW_NOTIFICATION,
            payload: { type: "success", message: data.friendly_message },
          });
          setTimeout(() => {
            handleRedirect();
          }, 500);
          dispatch(getEmployeeList());
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

export function getEmployeeList(cafeId) {
  return function (dispatch) {
    const filter = cafeId ? `?cafeId=${cafeId}` : "";
    const url = `api/v1/employees${filter}`;
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

export function updateEmployee(data, handleRedirect) {
  return async function (dispatch) {
    const url = `api/v1/employees`;
    try {
      const newcafe = await axios.put(url, data);
      if (newcafe.data.status) {
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: { type: "success", message: newcafe.data.friendly_message },
        });
        setTimeout(() => {
          handleRedirect();
        }, 500);
        dispatch(getEmployeeList());
      }
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { type: "warning", message: error.response?.data.friendly_message },
      });
    }
  };
}
