import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";

import ArticleDetails from "./ArticleDetails";

class ArticleView extends Component {
  state = {
    id: "",
    msg: "",
    erro: "",
    success: "",
    loading: false,
    formSuccess: false,
    openModal: false,
    titulo: "",
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ _id: id });
    this.getArticleLocal(id);
    this.getArticleDetailsLocal(id);
  }

  componentDidUpdate(nextProps) {
    const { id } = this.props.match.params;
    if (!this.props.usuario && nextProps.usuario) {
      this.getArticleLocal(id);
      this.getArticleDetailsLocal(id);
    }
  }

  componentWillUnmount() {
    this.props.limparArticle();
    this.props.limparArticleDetails();
  }

  getArticleLocal(id) {
    this.props.getArticle(id);
    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
    }
  }
  getArticleDetailsLocal(id) {
    this.props.getArticleDetails(id);
    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
    }
  }

  render() {
    return (
      <>
        <div className="d-flex">
          <div className="mr-auto p-2"></div>
          <span className="mr-1 d-none d-md-block">
            <Link to={"/myarticles"}>
              <button className="btn btn-outline-info btn-sm">
                Meus Artigos
              </button>
            </Link>
          </span>

          <span className="d-none d-md-block">
            <Link to={"/allarticles"}>
              <button className="btn btn-outline-info btn-sm">
                Todos Artigos
              </button>
            </Link>
          </span>
        </div>
        <ArticleDetails />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  article: state.article.article,
  articles: state.article.articles,
  articleDetails: state.article.articleDetails,
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(ArticleView);
