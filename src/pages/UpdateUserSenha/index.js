import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';

import { Form, FormGroup, Label, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';
import SpinnerUp from '../../components/SpinnerUp';

class UpdateUserSenha extends Component {

    state = {
        _id: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getViewUser(id);
    }

    async componentDidUpdate(nextProps) {
        const { id } = this.props.match.params;
        if (!this.props.usuario && nextProps.usuario) this.props.getViewUser(id);
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparUser();
    }

    receberDadosApi() {
        const { id } = this.props.match.params;
        if (typeof this.props.userDetails !== "undefined" && this.props.userDetails !== null && this.props.userDetails._id === id && !this.state.dadosApi) {
            this.setState({ _id: this.props.userDetails._id });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateUser() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, password } = this.state;

        this.props.putUser({ _id, password }, (msg) => {
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

    receberDadosForm() {
        this.setState({ _id: document.querySelector("#_id").value });
        this.setState({ password: document.querySelector("#password").value });
    }

    validade() {
        const { password } = this.state;
        if (!password) return this.setState({ erro: { message: "Preencha o campo senha!" } });
        if (password.length < 6) return this.setState({ erro: { message: "A senha precisa ter pelo menos seis caracteres!" } });
        return true;
    }

    render() {
        const { _id, password, loading, dadosApi, erro, success, formSuccess } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/view-user/' + _id,
                state: { msg: 'Senha do usuário editado com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Senha</h2>
                    </div>
                    <span className="d-none d-md-block">
                        <Link to={"/user"}>
                            <button className="btn btn-outline-info btn-sm">
                                Listar
                        </button>
                        </Link>

                        <Link to={"/view-user/" + this.props.match.params.id}>
                            <button className="ml-1 mr-1 btn btn-outline-primary btn-sm">
                                Visualisar
                        </button>
                        </Link>
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline color="primary" size="sm" caret>
                                Ações
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className="dropdown-item" to={"/user"}>Listar</Link>
                                <Link className="dropdown-item" to={"/view-user/" + this.props.match.params.id}>Visualisar</Link>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </div><hr />

                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />

                <Form>
                    <Input type="hidden"
                        value={_id}
                        name="_id"
                        id="_id"
                    />

                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password"
                            value={password}
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder={dadosApi ? "A senha deve ter de 6 a 12 caracteres" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="password"
                            onChange={(ev) => this.onChangeInput("password", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateUser()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}
const mapStateToProps = state => ({
    userDetails: state.user.userDetails
});

export default connect(mapStateToProps, actions)(UpdateUserSenha);