import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import { Spinner } from "reactstrap";

class ArticleDetails extends Component {
  renderArticleInfo() {
    if (!this.props.article) {
      return null;
    }
    if (!this.props.articleDetails) {
      return null;
    } else {
      var articleDetails = [];
      articleDetails = this.props.articleDetails.docs;
    }

    return (
      <div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="p-2">Titulo: </div>
          <h2>{this.props.article.titulo}</h2>
        </div>
        <h4>Introdução: </h4>
        <p>{this.props.article.introducao}</p>
        <h4>Indice: </h4>
        <p>{this.props.article.indice}</p>
        {this.props.articleDetails.docs
          ? this.props.articleDetails.docs.map((articleDetail) => (
              <div>
                <h4>{articleDetail.subTitulo}</h4>
                <p>{articleDetail.corpoSubTitulo}</p>
                {articleDetail.url ? (
                  <img
                    alt={articleDetails._id}
                    src={articleDetail.url}
                    width="300"
                    height="300"
                  />
                ) : (
                  ""
                )}
              </div>
            ))
          : ""}
        <h6>Autor: </h6>
        <p>{this.props.article ? this.props.article.autor : ""}</p>
        <h6>Bibliografia: </h6>
        <p>{this.props.article ? this.props.article.bibliografia : ""}</p>
        <hr></hr>
        <p>
          Categoria: {this.props.article ? this.props.article.categoria : ""}
        </p>
        <p>
          Cadastrado{" "}
          {this.props.article
            ? format(
                new Date(this.props.article.createdAt),
                "dd/MM/yyyy hh:mm:ss",
                { locale: pt }
              )
            : ""}
        </p>
        <p>
          Editado{" "}
          {this.props.article.updatedAt
            ? format(
                new Date(this.props.article.updatedAt),
                "dd/MM/yyyy hh:mm:ss",
                { locale: pt }
              )
            : ""}
        </p>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.props.article ? (
          ""
        ) : (
          <div className="d-flex justify-content-center">
            <Spinner color="primary" />
          </div>
        )}
        {this.renderArticleInfo()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  article: state.article.article,
  articleDetails: state.article.articleDetails,
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(ArticleDetails);
