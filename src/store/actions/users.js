import * as type from "./types";
import { cleanToken } from "./localStorage";
import errorHandling from "./errorHandling";
import * as apiUser from "../api/user";

export const getUsers = (pageAtual, limit) => async (dispatch) => {
  try {
    const { data } = await apiUser.getUsers(pageAtual, limit);
    dispatch({ type: type.GET_USERS, payload: data });
  } catch (error) {
    errorHandling(error);
  }
};

export const getViewUser = (id) => async (dispatch) => {
  try {
    const { data } = await apiUser.getViewUser(id);
    dispatch({ type: type.GET_USER, payload: data });
  } catch (error) {
    errorHandling(error);
  }
};

export const postUser = (userData, cb) => async () => {
  try {
    const { data } = await apiUser.postUser(userData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const putUser = (userData, cb) => async () => {
  try {
    const { data } = await apiUser.putUser(userData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const deleteUser = (_id, cb) => async () => {
  try {
    const { data } = await apiUser.deleteUser(_id);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const viewPerfil = (cb) => async (dispatch) => {
  try {
    const { data } = await apiUser.viewPerfil();
    dispatch({ type: type.LOGIN_USER, payload: data });
    cb({ erro: data });
  } catch (error) {
    dispatch({ type: type.LOGOUT_USER });
    cb(errorHandling(error));
  }
};
export const putPerfil = (userData, cb) => async () => {
  try {
    const { data } = await apiUser.putPerfil(userData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const putPerfilFoto = (userData, cb) => async () => {
  try {
    const { data } = await apiUser.putPerfilFoto(userData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const putPerfilSenha = (userData, cb) => async () => {
  try {
    const { data } = await apiUser.putPerfilSenha(userData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const recuperarSenha = (userData, cb) => async () => {
  try {
    const { data } = await apiUser.recuperarSenha(userData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const validarChave = (key, cb) => async () => {
  try {
    const { data } = await apiUser.validarChave(key);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const atualizarSenha = (userData, cb) => async (dispatch) => {
  try {
    const { data } = await apiUser.atualizarSenha(userData);
    cleanToken();
    dispatch({ type: type.LOGOUT_USER });
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const limparUser = () => {
  return function (dispatch) {
    dispatch({ type: type.LIMPAR_USER });
  };
};

export const limparUsers = () => {
  return function (dispatch) {
    dispatch({ type: type.LIMPAR_USERS });
  };
};
