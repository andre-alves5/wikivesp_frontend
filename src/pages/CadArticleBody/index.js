import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";
import { Form, FormGroup, Label, Input } from "reactstrap";
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerCad from "../../components/SpinnerCad";

class CadArticleBody extends Component {
  state = {
    idArtigo: "",
    subTitulo: "",
    corpoSubTitulo: "",
    erro: "",
    success: "",
    loading: false,
    formSuccess: false,
  };

  onChangeInput = (field, ev) => {
    this.setState({ [field]: ev.target.value });
  };

  cadArticle() {
    const { id } = this.props.match.params;
    this.setState({ idArtigo: id });
    const idArtigo = id;
    const { subTitulo, corpoSubTitulo } = this.state;
    if (!this.validate()) return;

    this.setState({ loading: true });

    this.props.postArticleDetail(
      id,
      { idArtigo, subTitulo, corpoSubTitulo },
      (msg) => {
        if (msg.erro.error) {
          this.setState({ erro: { message: msg.erro.message } });
          this.setState({ success: "" });
          this.setState({ loading: false });
        } else {
          this.setState({ success: { message: msg.erro.message } });
          this.setState({ erro: "" });
          this.setState({ formSuccess: true });
          this.setState({ loading: false });
        }
      }
    );
  }

  validate() {
    const { subTitulo, corpoSubTitulo } = this.state;
    if (!subTitulo)
      return this.setState({
        erro: { message: "Preencha o Subtítulo do Artigo!" },
      });
    if (!corpoSubTitulo)
      return this.setState({
        erro: { message: "Preencha o Conteúdo para este Subtítulo!" },
      });
    return true;
  }

  render() {
    const {
      idArtigo,
      subTitulo,
      corpoSubTitulo,
      erro,
      success,
      loading,
      formSuccess,
    } = this.state;

    if (formSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/viewarticle/" + idArtigo,
            state: { msg: "Artigo cadastrado com sucesso!" },
          }}
        />
      );
    }

    return (
      <>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Cadastrar Subtítulos ao Artigo</h2>
          </div>
          <Link to={"#"}>
            <button className="btn btn-outline-info btn-sm">
              Meus Artigos
            </button>
          </Link>
          <Link to={"#"}>
            <button className="ml-1 btn btn-outline-info btn-sm">
              Todos Artigos
            </button>
          </Link>
        </div>
        <hr />
        <AlertDanger erros={erro} />
        <AlertSuccess erros={success} />
        <Form>
          <FormGroup>
            <Label for="name">Subtítulo</Label>
            <Input
              type="text"
              value={subTitulo}
              name="subTitulo"
              id="subTitulo"
              placeholder="Insira o Subtítulo do seu Artigo"
              autoComplete="subTitulo"
              onChange={(ev) => this.onChangeInput("subTitulo", ev)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="name">Conteúdo</Label>
            <Input
              type="textarea"
              value={corpoSubTitulo}
              name="corpoSubTitulo"
              id="corpoSubTitulo"
              placeholder="Digite o Conteúdo deste seu Subtítulo"
              autoComplete="corpoSubTitulo"
              onChange={(ev) => this.onChangeInput("corpoSubTitulo", ev)}
            />
          </FormGroup>

          <Link onClick={() => this.cadArticle()} to="#">
            <SpinnerCad loading={loading} />
          </Link>
        </Form>
      </>
    );
  }
}

export default connect(null, actions)(CadArticleBody);
