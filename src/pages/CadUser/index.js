import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerCad from "../../components/SpinnerCad";

class CadUser extends Component {

    state = {
        name: "",
        password: "",
        email: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    cadUser() {
        const { name, email, password } = this.state;
        if (!this.validate()) return;

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
                pathname: '/user',
                state: { msg: 'Usuário cadastrado com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Cadastrar Usuário</h2>
                    </div>
                    <Link to={"user"}>
                        <button className="btn btn-outline-info btn-sm">
                            Listar
                        </button>
                    </Link>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <FormGroup>
                        <Label for="name">Nome</Label>
                        <Input
                            type="text"
                            value={name}
                            name="name"
                            id="name"
                            placeholder="Nome completo do usuário"
                            autoComplete="name"
                            onChange={(ev) => this.onChangeInput("name", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            id="email"
                            placeholder="Melhor e-mail do usuário"
                            autoComplete="email"
                            onChange={(ev) => this.onChangeInput("email", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input
                            type="password"
                            value={password}
                            name="password"
                            id="password"
                            placeholder="A senha deve ter de 6 a 12 caracteres"
                            autoComplete="password"
                            onChange={(ev) => this.onChangeInput("password", ev)} />
                    </FormGroup>

                    <Link onClick={() => this.cadUser()} to="#">
                        <SpinnerCad loading={loading} />
                    </Link>
                </Form>
            </>
        )
    }
}

export default connect(null, actions)(CadUser);