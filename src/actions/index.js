import axios from "axios";
import { BASE_URL } from "../config";
import { CLEAR_NOTIFICATION } from "./types";

axios.defaults.baseURL = BASE_URL;

export const clearNotification = function () {
  return {
    type: CLEAR_NOTIFICATION,
  };
};
