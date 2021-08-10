import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";

import { Form, FormGroup, Label, Input } from "reactstrap";
import SpinnerUp from "../../components/SpinnerUp";
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";

class UpdateArticle extends Component {
  state = {
    _id: "",
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
    dadosApi: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getArticleLocal(id);
    this.receberDadosApi();
  }

  async componentDidUpdate(nextProps) {
    const { id } = this.props.match.params;
    if (!this.props.usuario && nextProps.usuario)
      this.props.getArticleLocal(id);
    await this.receberDadosApi();
  }

  componentWillUnmount() {
    this.props.limparArticle();
  }

  getArticleLocal(id) {
    this.props.getArticle(id);
    const { article } = this.props;
    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
      this.props.location.state.msg = "";
    }
    if (article === "undefined") return null;
  }

  receberDadosApi() {
    if (
      typeof this.props.article !== "undefined" &&
      this.props.article !== null &&
      !this.state.dadosApi
    ) {
      this.setState({ _id: this.props.article._id });
      this.setState({ idAutor: this.props.article.idAutor });
      this.setState({ autor: this.props.article.autor });
      this.setState({ titulo: this.props.article.titulo });
      this.setState({ introducao: this.props.article.introducao });
      this.setState({ indice: this.props.article.indice });
      this.setState({ bibliografia: this.props.article.bibliografia });
      this.setState({ categoria: this.props.article.categoria });
      this.setState({ dadosApi: true });
    }
  }

  onChangeInput = (field, ev) => {
    this.setState({ [field]: ev.target.value });
  };

  updateArticle() {
    this.setState({ erro: "" });
    this.setState({ success: "" });
    this.receberDadosForm();
    if (!this.validate()) return;
    const {
      _id,
      idAutor,
      autor,
      titulo,
      introducao,
      indice,
      bibliografia,
      categoria,
    } = this.state;

    this.setState({ loading: true });

    this.props.putArticle(
      {
        _id,
        idAutor,
        autor,
        titulo,
        introducao,
        indice,
        bibliografia,
        categoria,
      },
      (msg) => {
        if (msg.erro.error) {
          this.setState({ erro: { message: msg.erro.message } });
          this.setState({ loading: false });
        } else {
          this.setState({ success: { message: msg.erro.message } });
          this.setState({ loading: false });
          this.setState({ formSuccess: true });
        }
      }
    );
  }

  receberDadosForm() {
    this.setState({ _id: document.querySelector("#_id").value });
    this.setState({ titulo: document.querySelector("#titulo").value });
    this.setState({ introducao: document.querySelector("#introducao").value });
    this.setState({ indice: document.querySelector("#indice").value });
    this.setState({
      bibliografia: document.querySelector("#bibliografia").value,
    });
    this.setState({ categoria: document.querySelector("#categoria").value });
  }

  validate() {
    const { titulo, introducao, categoria } = this.state;
    if (!titulo)
      return this.setState({ erro: { message: "Preencha o campo Titulo!" } });
    if (!introducao)
      return this.setState({
        erro: { message: "Preencha o campo Introdção!" },
      });
    if (!categoria)
      return this.setState({
        erro: { message: "Preencha o campo Categoria!" },
      });
    return true;
  }

  render() {
    const {
      _id,
      titulo,
      introducao,
      indice,
      bibliografia,
      categoria,
      loading,
      erro,
      success,
      formSuccess,
    } = this.state;
    if (formSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/myarticles",
            state: { msg: "Artigo alterado com sucesso!" },
          }}
        />
      );
    }
    return (
      <>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Editar Artigo</h2>
          </div>
          <Link to={"/cadarticlebody/" + _id}>
            <button className="btn btn-outline-info btn-sm">
              Adicionar SubTitulos
            </button>
          </Link>
          <Link to={"/articlebody/" + _id}>
            <button className="ml-1 btn btn-outline-info btn-sm">
              Visualizar SubTitulos
            </button>
          </Link>
        </div>
        <hr />
        <AlertDanger erros={erro} />
        <AlertSuccess erros={success} />
        <Form>
          <Input type="hidden" value={_id} name="_id" id="_id" />
          <FormGroup>
            <Label for="name">Titulo</Label>
            <Input
              type="text"
              value={titulo}
              name="titulo"
              id="titulo"
              className="form-control"
              placeholder="Titulo do Artigo"
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
              className="form-control"
              placeholder="Introdução do seu Artigo"
              autoComplete="introducao"
              onChange={(ev) => this.onChangeInput("introducao", ev)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Indice</Label>
            <Input
              type="textarea"
              value={indice}
              name="indice"
              id="indice"
              className="form-control"
              placeholder="Indice do seu Artigo"
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
              className="form-control"
              placeholder="Bibliografia do seu Artigo"
              autoComplete="bibliografia"
              onChange={(ev) => this.onChangeInput("bibliografia", ev)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Categoria</Label>
            <Input
              type="text"
              value={categoria}
              name="categoria"
              id="categoria"
              className="form-control"
              placeholder="Categoria do seu Artigo"
              autoComplete="categoria"
              onChange={(ev) => this.onChangeInput("categoria", ev)}
            />
          </FormGroup>

          <Link onClick={() => this.updateArticle()} to="#">
            <SpinnerUp loading={loading} />
          </Link>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  article: state.article.article,
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(UpdateArticle);
