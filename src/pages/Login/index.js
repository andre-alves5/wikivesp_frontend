import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerLogin from "../../components/SpinnerLogin";

class Login extends Component {
  state = {
    email: "",
    password: "",
    erro: "",
    msg: "",
    loading: false,
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
      this.props.location.state.msg = "";
    }
  }

  onChangeInput = (field, ev) => {
    this.setState({ [field]: ev.target.value });
  };

  handleLogin() {
    this.setState({ msg: "" });
    const { email, password } = this.state;

    if (!this.validade()) return;
    this.setState({ loading: true });

    this.props.handleLogin({ email, password }, (msg) => {
      if (msg.erro) {
        this.setState({ erro: { message: msg.erro.message } });
        this.setState({ loading: false });
      }
    });
  }

  validade() {
    const { email, password } = this.state;

    if (!email)
      return this.setState({ erro: { message: "Preencha o campo e-mail!" } });
    if (!password)
      return this.setState({ erro: { message: "Preencha o campo senha!" } });

    return true;
  }

  render() {
    const { email, password, erro, msg, loading } = this.state;
    return (
      <>
        <div className="container-login">
          <div className="login card shadow">
            <Form className="form-signin text-center">
              <img
                className="mb-4"
                src="images/logo.png"
                alt="WikiVesp"
                width="72"
                height="72"
              />
              <h1 className="h3 mb-3 font-weight-normal">Área Restrita</h1>

              <AlertDanger erros={erro} />
              {msg ? <AlertSuccess erros={{ message: msg }} /> : ""}

              <FormGroup>
                <Label for="email">Usuário</Label>
                <Input
                  type="email"
                  value={email}
                  name="email"
                  id="email"
                  placeholder="E-mail do usuário"
                  onChange={(ev) => this.onChangeInput("email", ev)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Senha</Label>
                <Input
                  type="password"
                  value={password}
                  name="password"
                  id="password"
                  placeholder="Senha do usuário"
                  autoComplete="password"
                  onChange={(ev) => this.onChangeInput("password", ev)}
                />
              </FormGroup>

              <span onClick={() => this.handleLogin()}>
                <SpinnerLogin loading={loading} />
              </span>

              <p className="text-center mt-2">
                <Link to="/cad-user-login">Cadastrar</Link>
                {" - "}
                <Link to="/recuperar-senha-login">Esqueceu a senha?</Link>
              </p>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, actions)(Login);
