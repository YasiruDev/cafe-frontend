import { CAFE_LIST, CREATE_CAFE } from "./../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case CREATE_CAFE:
      return action.payload;
    case CAFE_LIST:
      return action.payload.data;
    default:
      return state;
  }
}
