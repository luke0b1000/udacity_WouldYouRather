import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import users from "./users";
import authUser from "./authUser";
import questions from "./questions";
import comments from "./comments";
import progressBar from "./progressBar";

export default combineReducers({
  authUser,
  users,
  questions,
  comments,
  progressBar,
  loadingBar: loadingBarReducer
});
