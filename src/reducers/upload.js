import { IMG_UPLOAD } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case IMG_UPLOAD:
      return action.payload.data;
    default:
      return state;
  }
}
