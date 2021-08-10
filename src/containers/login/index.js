import React from 'react';
import BaseLogin from './BaseLogin';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const baseLogin = Component => {
    class ComponentBaseLogin extends React.Component{

        componentDidMount(){
            const {authorized, getUser} = this.props;
            getUser();
            if(authorized) return ;
        }

        componentDidUpdate(nextProps){
            const {history, authorized} = this.props;
            if( authorized) return history.replace("/dashboard");
        }
        
        render(){
            return(
                <BaseLogin>
                    <Component { ...this.props} />
                </BaseLogin>
            );
        }
    }

    const mapStateToProps = state => ({
        authorized: state.auth.authorized,
        usuario: state.auth.usuario
    });

    return connect(mapStateToProps, actions)(ComponentBaseLogin);
}

export default baseLogin;