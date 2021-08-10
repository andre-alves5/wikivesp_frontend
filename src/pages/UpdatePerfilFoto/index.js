import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import iconeUsuario from '../../assets/icone_usuario.png';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdatePerfilFoto extends Component {

    state = {
        _id: "",
        file: null,
        erro: "",
        success: "",
        loading: false,
        formSuccess: false
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.files[0] });
    }

    async updateUser() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        if(!this.validade()) return;
        this.setState({ loading: true });

        const formData = new FormData();
        formData.append('file', this.state.file);

        await this.props.putPerfilFoto(formData, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.atualizarUser();
            }
        })
    }

    validade(){
        const { file } = this.state;
        if (!file) return this.setState({ erro: { message: "Necessário selecionar uma imagem!" } });
        return true;
    }

    async atualizarUser() {
        await this.props.viewPerfil(() => {
            this.setState({ loading: false });
            this.setState({ formSuccess: true });
        })
    }

    render() {
        const { file, loading, erro, success, formSuccess } = this.state;
        if (formSuccess) {
            return <Redirect to={{
                pathname: '/perfil',
                state: { msg: 'Foto do perfil editado com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Foto</h2>
                    </div>
                    <Link to={"/perfil"}>
                        <button className="btn btn-outline-primary btn-sm">Perfil</button>
                    </Link>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />

                <Form>
                    <FormGroup>
                        <Label for="file">Foto (500 x 500)</Label>
                        <Input type="file"
                            name="file"
                            id="file"
                            autoComplete="file"
                            onChange={(ev) => this.onChangeInput("file", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        {file ? <img src={URL.createObjectURL(file)} className="rounded-circle" alt="Foto do perfil" width="150" height="150" /> : this.props.usuario ? <img src={this.props.usuario.url} className="rounded-circle" alt="Foto do perfil" width="150" height="150" /> : iconeUsuario}
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
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(UpdatePerfilFoto);