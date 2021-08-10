import * as type from "./types";
import { saveToke, getToken, cleanToken } from "./localStorage";
import errorHandling from "./errorHandling";

import * as apiLogin from "../api/login";
import * as apiProfile from "../api/profile";

export const handleLogin = ({ email, password }, cb) => async (dispatch) => {
  try {
    const { data } = await apiLogin.handleLogin({ email, password });
    saveToke(data);
    dispatch({ type: type.LOGIN_USER, payload: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const getUser = () => async (dispatch) => {
  if (getToken()) {
    try {
      const { data } = await apiProfile.getUser();
      saveToke(data);
      dispatch({ type: type.LOGIN_USER, payload: data });
    } catch (error) {
      dispatch({ type: type.LOGOUT_USER });
      cleanToken();
    }
  } else {
    dispatch({ type: type.LOGOUT_USER });
    cleanToken();
  }
};

export const handleLogout = () => {
  cleanToken();
  return { type: type.LOGOUT_USER };
};
