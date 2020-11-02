import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import AlertSuccess from "../../components/AlertSuccess";
import AlertDanger from "../../components/AlertDanger";
import SpinnerDelete from "../../components/SpinnerDelete";
import SpinnerDeleteSimples from "../../components/SpinnerDeleteSimples";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

class ArticleBody extends Component {
  state = {
    _id: "",
    idAutor: "",
    pageAtual: 1,
    limit: 20,
    msg: "",
    erro: "",
    success: "",
    loading: false,
    openModal: false,
    dadosApi: false,
    apiData: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getArticleDetailsLocal(id);
  }

  componentDidUpdate(nextProps) {
    const { id } = this.props.match.params;
    if (!this.props.usuario && nextProps.usuario && !this.props.articleDetails)
      this.getArticleDetailsLocal(id);
    this.receberDadosApi();
  }

  componentWillUnmount() {
    this.props.limparArticleDetail();
    this.props.limparArticleDetails();
  }

  receberDadosApi() {
    if (
      typeof this.props.articleDetails !== "undefined" &&
      this.props.articleDetails !== null &&
      !this.state.dadosApi &&
      this.props.articleDetails.page === this.state.pageAtual
    ) {
      this.setState({ dadosApi: true });
    }
  }

  getArticleDetailsLocal(idArticle) {
    this.props.getArticleDetails(idArticle);
    const { articleDetails } = this.props;
    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
      this.props.location.state.msg = "";
    }
    if (articleDetails === "undefined") return null;
  }

  changePageAtual = (pageAtual) => {
    this.props.limparAllarticleDetails();
    this.setState({ dadosApi: false });
    this.setState({ pageAtual }, () => {
      this.getarticleDetailsLocal();
    });
  };

  deleteArticleDetailLocal() {
    this.setState({ dadosApi: false });
    this.setState({ loading: true });
    this.props.deleteArticleDetail(this.state._id, (msg) => {
      if (msg.erro.error) {
        this.setState({ erro: { message: msg.erro.message } });
        this.setState({ loading: false });
        this.props.limparArticleDetails();
        this.setState({ openModal: false });
      } else {
        this.setState({ success: { message: msg.erro.message } });
        this.setState({ loading: false });
        const { id } = this.props.match.params;
        this.getArticleDetailsLocal(id);
        //this.setState({formSuccess: true});
        this.setState({ openModal: false });
      }
    });
  }

  openModal(_id) {
    this.setState({ _id: _id });
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    const { msg, loading, erro, success, openModal, dadosApi } = this.state;
    var articleDetails = [];
    if (this.props.articleDetails)
      articleDetails = this.props.articleDetails.docs;

    var hasPrevPage = false;
    if (
      typeof this.props.articleDetails !== "undefined" &&
      this.props.articleDetails !== null &&
      this.props.articleDetails.page !== "" &&
      this.props.articleDetails.page !== 1
    ) {
      hasPrevPage = true;
    }

    var nextPage = false;
    var hasNextPage = false;
    if (
      typeof this.props.articleDetails !== "undefined" &&
      this.props.articleDetails !== null &&
      this.props.articleDetails.nextPage <=
        this.props.articleDetails.totalPages &&
      this.props.articleDetails.nextPage !== null
    ) {
      nextPage = true;
      hasNextPage = true;
    }

    return (
      <>
        <Modal isOpen={openModal}>
          <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
          <ModalBody>Você realmente deseja apagar esse Subtítulo?</ModalBody>
          <ModalFooter>
            <Button
              outline
              color="primary"
              size="sm"
              onClick={() => this.closeModal()}
            >
              Cancelar
            </Button>
            <span onClick={() => this.deleteArticleDetailLocal()}>
              <SpinnerDeleteSimples loading={loading} />
            </span>
          </ModalFooter>
        </Modal>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Subtitulos</h2>
          </div>
          <Link to={"cadarticle"}>
            <button className="btn btn-outline-info btn-sm">Novo Artigo</button>
          </Link>
          <Link to={"allarticles"}>
            <button className="ml-1 btn btn-outline-info btn-sm">
              Todos Artigos
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
                  <th className="d-none d-sm-table-cell">Subtitulo</th>
                  <th className="d-none d-sm-table-cell">Conteúdo</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {articleDetails.map((articleDetail) => (
                  <tr key={articleDetail._id}>
                    <td className="d-none d-sm-table-cell">
                      {articleDetail.subTitulo}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {articleDetail.corpoSubTitulo}
                    </td>
                    <td className="d-flex justify-content-center text-center">
                      <span className="d-none d-md-block">
                        <Link to={"/updatearticlebody/" + articleDetail._id}>
                          <button className="btn btn-outline-warning btn-sm mr-3">
                            <FontAwesomeIcon icon="edit" />
                          </button>
                        </Link>

                        <span onClick={() => this.openModal(articleDetail._id)}>
                          <SpinnerDelete loading={loading} />
                        </span>
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
                              to={"/update-user/" + articleDetail._id}
                            >
                              Editar
                            </Link>
                            <DropdownItem
                              onClick={() => this.openModal(articleDetail._id)}
                            >
                              Apagar
                            </DropdownItem>
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
                        this.props.articleDetails.prevPage
                          ? this.props.articleDetails.prevPage
                          : 1
                      )
                    }
                  >
                    {this.props.articleDetails.prevPage
                      ? this.props.articleDetails.prevPage
                      : ""}
                  </span>
                </li>
              ) : (
                ""
              )}

              <li className="page-item active">
                <span className="page-link" href="#">
                  {this.props.articleDetails
                    ? this.props.articleDetails.page
                    : "1"}
                </span>
              </li>

              {nextPage ? (
                <li className="page-item">
                  <span
                    className="page-link"
                    onClick={() =>
                      this.changePageAtual(
                        this.props.articleDetails.nextPage
                          ? this.props.articleDetails.nextPage
                          : 1
                      )
                    }
                  >
                    {this.props.articleDetails.nextPage
                      ? this.props.articleDetails.nextPage
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
                      this.props.articleDetails
                        ? this.props.articleDetails.totalPages
                        : 1
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
  articleDetails: state.article.articleDetails,
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(ArticleBody);
