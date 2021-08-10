import {
  GET_ALL_ARTICLES,
  GET_MY_ARTICLES,
  GET_ARTICLE,
  GET_ARTICLE_DETAILS,
  GET_ARTICLE_DETAIL,
  LIMPAR_ALL_ARTICLES,
  LIMPAR_MY_ARTICLES,
  LIMPAR_ARTICLE_DETAILS,
  LIMPAR_ARTICLE_DETAIL,
  LIMPAR_ARTICLE,
} from "../actions/types";

// eslint-disable-next-line
export default (state = {}, actions) => {
  switch (actions.type) {
    case GET_ALL_ARTICLES:
      return {
        ...state,
        allarticles: actions.payload.articles,
      };
    case GET_MY_ARTICLES:
      return {
        ...state,
        myarticles: actions.payload.articles,
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: actions.payload.article,
      };
    case GET_ARTICLE_DETAILS:
      return {
        ...state,
        articleDetails: actions.payload.articledetails,
      };
    case GET_ARTICLE_DETAIL:
      return {
        ...state,
        articleDetail: actions.payload.articledetail,
      };
    case LIMPAR_ALL_ARTICLES:
      return {
        ...state,
        allarticles: null,
      };
    case LIMPAR_MY_ARTICLES:
      return {
        ...state,
        myarticles: null,
      };
    case LIMPAR_ARTICLE_DETAILS:
      return {
        ...state,
        articleDetails: null,
      };
    case LIMPAR_ARTICLE_DETAIL:
      return {
        ...state,
        articleDetail: null,
      };
    case LIMPAR_ARTICLE:
      return {
        ...state,
        article: null,
      };
    default:
      return state;
  }
};
