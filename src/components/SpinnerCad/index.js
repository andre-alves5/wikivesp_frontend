import React from 'react';
import {Button, Spinner} from 'reactstrap';

const SpinnerCad = (props) => {
    if(props.loading) return(
        <Button type="button" className="btn btn-success btn-sm" disabled>
            Aguarde 
            <Spinner className="ml-1" size="sm" color="light" />
        </Button>
    );

    return (
        <Button type="button" className="btn btn-success btn-sm">
            Cadastrar
        </Button>
    );
}

export default SpinnerCad;