import React from "react";
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store/store";

import { history } from "../history";

import Login from "../pages/Login";
import CadUserLogin from "../pages/CadUserLogin";
import RecuperarSenhaLogin from "../pages/RecuperarSenhaLogin";
import AtualizarSenhaLogin from "../pages/AtualizarSenhaLogin";

import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";
import User from "../pages/User";
import Viewuser from "../pages/Viewuser";
import CadUser from "../pages/CadUser";
import UpdateUser from "../pages/UpdateUser";
import UpdateUserSenha from "../pages/UpdateUserSenha";
import UpdatePerfil from "../pages/UpdatePerfil";
import UpdatePerfilSenha from "../pages/UpdatePerfilSenha";
import UpdatePerfilFoto from "../pages/UpdatePerfilFoto";

import CadArticle from "../pages/CadArticle";
import MyArticles from "../pages/MyArticles";
import AllArticles from "../pages/AllArticles";
import ViewArticle from "../pages/ViewArticle";
import UpdateArticle from "../pages/UpdateArticle";
import ArticleBody from "../pages/ArticleBody";
import CadArticleBody from "../pages/CadArticleBody";
import UpdateArticleBody from "../pages/UpdateArticleBody";
import UpdateArticleBodyImage from "../pages/UpdateArticleBodyImage";

import baseLogin from "../containers/login";
import baseDashboard from "../containers/dashboard";

export default function Routes() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={baseLogin(Login)} />
            <Route
              path="/cad-user-login"
              exact
              component={baseLogin(CadUserLogin)}
            />
            <Route
              path="/recuperar-senha-login"
              exact
              component={baseLogin(RecuperarSenhaLogin)}
            />
            <Route
              path="/atualizar-senha-login/:chave"
              exact
              component={baseLogin(AtualizarSenhaLogin)}
            />

            <Route
              path="/dashboard"
              exact
              component={baseDashboard(Dashboard)}
            />
            <Route path="/perfil" exact component={baseDashboard(Perfil)} />
            <Route path="/user" exact component={baseDashboard(User)} />
            <Route
              path="/view-user/:id"
              exact
              component={baseDashboard(Viewuser)}
            />
            <Route path="/cad-user" exact component={baseDashboard(CadUser)} />
            <Route
              path="/update-user/:id"
              exact
              component={baseDashboard(UpdateUser)}
            />
            <Route
              path="/update-user-senha/:id"
              exact
              component={baseDashboard(UpdateUserSenha)}
            />
            <Route
              path="/update-perfil"
              exact
              component={baseDashboard(UpdatePerfil)}
            />
            <Route
              path="/update-perfil-senha"
              exact
              component={baseDashboard(UpdatePerfilSenha)}
            />
            <Route
              path="/update-perfil-foto"
              exact
              component={baseDashboard(UpdatePerfilFoto)}
            />
            <Route
              path="/cadarticle"
              exact
              component={baseDashboard(CadArticle)}
            />
            <Route
              path="/myarticles/"
              exact
              component={baseDashboard(MyArticles)}
            />
            <Route
              path="/allarticles"
              exact
              component={baseDashboard(AllArticles)}
            />
            <Route
              path="/viewarticle/:id"
              exact
              component={baseDashboard(ViewArticle)}
            />
            <Route
              path="/updatearticle/:id"
              exact
              component={baseDashboard(UpdateArticle)}
            />
            <Route
              path="/cadarticlebody/:id"
              exact
              component={baseDashboard(CadArticleBody)}
            />
            <Route
              path="/updatearticleimage/:id"
              exact
              component={baseDashboard(UpdateArticleBodyImage)}
            />
            <Route
              path="/articlebody/:id"
              exact
              component={baseDashboard(ArticleBody)}
            />
            <Route
              path="/updatearticlebody/:id"
              exact
              component={baseDashboard(UpdateArticleBody)}
            />
          </Switch>
        </BrowserRouter>
      </Router>
    </Provider>
  );
}
