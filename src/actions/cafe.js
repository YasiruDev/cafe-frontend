import axios from "axios";
import { BASE_URL } from "../config";
import { CREATE_CAFE, CAFE_LIST, SHOW_NOTIFICATION, IMG_UPLOAD } from "./types";

axios.defaults.baseURL = BASE_URL;

export function addNewCafe(data, handleRedirect) {
  return async function (dispatch) {
    const url = `api/v1/cafes`;
    try {
      const newcafe = await axios.post(url, data);
      if (newcafe.data.status) {
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: { type: "success", message: newcafe.data.friendly_message },
        });
        setTimeout(() => {
          handleRedirect();
        }, 500);
        dispatch(getCafeList());
      }
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { type: "warning", message: error.response?.data.friendly_message },
      });
    }
  };
}

export function getCafeList() {
  return async function (dispatch) {
    const url = `api/v1/cafes`;
    try {
      const newcafe = await axios.get(url);
      if (newcafe.data.status) {
        dispatch({
          type: CAFE_LIST,
          payload: newcafe.data,
        });
      }
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { type: "warning", message: error.response?.data.friendly_message },
      });
    }
  };
}

export function updateCafe(data, handleRedirect) {
  return async function (dispatch) {
    const url = `api/v1/cafes`;
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
        dispatch(getCafeList());
      }
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { type: "warning", message: error.response?.data.friendly_message },
      });
    }
  };
}

export function uploadImage(data) {
  return async function (dispatch) {
    const url = `api/v1/cafes/imageUpload`;
    try {
      const newcafe = await axios.post(url, data);
      if (newcafe.data.status) {
        dispatch({
          type: IMG_UPLOAD,
          payload: newcafe.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { type: "warning", message: error.response?.data.friendly_message },
      });
    }
  };
}
