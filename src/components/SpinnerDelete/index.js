import React from 'react';
import {Spinner} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; 
library.add(fas);

const SpinnerDelete = (props) => {
    if(props.loading) return(
        <button className="btn btn-outline-danger btn-sm" disabled>
            <Spinner className="ml-1" size="sm" color="danger" />
        </button>
    );

    return (
        <button className="btn btn-outline-danger btn-sm">
            <FontAwesomeIcon icon="trash-alt"/>
        </button>
    );
}

export default SpinnerDelete;