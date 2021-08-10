import React from "react";

import { Link } from "react-router-dom";

import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import iconeUsuario from "../../assets/icone_usuario.png";

const Header = ({ handleLogout, dadosUsuario, altSitMenu }) => {
  var firstName = "Usuário";
  if (dadosUsuario.children.props.usuario) {
    if (dadosUsuario.children.props.usuario.name) {
      [firstName] = dadosUsuario.children.props.usuario.name.split(" ");
    }
  }

  return (
    <>
      <Navbar color="primary navbar-dark" light expand="md">
        <Link className="navbar-brand" to="/dashboard">
          WikiVesp
        </Link>
        <span
          className="navbar-toggler-icon cursor-pointer"
          onClick={() => altSitMenu()}
        ></span>
        <Nav className="ml-auto header-logo" navbar>
          <NavItem className="mr-1">
            <img
              className="rounded-circle mt-2"
              src={
                dadosUsuario.children.props.usuario
                  ? dadosUsuario.children.props.usuario.url
                  : { iconeUsuario }
              }
              width="50"
              height="50"
              alt={firstName}
            />
          </NavItem>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle
              tag="a"
              className="nav-link menu-header cursor-pointer"
              caret
            >
              {firstName}
            </DropdownToggle>
            <DropdownMenu right>
              <Link className="dropdown-item" to="/perfil">
                Perfil
              </Link>
              <DropdownItem onClick={() => handleLogout()}>Sair</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
