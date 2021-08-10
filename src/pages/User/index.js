import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/users";

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

class User extends Component {
  state = {
    pageAtual: 1,
    limit: 40,
    msg: "",
    erro: "",
    success: "",
    loading: false,
    openModal: false,
    id: "",
    dadosApi: false,
  };

  componentDidMount() {
    this.getUsuarios();
  }

  componentDidUpdate(nextProps) {
    if (!this.props.usuario && nextProps.usuario) this.getUsuarios();
    this.receberDadosApi();
  }

  componentWillUnmount() {
    this.props.limparUser();
    this.props.limparUsers();
  }

  receberDadosApi() {
    if (
      typeof this.props.usuarios !== "undefined" &&
      this.props.usuarios !== null &&
      !this.state.dadosApi &&
      this.props.usuarios.page === this.state.pageAtual
    ) {
      this.setState({ dadosApi: true });
    }
  }

  getUsuarios() {
    const { pageAtual, limit } = this.state;
    this.props.getUsers(pageAtual, limit);
    const { usuarios } = this.props;
    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
      this.props.location.state.msg = "";
    }
    if (usuarios === "undefined") return null;
  }

  changePageAtual = (pageAtual) => {
    this.props.limparUsers();
    this.setState({ dadosApi: false });
    this.setState({ pageAtual }, () => {
      this.getUsuarios();
    });
  };

  apagarUser() {
    this.setState({ dadosApi: false });
    this.setState({ loading: true });
    this.props.deleteUser(this.state.id_delete, (msg) => {
      if (msg.erro.error) {
        this.setState({ erro: { message: msg.erro.message } });
        this.setState({ loading: false });
        this.props.limparUsers();
        this.setState({ openModal: false });
      } else {
        this.setState({ success: { message: msg.erro.message } });
        this.setState({ loading: false });
        this.getUsuarios();
        //this.setState({formSuccess: true});
        this.setState({ openModal: false });
      }
    });
  }

  openModal(id) {
    this.setState({ id_delete: id });
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    const { msg, loading, erro, success, openModal, dadosApi } = this.state;
    var usuarios = [];
    if (this.props.usuarios) usuarios = this.props.usuarios.docs;

    console.log(usuarios);

    var hasPrevPage = false;
    if (
      typeof this.props.usuarios !== "undefined" &&
      this.props.usuarios !== null &&
      this.props.usuarios.page !== "" &&
      this.props.usuarios.page !== 1
    ) {
      hasPrevPage = true;
    }

    var nextPage = false;
    var hasNextPage = false;
    if (
      typeof this.props.usuarios !== "undefined" &&
      this.props.usuarios !== null &&
      this.props.usuarios.nextPage <= this.props.usuarios.totalPages &&
      this.props.usuarios.nextPage !== null
    ) {
      nextPage = true;
      hasNextPage = true;
    }

    return (
      <>
        <Modal isOpen={openModal}>
          <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
          <ModalBody>Você realmente deseja apagar esse usuário?</ModalBody>
          <ModalFooter>
            <Button
              outline
              color="primary"
              size="sm"
              onClick={() => this.closeModal()}
            >
              Cancelar
            </Button>
            <span onClick={() => this.apagarUser()}>
              <SpinnerDeleteSimples loading={loading} />
            </span>
          </ModalFooter>
        </Modal>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Listar Usuários</h2>
          </div>
          <Link to={"cad-user"}>
            <button className="btn btn-outline-success btn-sm">
              Cadastrar
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
                  <th className="d-none d-sm-table-cell">ID</th>
                  <th>Nome</th>
                  <th className="d-none d-sm-table-cell">E-mail</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td className="d-none d-sm-table-cell">{usuario._id}</td>
                    <td>{usuario.name}</td>
                    <td className="d-none d-sm-table-cell">{usuario.email}</td>
                    <td className="text-center">
                      <span className="d-none d-md-block">
                        <Link to={"/view-user/" + usuario._id}>
                          <button className="btn btn-outline-primary btn-sm mr-1">
                            <FontAwesomeIcon icon="eye" />
                          </button>
                        </Link>

                        <Link to={"/update-user/" + usuario._id}>
                          <button className="btn btn-outline-warning btn-sm mr-1">
                            <FontAwesomeIcon icon="edit" />
                          </button>
                        </Link>

                        <span onClick={() => this.openModal(usuario._id)}>
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
                              to={"/view-user/" + usuario._id}
                            >
                              Visualizar
                            </Link>
                            <Link
                              className="dropdown-item"
                              to={"/update-user/" + usuario._id}
                            >
                              Editar
                            </Link>
                            <DropdownItem
                              onClick={() => this.openModal(usuario._id)}
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
                        this.props.usuarios.prevPage
                          ? this.props.usuarios.prevPage
                          : 1
                      )
                    }
                  >
                    {this.props.usuarios.prevPage
                      ? this.props.usuarios.prevPage
                      : ""}
                  </span>
                </li>
              ) : (
                ""
              )}

              <li className="page-item active">
                <span className="page-link" href="#">
                  {this.props.usuarios ? this.props.usuarios.page : "1"}
                </span>
              </li>

              {nextPage ? (
                <li className="page-item">
                  <span
                    className="page-link"
                    onClick={() =>
                      this.changePageAtual(
                        this.props.usuarios.nextPage
                          ? this.props.usuarios.nextPage
                          : 1
                      )
                    }
                  >
                    {this.props.usuarios.nextPage
                      ? this.props.usuarios.nextPage
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
                      this.props.usuarios ? this.props.usuarios.totalPages : 1
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
  usuarios: state.user.users,
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(User);
