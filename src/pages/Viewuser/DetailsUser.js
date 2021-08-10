import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {Spinner} from 'reactstrap';

class DetailsUser extends Component {

    renderInfoUser() {
        if (!this.props.userDetails) return null;

        return (
            <dl className="row">

                <dt className="col-sm-3">ID</dt>
                <dd className="col-sm-9">{this.props.userDetails ? this.props.userDetails._id : ""}</dd>

                <dt className="col-sm-3">Nome</dt>
                <dd className="col-sm-9">{this.props.userDetails ? this.props.userDetails.name : ""}</dd>

                <dt className="col-sm-3">E-mail</dt>
                <dd className="col-sm-9">{this.props.userDetails ? this.props.userDetails.email : ""}</dd>

                <dt className="col-sm-3">Cadastrado</dt>
                <dd className="col-sm-9">{this.props.userDetails ? format(new Date(this.props.userDetails.createdAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>

                <dt className="col-sm-3">Editado</dt>
                <dd className="col-sm-9">{this.props.userDetails.updatedAt ? format(new Date(this.props.userDetails.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>


            </dl>
        )
    }

    render() {
        return (
            <>
                {this.props.userDetails ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}
                {this.renderInfoUser()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    userDetails: state.user.userDetails,
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(DetailsUser);