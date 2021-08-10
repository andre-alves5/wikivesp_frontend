import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import userReducer from "./users_reducer";
import articleReducer from "./articles_reducer";

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  article: articleReducer,
});

export default reducers;
