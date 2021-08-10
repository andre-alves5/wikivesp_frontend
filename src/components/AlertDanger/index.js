import React from 'react';

const AlertDanger = (props) => {
    if(props.erros === "") return null;

    return(
        <div className="alert alert-danger">
            {props.erros.message}
        </div>
    )
}

export default AlertDanger;