import React from 'react';
import {Button, Spinner} from 'reactstrap';

const SpinnerUp = (props) => {
    if(props.loading) return(
        <Button className="btn btn-warning btn-sm" disabled>
            Aguarde 
            <Spinner className="ml-1" size="sm" color="light" />
        </Button>
    );

    return (
        <Button className="btn btn-warning btn-sm">
            Salvar
        </Button>
    );
}

export default SpinnerUp;