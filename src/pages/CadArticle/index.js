import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";
import { Form, FormGroup, Label, Input } from "reactstrap";
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerCad from "../../components/SpinnerCad";

class CadArticle extends Component {
  state = {
    idAutor: "",
    autor: "",
    titulo: "",
    introducao: "",
    indice: "",
    bibliografia: "",
    categoria: "",
    erro: "",
    success: "",
    loading: false,
    formSuccess: false,
  };

  onChangeInput = (field, ev) => {
    this.setState({ [field]: ev.target.value });
    this.setState({ idAutor: this.props.usuario._id });
    this.setState({ autor: this.props.usuario.name });
  };

  cadArticle() {
    const {
      idAutor,
      autor,
      titulo,
      introducao,
      indice,
      bibliografia,
      categoria,
    } = this.state;
    if (!this.validate()) return;

    this.setState({ loading: true });

    this.props.postArticle(
      { idAutor, autor, titulo, introducao, indice, bibliografia, categoria },
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
    const { titulo, introducao, categoria } = this.state;
    if (!titulo)
      return this.setState({
        erro: { message: "Preencha o Titulo do Artigo!" },
      });
    if (!introducao)
      return this.setState({
        erro: { message: "Preencha a Introdução do seu Artigo!" },
      });
    if (!categoria)
      return this.setState({
        erro: { message: "Preencha o campo categoria!" },
      });
    return true;
  }

  render() {
    const {
      idAutor,
      autor,
      titulo,
      introducao,
      indice,
      bibliografia,
      categoria,
      erro,
      success,
      loading,
      formSuccess,
    } = this.state;

    if (formSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/myarticles",
            state: { msg: "Artigo cadastrado com sucesso!" },
          }}
        />
      );
    }

    return (
      <>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Cadastrar Novo Artigo</h2>
          </div>
          <Link to={"/myarticles"}>
            <button className="btn btn-outline-info btn-sm">
              Meus Artigos
            </button>
          </Link>
          <Link to={"/allarticles"}>
            <button className="ml-1 btn btn-outline-info btn-sm">
              Todos Artigos
            </button>
          </Link>
        </div>
        <hr />
        <AlertDanger erros={erro} />
        <AlertSuccess erros={success} />
        <Form>
          <Input type="hidden" value={idAutor} name="idAutor" id="idAutor" />
          <Input type="hidden" value={autor} name="autor" id="autor" />
          <FormGroup>
            <Label for="name">* Titulo</Label>
            <Input
              type="text"
              value={titulo}
              name="titulo"
              id="titulo"
              placeholder="Insira o titulo do seu Artigo"
              autoComplete="titulo"
              onChange={(ev) => this.onChangeInput("titulo", ev)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="name">Introdução</Label>
            <Input
              type="textarea"
              value={introducao}
              name="introducao"
              id="introducao"
              placeholder="Digite a Introdução do seu Artigo"
              autoComplete="introducao"
              onChange={(ev) => this.onChangeInput("introducao", ev)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="name">* Indice</Label>
            <Input
              type="textarea"
              value={indice}
              name="indice"
              id="indice"
              placeholder="Digite o Indice do seu Artigo"
              autoComplete="indice"
              onChange={(ev) => this.onChangeInput("indice", ev)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="name">Bibliografia</Label>
            <Input
              type="textarea"
              value={bibliografia}
              name="bibliografia"
              id="bibliografia"
              placeholder="Digite a Bibliografia do seu Artigo"
              autoComplete="bibliografia"
              onChange={(ev) => this.onChangeInput("bibliografia", ev)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">* Categoria</Label>
            <Input
              type="text"
              value={categoria}
              name="categoria"
              id="categoria"
              placeholder="Digite a Categoria do seu Artigo"
              autoComplete="categoria"
              onChange={(ev) => this.onChangeInput("categoria", ev)}
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

export default connect(null, actions)(CadArticle);
