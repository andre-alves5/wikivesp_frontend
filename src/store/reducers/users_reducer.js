import {
  GET_USERS,
  GET_USER,
  LIMPAR_USER,
  LIMPAR_USERS,
} from "../actions/types";

// eslint-disable-next-line
export default (state = {}, actions) => {
  switch (actions.type) {
    case GET_USERS:
      return {
        ...state,
        users: actions.payload.users,
      };
    case GET_USER:
      return {
        ...state,
        userDetails: actions.payload.user,
      };
    case LIMPAR_USERS:
      return {
        ...state,
        users: null,
      };
    case LIMPAR_USER:
      return {
        ...state,
        userDetails: null,
      };
    default:
      return state;
  }
};
