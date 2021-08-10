import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerCadLogin from "../../components/SpinnerCadLogin";

class CadUserLogin extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    cadUser() {
        if (!this.validate()) return;
        const { name, email, password } = this.state;

        this.setState({ loading: true });

        this.props.postUser({ name, email, password }, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ success: "" });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ erro: "" });
                this.setState({ formSuccess: true });
                this.setState({ loading: false });
            }
        })
    }

    validate() {
        const { name, email, password } = this.state;
        if (!name) return this.setState({ erro: { message: "Preencha o campo nome!" } });
        if (!email) return this.setState({ erro: { message: "Preencha o campo e-mail!" } });
        if (!validator.isEmail(email)) return this.setState({ erro: { message: "Preencha com e-mail válido!" } });
        if (!password) return this.setState({ erro: { message: "Preencha o campo senha!" } });
        if (password.length < 6) return this.setState({ erro: { message: "A senha precisa ter pelo menos seis caracteres!" } });
        return true;
    }

    render() {

        const { name, email, password, erro, success, loading, formSuccess } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/',
                state: { msg: 'Usuário cadastrado com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="container-login">
                    <div className="login card shadow">
                        <Form className="form-signin text-center">
                            <img className="mb-4" src="images/logo.png" alt="WikiVesp" width="72" height="72" />
                            <h1 className="h3 mb-3 font-weight-normal">Criar sua conta</h1>
                            <AlertDanger erros={erro} />
                            <AlertSuccess erros={success} />

                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input
                                    type="name"
                                    value={name}
                                    name="name"
                                    id="name"
                                    placeholder="Seu nome completo"
                                    onChange={(ev) => this.onChangeInput("name", ev)} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">E-mail</Label>
                                <Input
                                    type="email"
                                    value={email}
                                    name="email"
                                    id="email"
                                    placeholder="E-mail do usuário"
                                    onChange={(ev) => this.onChangeInput("email", ev)} />
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
                                    onChange={(ev) => this.onChangeInput("password", ev)} />
                            </FormGroup>

                            <span onClick={() => this.cadUser()}>
                                <SpinnerCadLogin loading={loading} />
                            </span>
                            <p className="text-center mt-2">
                                <Link to="/">Clique aqui</Link>
                                {" para acessar"}
                            </p>
                        </Form>
                    </div>
                </div>
            </>
        )
    }
}

export default connect(null, actions)(CadUserLogin);