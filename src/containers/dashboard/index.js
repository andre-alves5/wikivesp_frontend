import React from "react";
import BaseDashboard from "./BaseDashboard";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const baseDashboard = (Component) => {
  class ComponentBaseDashboard extends React.Component {
    componentDidMount() {
      const { authorized, getUser, history } = this.props;
      getUser();

      if (!authorized) {
        return history.replace("/");
      }
    }

    componentDidUpdate(nextProps) {
      const { authorized, history } = this.props;
      if (!nextProps.authorized || !authorized) {
        return history.replace("/");
      }
    }

    render() {
      return (
        <BaseDashboard>
          <Component {...this.props} />
        </BaseDashboard>
      );
    }
  }

  const mapStateToProps = (state) => ({
    authorized: state.auth.authorized,
    usuario: state.auth.usuario,
  });

  return connect(mapStateToProps, actions)(ComponentBaseDashboard);
};

export default baseDashboard;
