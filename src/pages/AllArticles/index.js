import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";

import {
  Spinner,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import AlertSuccess from "../../components/AlertSuccess";
import AlertDanger from "../../components/AlertDanger";

class AllArticles extends Component {
  state = {
    pageAtual: 1,
    limit: 20,
    msg: "",
    erro: "",
    success: "",
    loading: false,
    openModal: false,
    dadosApi: false,
  };

  componentDidMount() {
    this.getArticlesLocal();
  }

  componentDidUpdate(nextProps) {
    if (!this.props.usuario && nextProps.usuario) this.getArticlesLocal();
    this.receberDadosApi();
  }

  componentWillUnmount() {
    this.props.limparArticle();
    this.props.limparAllArticles();
  }

  receberDadosApi() {
    if (
      typeof this.props.articles !== "undefined" &&
      this.props.articles !== null &&
      !this.state.dadosApi &&
      this.props.articles.page === this.state.pageAtual
    ) {
      this.setState({ dadosApi: true });
    }
  }

  getArticlesLocal() {
    const { pageAtual, limit } = this.state;
    this.props.getAllArticles(pageAtual, limit);
    const { articles } = this.props;
    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
      this.props.location.state.msg = "";
    }
    if (articles === "undefined") return null;
  }

  changePageAtual = (pageAtual) => {
    this.props.limparAllArticles();
    this.setState({ dadosApi: false });
    this.setState({ pageAtual }, () => {
      this.getArticlesLocal();
    });
  };
  render() {
    const { msg, erro, success, dadosApi } = this.state;
    var articles = [];
    if (this.props.articles) articles = this.props.articles.docs;

    var hasPrevPage = false;
    if (
      typeof this.props.articles !== "undefined" &&
      this.props.articles !== null &&
      this.props.articles.page !== "" &&
      this.props.articles.page !== 1
    ) {
      hasPrevPage = true;
    }

    var nextPage = false;
    var hasNextPage = false;
    if (
      typeof this.props.articles !== "undefined" &&
      this.props.articles !== null &&
      this.props.articles.nextPage <= this.props.articles.totalPages &&
      this.props.articles.nextPage !== null
    ) {
      nextPage = true;
      hasNextPage = true;
    }

    return (
      <>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Todos Artigos</h2>
          </div>
          <Link to="cadarticle">
            <button className="btn btn-outline-info btn-sm">Novo Artigo</button>
          </Link>
          <Link to="myarticles">
            <button className="ml-1 btn btn-outline-info btn-sm">
              Meus Artigos
            </button>
          </Link>
        </div>
        <hr />

        {msg ? <AlertSuccess erros={{ message: msg }} /> : ""}
        <AlertDanger erros={erro} />
        <AlertSuccess erros={success} />

        {dadosApi ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th className="d-none d-sm-table-cell">Titulo do Artigo</th>
                  <th className="d-none d-sm-table-cell">Categoria</th>
                  <th className="d-none d-sm-table-cell">Autor</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article._id}>
                    <td className="d-none d-sm-table-cell">{article.titulo}</td>
                    <td className="d-none d-sm-table-cell">
                      {article.categoria}
                    </td>
                    <td className="d-none d-sm-table-cell">{article.autor}</td>
                    <td className="text-center">
                      <span className="d-none d-md-block">
                        <Link to={"/viewarticle/" + article._id}>
                          <button className="btn btn-outline-primary btn-sm mr-1">
                            Visualizar
                          </button>
                        </Link>
                      </span>
                      <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                          <DropdownToggle
                            outline
                            color="primary"
                            size="sm"
                            caret
                          >
                            Ações
                          </DropdownToggle>
                          <DropdownMenu>
                            <Link
                              className="dropdown-item"
                              to={"/viewarticle/" + article._id}
                            >
                              Visualizar
                            </Link>
                            <Link
                              className="dropdown-item"
                              to={"/updatearticle/" + article._id}
                            >
                              Editar
                            </Link>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}

        {dadosApi ? (
          ""
        ) : (
          <div className="d-flex justify-content-center">
            {" "}
            <Spinner color="primary" />
          </div>
        )}

        {dadosApi ? (
          <nav aria-label="paginacao">
            <ul className="pagination pagination-sm justify-content-center">
              <li className={hasPrevPage ? "page-item" : "page-item disabled"}>
                <span
                  className="page-link"
                  onClick={() => this.changePageAtual(1)}
                >
                  Primeira
                </span>
              </li>

              {hasPrevPage ? (
                <li className="page-item">
                  <span
                    className="page-link"
                    onClick={() =>
                      this.changePageAtual(
                        this.props.articles.prevPage
                          ? this.props.articles.prevPage
                          : 1
                      )
                    }
                  >
                    {this.props.articles.prevPage
                      ? this.props.articles.prevPage
                      : ""}
                  </span>
                </li>
              ) : (
                ""
              )}

              <li className="page-item active">
                <span className="page-link" href="#">
                  {this.props.articles ? this.props.articles.page : "1"}
                </span>
              </li>

              {nextPage ? (
                <li className="page-item">
                  <span
                    className="page-link"
                    onClick={() =>
                      this.changePageAtual(
                        this.props.articles.nextPage
                          ? this.props.articles.nextPage
                          : 1
                      )
                    }
                  >
                    {this.props.articles.nextPage
                      ? this.props.articles.nextPage
                      : ""}
                  </span>
                </li>
              ) : (
                ""
              )}

              <li className={hasNextPage ? "page-item" : "page-item disabled"}>
                <span
                  className="page-link"
                  onClick={() =>
                    this.changePageAtual(
                      this.props.articles ? this.props.articles.totalPages : 1
                    )
                  }
                >
                  Última
                </span>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.article.allarticles,
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(AllArticles);
