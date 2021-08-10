import React from 'react';
import {Button, Spinner} from 'reactstrap';

const SpinnerCadLogin = (props) => {
    if(props.loading) return(
        <Button type="button" color="primary" className="btn btn-lg btn-block" disabled>
            Aguarde... 
            <Spinner className="ml-1" size="sm" color="light" />
        </Button>
    );

    return (
        <Button type="button" color="primary" className="btn btn-lg btn-block">
            Cadastrar
        </Button>
    );
}

export default SpinnerCadLogin;