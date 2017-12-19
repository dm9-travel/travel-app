import { combineReducers } from "redux";
import users from "./user_reducer.js";
import flights from "./flights_reducer.js";

export default combineReducers({
  users,
  flights
});
