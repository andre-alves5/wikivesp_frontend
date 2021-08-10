import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';

import { Form, FormGroup, Label, Input} from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdatePerfilSenha extends Component {

    state = {
        _id: "",
        password: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value});
    }

    updateUser(){
        this.setState({erro: ""});
        this.setState({success: ""});
        this.receberDadosForm();
        if(!this.validate()) return;
        const {password } = this.state;

        this.setState({loading: true});

        this.props.putPerfilSenha({password}, (msg) => {
            if(msg.erro.error){
                this.setState({erro: {message: msg.erro.message}});
                this.setState({loading: false});
            }else{
                this.setState({success: {message: msg.erro.message}});  
                this.setState({loading: false});
                this.setState({formSuccess: true}); 
            }
        })
    }

    receberDadosForm(){
        this.setState({password: document.querySelector("#password").value});
    }

    validate(){
        const { password } = this.state;
        if (!password) return this.setState({ erro: { message: "Preencha o campo senha!" } });
        if (password.length < 6) return this.setState({ erro: { message: "A senha precisa ter pelo menos seis caracteres!" } });
        return true;
    }

    render() {
        const { password, loading, erro, success, formSuccess } = this.state;
        if(formSuccess){
            return <Redirect to={{
                pathname: '/perfil',
                state: {msg: 'Senha editada com sucesso!'}
            }} />
        }
        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Senha</h2>
                    </div>
                    <Link to={"/perfil"}>
                        <button className="btn btn-outline-primary btn-sm">Perfil</button>
                    </Link>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password"
                            value={password}
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="A senha deve ter de 6 a 12 caracteres"
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
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(UpdatePerfilSenha);