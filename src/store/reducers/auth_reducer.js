import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

// eslint-disable-next-line
export default (state = {}, actions) => {
  switch (actions.type) {
    case LOGIN_USER:
      return {
        ...state,
        usuario: actions.payload.user,
        authorized: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        usuario: null,
        authorized: false,
      };
    default:
      return state;
  }
};
