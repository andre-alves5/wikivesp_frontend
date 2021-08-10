import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import "../../styles/dashboard/index.css";

class BaseDashboard extends React.Component {
  state = {
    siteMenu: true,
  };

  altSitMenu() {
    this.setState({ siteMenu: !this.state.siteMenu });
  }

  altSitMenu = this.altSitMenu.bind(this);

  render() {
    const { siteMenu } = this.state;
    return (
      <React.Fragment>
        <Header
          handleLogout={this.props.handleLogout}
          dadosUsuario={this.props}
          altSitMenu={this.altSitMenu}
        />
        <div className="d-flex">
          <Sidebar active={siteMenu} handleLogout={this.props.handleLogout} />
          <div className="content p-1">
            <div className="list-group-item">{this.props.children}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, actions)(BaseDashboard);
