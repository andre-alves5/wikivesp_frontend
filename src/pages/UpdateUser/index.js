import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';
import validator from 'validator';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateUser extends Component {

    state = {
        _id: "",
        email: "",
        name: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        deleteSuccess: false,
        dadosApi: false,
        openModal: false
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
            this.setState({ name: this.props.userDetails.name });
            this.setState({ email: this.props.userDetails.email });
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

        const { _id, name, email } = this.state;

        this.props.putUser({ _id, name, email }, (msg) => {
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
        this.setState({ name: document.querySelector("#name").value });
        this.setState({ email: document.querySelector("#email").value });
    }

    validade() {
        const { name, email } = this.state;
        if (!name) return this.setState({ erro: { message: "Preencha o campo nome!" } });
        if (!email) return this.setState({ erro: { message: "Preencha o campo e-mail!" } });
        if (!validator.isEmail(email)) return this.setState({ erro: { message: "Preencha com e-mail válido!" } });
        return true;
    }

    apagarUser() {
        this.setState({ loading: true });
        const { _id } = this.state;
        this.props.deleteUser(_id, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.setState({ deleteSuccess: true });
            }
        })
    }

    openModal() {
        this.setState({ openModal: true });
    }

    closeModal() {
        this.setState({ openModal: false });
    }

    render() {
        const { _id, name, email, loading, dadosApi, erro, success, formSuccess, deleteSuccess, openModal } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                //pathname: '/user',
                pathname: '/view-user/' + _id,
                state: { msg: 'Usuário editado com sucesso!' }
            }} />
        }
        if (deleteSuccess) {
            return <Redirect to={{
                pathname: '/user',
                state: { msg: 'Usuário apagado com sucesso!' }
            }} />
        }

        return (
            <>
                <Modal isOpen={openModal}>
                    <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
                    <ModalBody>
                        Você realmente deseja apagar esse usuário?
                 </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" size="sm" onClick={() => this.closeModal()}>Cancelar</Button>
                        <span onClick={() => this.apagarUser()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </ModalFooter>
                </Modal>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Usuário</h2>
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

                        <span onClick={() => this.openModal()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline color="primary" size="sm" caret>
                                Ações
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className="dropdown-item" to={"/user"}>Listar</Link>
                                <Link className="dropdown-item" to={"/view-user/" + this.props.match.params.id}>Visualisar</Link>
                                <DropdownItem onClick={() => this.openModal()}>Apagar</DropdownItem>
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
                        <Label for="name">Nome</Label>
                        <Input type="text"
                            value={name}
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder={dadosApi ? "Nome completo do usuário" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="name"
                            onChange={(ev) => this.onChangeInput("name", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input type="email"
                            value={email}
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder={dadosApi ? "Melhor e-mail do usuário" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="email"
                            onChange={(ev) => this.onChangeInput("email", ev)}
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
})

export default connect(mapStateToProps, actions)(UpdateUser);