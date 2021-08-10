import React from 'react';

import '../../styles/login/index.css';

class BaseLogin extends React.Component{
    render(){
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default BaseLogin;