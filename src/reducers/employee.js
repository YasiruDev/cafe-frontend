import { EMPLOYEE_LIST, CREATE_EMPLOYEE } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case CREATE_EMPLOYEE:
      return action.payload;
    case EMPLOYEE_LIST:
      return action.payload.data;
    default:
      return state;
  }
}
