import React from 'react';
import {Spinner} from 'reactstrap';

const SpinnerDeleteSimples = (props) => {
    if(props.loading) return(
        <button className="btn btn-outline-danger btn-sm" disabled>
            Apagando...
            <Spinner className="ml-1" size="sm" color="danger" />
        </button>
    );

    return (
        <button className="btn btn-outline-danger btn-sm">
            Apagar
        </button>
    );
}

export default SpinnerDeleteSimples;