import React from 'react';
import {Button, Spinner} from 'reactstrap';

const SpinnerRecuperarSenha = (props) => {
    if(props.loading) return(
        <Button type="button" color="warning" className="btn btn-lg btn-block" disabled>
            Aguarde... 
            <Spinner className="ml-1" size="sm" color="light" />
        </Button>
    );

    return (
        <Button type="button" color="warning" className="btn btn-lg btn-block">
            Recuperar
        </Button>
    );
}

export default SpinnerRecuperarSenha;