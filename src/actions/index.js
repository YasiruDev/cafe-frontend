import axios from "axios";
import { BASE_URL } from "../config";
import { CREATE_CAFE, CAFE_LIST, CLEAR_NOTIFICATION, SHOW_NOTIFICATION } from "./types";

axios.defaults.baseURL = BASE_URL;

export function addNewCafe(data) {
  return function (dispatch) {
    const url = `api/v1/cafes`;
    axios
      .post(url, data)
      .then(({ data }) => {
        if (data.status) {
          dispatch({
            type: CREATE_CAFE,
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

export function getCafeList(data) {
  return function (dispatch) {
    const url = `api/v1/cafes`;
    axios
      .get(url)
      .then(({ data }) => {
        if (data.status) {
          dispatch({
            type: CAFE_LIST,
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

export const clearNotification = function () {
  return {
    type: CLEAR_NOTIFICATION,
  };
};
