import axios from "axios";
import { getHeaders } from "../actions/localStorage";

const url = process.env.REACT_APP_API_URL;

export const getUsers = (pageAtual, limit) =>
  axios.get(url + `/users?page=${pageAtual}&limit=${limit}`, getHeaders());

export const getViewUser = (id) =>
  axios.get(url + `/users/${id}`, getHeaders());

export const postUser = (userData) => axios.post(url + `/users`, userData);

export const putUser = (userData) =>
  axios.put(url + `/users`, userData, getHeaders());

export const deleteUser = (_id) =>
  axios.delete(url + `/users/${_id}`, getHeaders());

export const viewPerfil = () => axios.get(url + "/profile", getHeaders());

export const putPerfil = (userData) =>
  axios.put(url + "/profile", userData, getHeaders());

export const putPerfilFoto = (userData) =>
  axios.put(url + "/profileimage", userData, getHeaders());

export const putPerfilSenha = (userData) =>
  axios.put(url + "/profile", userData, getHeaders());

export const recuperarSenha = (userData) =>
  axios.post(url + "/passwordrecovery", userData, getHeaders());

export const validarChave = (key) =>
  axios.get(url + `/passwordrecovery/${key}`);

export const atualizarSenha = (userData) =>
  axios.put(url + `/passwordrecovery`, userData);
