import axios from "axios";
import { getHeaders } from "../actions/localStorage";

const url = process.env.REACT_APP_API_URL;

export const getAllArticles = (pageAtual, limit) =>
  axios.get(
    url + `/allarticles?page=${pageAtual}&limit=${limit}`,
    getHeaders()
  );

export const getMyArticles = (idAutor, pageAtual, limit) =>
  axios.get(
    url + `/myarticles/${idAutor}?page=${pageAtual}&limit=${limit}`,
    getHeaders()
  );

export const postArticle = (articleData) =>
  axios.post(url + `/articles/`, articleData, getHeaders());

export const putArticle = (articleData) =>
  axios.put(url + `/articles`, articleData, getHeaders());

export const putArticleBody = (articleBodyData) =>
  axios.put(url + `/articledetails`, articleBodyData, getHeaders());

export const deleteArticle = (idAutor) =>
  axios.delete(url + `/articles/${idAutor}`, getHeaders());

export const getArticle = (idArticle) =>
  axios.get(url + `/articles/${idArticle}`, getHeaders());

export const getArticleDetails = (idArticle) =>
  axios.get(url + `/articledetails/${idArticle}`, getHeaders());

export const getArticleDetail = (idSubTitulo) =>
  axios.get(url + `/articledetail/${idSubTitulo}`, getHeaders());

export const deleteArticleDetail = (idSubTitulo) =>
  axios.delete(url + `/articledetails/${idSubTitulo}`, getHeaders());

export const putArticleImage = (idSubTitulo, articleData) =>
  axios.put(url + `/articleimage/${idSubTitulo}`, articleData, getHeaders());
