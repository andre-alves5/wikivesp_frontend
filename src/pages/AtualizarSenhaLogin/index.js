import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import SpinnerAtualizarSenha from '../../components/SpinnerAtualizarSenha';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class AtualizarSenhaLogin extends Component {

    state = {
        _id: "",
        recuperarSenha: "",
        password: "",
        chave: "",
        erro: "",
        success: "",
        loading: false,
        loadingForm: false,
        formSuccess: false,
        chaveInvalida: false
    }

    componentDidMount() {        
        const { chave } = this.props.match.params;
        this.setState({ chave: chave });
        this.setState({loadingForm: true});
        this.props.validarChave(chave, (msg) => {
            if (msg.erro.error) {
                this.setState({ chaveInvalida: true });
            } else {
                this.setState({ _id: msg.erro.user._id });
                this.setState({ recuperarSenha: chave });
                this.setState({loadingForm: false});
            }
        })
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateUserSenha() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        if (!this.validade()) return;

        const { _id, recuperarSenha, password } = this.state;

        this.setState({ loading: true });

        this.props.atualizarSenha({ _id, recuperarSenha, password }, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.setState({ formSuccess: true });
            }
        })
    }

    validade() {
        const { password } = this.state;
        if (!password) return this.setState({ erro: { message: "Preencha o campo senha!" } });
        if (password.length < 6) return this.setState({ erro: { message: "A senha precisa ter pelo menos seis caracteres!" } });
        return true;
    }

    render() {
        const { _id, recuperarSenha, password, erro, success, loading, formSuccess, chaveInvalida, loadingForm } = this.state;

        if (chaveInvalida) {
            return <Redirect to={{
                pathname: '/recuperar-senha-login',
                state: { msgErro: 'Chave inválida, solicite novo link para atualizar senha!' }
            }} />
        }

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/',
                state: { msg: 'Senha atualizada com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="container-login">
                    <div className="login card shadow">
                        <Form className="form-signin text-center">
                            <img className="mb-4" src="../images/logo_celke.png" alt="Celke" width="72" height="72" />
                            <h1 className="h3 mb-3 font-weight-normal">Atualizar Senha</h1>

                            <AlertDanger erros={erro} />
                            <AlertSuccess erros={success} />

                            <Input type="hidden"
                                value={_id}
                                name="_id"
                                id="_id"
                            />

                            <Input type="hidden"
                                value={recuperarSenha}
                                name="recuperarSenha"
                                id="recuperarSenha"
                            />

                            <FormGroup>
                                <Label for="password">Senha</Label>
                                <Input
                                    type="password"
                                    value={password}
                                    name="password"
                                    id="password"
                                    placeholder={!loadingForm ? "A senha deve ter de 6 a 12 caracteres": "Carregando..."}
                                    autoComplete="password"
                                    disabled={!loadingForm ? false : true}
                                    onChange={(ev) => this.onChangeInput("password", ev)} />
                            </FormGroup>

                            <span onClick={() => this.updateUserSenha()}>
                                <SpinnerAtualizarSenha loading={loading} />
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

export default connect(null, actions)(AtualizarSenhaLogin);