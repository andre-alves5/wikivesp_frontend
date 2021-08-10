import * as type from "./types";
import errorHandling from "./errorHandling";
import * as apiArticle from "../api/articles";
import axios from "axios";
import { getHeaders } from "../actions/localStorage";

const url = process.env.REACT_APP_API_URL;

export const getAllArticles = (pageAtual, limit) => async (dispatch) => {
  try {
    const { data } = await apiArticle.getAllArticles(pageAtual, limit);
    dispatch({ type: type.GET_ALL_ARTICLES, payload: data });
  } catch (error) {
    errorHandling(error);
  }
};

export const getMyArticles = (idAutor, pageAtual, limit) => async (
  dispatch
) => {
  try {
    const { data } = await apiArticle.getMyArticles(idAutor, pageAtual, limit);
    dispatch({ type: type.GET_MY_ARTICLES, payload: data });
  } catch (error) {
    errorHandling(error);
  }
};

export const postArticle = (articleData, cb) => async () => {
  try {
    const { data } = await apiArticle.postArticle(articleData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const postArticleDetail = (id, articleDetailData, cb) => async () => {
  try {
    const { data } = await axios.post(
      url + `/articledetails/${id}`,
      articleDetailData,
      getHeaders()
    );
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const putArticle = (articleData, cb) => async () => {
  try {
    const { data } = await apiArticle.putArticle(articleData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const putArticleBody = (articleBodyData, cb) => async () => {
  try {
    const { data } = await apiArticle.putArticleBody(articleBodyData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const deleteArticle = (idArticle, cb) => async () => {
  try {
    const { data } = await apiArticle.deleteArticle(idArticle);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const getArticle = (idArticle) => async (dispatch) => {
  try {
    const { data } = await apiArticle.getArticle(idArticle);
    dispatch({ type: type.GET_ARTICLE, payload: data });
  } catch (error) {
    errorHandling(error);
  }
};

export const getArticleDetails = (idArticle) => async (dispatch) => {
  try {
    const { data } = await apiArticle.getArticleDetails(idArticle);
    dispatch({ type: type.GET_ARTICLE_DETAILS, payload: data });
  } catch (error) {
    errorHandling(error);
  }
};

export const getArticleDetail = (idSubTitulo) => async (dispatch) => {
  try {
    const { data } = await apiArticle.getArticleDetail(idSubTitulo);
    dispatch({ type: type.GET_ARTICLE_DETAIL, payload: data });
  } catch (error) {
    errorHandling(error);
  }
};

export const deleteArticleDetail = (idSubTitulo, cb) => async () => {
  try {
    const { data } = await apiArticle.deleteArticleDetail(idSubTitulo);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const putArticleImage = (idSubTitulo, articleData, cb) => async () => {
  try {
    const { data } = await apiArticle.putArticleImage(idSubTitulo, articleData);
    cb({ erro: data });
  } catch (error) {
    cb(errorHandling(error));
  }
};

export const limparAllArticles = () => {
  return function (dispatch) {
    dispatch({ type: type.LIMPAR_ALL_ARTICLES });
  };
};

export const limparMyArticles = () => {
  return function (dispatch) {
    dispatch({ type: type.LIMPAR_MY_ARTICLES });
  };
};

export const limparArticleDetails = () => {
  return function (dispatch) {
    dispatch({ type: type.LIMPAR_ARTICLE_DETAILS });
  };
};
export const limparArticleDetail = () => {
  return function (dispatch) {
    dispatch({ type: type.LIMPAR_ARTICLE_DETAIL });
  };
};

export const limparArticle = () => {
  return function (dispatch) {
    dispatch({ type: type.LIMPAR_ARTICLE });
  };
};
