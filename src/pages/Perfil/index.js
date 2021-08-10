import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import AlertSuccess from "../../components/AlertSuccess";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

class Perfil extends Component {
  state = {
    usuario: "",
    firstName: "",
    msg: "",
  };

  componentDidMount() {
    const { usuario } = this.props;
    this.setState({ usuario: usuario });

    var firstName = "Usuário";
    if (usuario) {
      if (usuario.name) {
        [firstName] = usuario.name.split(" ");
      }
    }
    this.setState({ firstName: firstName });

    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
    }
  }
  render() {
    const { name, email, curso, turma, polo, url } = this.state.usuario;
    const { msg } = this.state;
    const { firstName } = this.state;
    return (
      <>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Perfil</h2>
          </div>

          <span className="d-none d-md-block">
            <Link to={"/update-perfil"}>
              <button className="btn btn-outline-warning btn-sm">Editar</button>
            </Link>
            <Link to={"/update-perfil-senha"}>
              <button className="ml-1 btn btn-outline-danger btn-sm">
                Editar Senha
              </button>
            </Link>
          </span>
          <div className="dropdown d-block d-md-none">
            <UncontrolledButtonDropdown>
              <DropdownToggle outline color="primary" size="sm" caret>
                Ações
              </DropdownToggle>
              <DropdownMenu right>
                <Link className="dropdown-item" to={"/update-perfil"}>
                  Editar
                </Link>
                <Link className="dropdown-item" to={"/update-perfil-senha"}>
                  Editar Senha
                </Link>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
        <hr />
        {msg ? <AlertSuccess erros={{ message: msg }} /> : ""}
        <dl className="row">
          <dt className="col-sm-3">Foto</dt>
          <dd className="col-sm-9">
            <div className="img-perfil">
              <img
                src={url}
                className="rounded-circle"
                alt={firstName}
                width="150"
                height="150"
              />
              <div className="edit">
                <Link to={"/update-perfil-foto"}>
                  <button className="btn btn-outline-warning btn-sm">
                    <FontAwesomeIcon icon="edit" />
                  </button>
                </Link>
              </div>
            </div>
          </dd>

          <dt className="col-sm-3">Nome</dt>
          <dd className="col-sm-9">{name}</dd>

          <dt className="col-sm-3">E-mail</dt>
          <dd className="col-sm-9">{email}</dd>

          <dt className="col-sm-3">Curso</dt>
          <dd className="col-sm-9">{curso}</dd>

          <dt className="col-sm-3">Turma</dt>
          <dd className="col-sm-9">{turma}</dd>

          <dt className="col-sm-3">Polo</dt>
          <dd className="col-sm-9">{polo}</dd>
        </dl>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(Perfil);
