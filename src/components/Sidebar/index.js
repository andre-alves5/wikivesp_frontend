import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ active, handleLogout }) => (
  <nav className={active ? "sidebar" : "sidebar toggled"}>
    <ul className="list-unstyled">
      <li>
        <Link to="/dashboard"> Home</Link>
      </li>
      <li>
        <Link to="/cadarticle"> Novo Artigo</Link>
      </li>
      <li>
        <Link to="/myarticles"> Meus Artigos</Link>
      </li>
      <li>
        <Link to="/allarticles"> Todos Artigos</Link>
      </li>
      <li>
        <Link to="#" onClick={() => handleLogout()}>
          {" "}
          Sair
        </Link>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
