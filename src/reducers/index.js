import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as modal } from "redux-modal";
import notificationsReducer from "./notification";
import cafeReducer from "./cafe";
import employeeReducer from "./employee";

const rootReducer = combineReducers({
  modal,
  form: formReducer,
  notifications: notificationsReducer,
  cafe: cafeReducer,
  employee: employeeReducer,
});

export default rootReducer;
