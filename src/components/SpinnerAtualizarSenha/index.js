import React from 'react';
import {Button, Spinner} from 'reactstrap';

const SpinnerAtualizarSenha = (props) => {
    if(props.loading) return(
        <Button type="button" color="danger" className="btn btn-lg btn-block" disabled>
            Aguarde... 
            <Spinner className="ml-1" size="sm" color="light" />
        </Button>
    );

    return (
        <Button type="button" color="danger" className="btn btn-lg btn-block">
            Salvar
        </Button>
    );
}

export default SpinnerAtualizarSenha;