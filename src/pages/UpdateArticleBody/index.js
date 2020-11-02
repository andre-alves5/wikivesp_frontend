import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";

import { Form, FormGroup, Label, Input } from "reactstrap";
import SpinnerUp from "../../components/SpinnerUp";
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";

import imagem from "../../assets/default.jpg";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

class UpdateArticleBody extends Component {
  state = {
    _id: "",
    idArtigo: "",
    subTitulo: "",
    corpoSubTitulo: "",
    url: "",
    key: "",
    erro: "",
    success: "",
    loading: false,
    formSuccess: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getArticleBody(id);
    this.receberDadosApi();
  }

  async componentDidUpdate(nextProps) {
    const { id } = this.props.match.params;
    if (!this.props.usuario && nextProps.usuario) this.props.getArticleBody(id);
    await this.receberDadosApi();
  }

  componentWillUnmount() {
    this.props.limparArticleDetail();
  }

  getArticleBody(id) {
    this.props.getArticleDetail(id);
    const { articleDetail } = this.props;
    if (this.props.location.state) {
      this.setState({ msg: this.props.location.state.msg });
      this.props.location.state.msg = "";
    }
    if (articleDetail === "undefined") return null;
  }

  receberDadosApi() {
    if (
      typeof this.props.articleDetail !== "undefined" &&
      this.props.articleDetail !== null &&
      !this.state.dadosApi
    ) {
      this.setState({ _id: this.props.articleDetail._id });
      this.setState({ idArtigo: this.props.articleDetail.idArtigo });
      this.setState({ subTitulo: this.props.articleDetail.subTitulo });
      this.setState({
        corpoSubTitulo: this.props.articleDetail.corpoSubTitulo,
      });
      this.setState({ dadosApi: true });
    }
  }

  onChangeInput = (field, ev) => {
    this.setState({ [field]: ev.target.value });
  };

  updateSubTitulo() {
    this.setState({ erro: "" });
    this.setState({ success: "" });
    this.receberDadosForm();
    if (!this.validate()) return;
    const { _id, idArtigo, subTitulo, corpoSubTitulo } = this.state;

    this.setState({ loading: true });

    this.props.putArticleBody(
      { _id, idArtigo, subTitulo, corpoSubTitulo },
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
    this.setState({ subTitulo: document.querySelector("#subTitulo").value });
    this.setState({
      corpoSubTitulo: document.querySelector("#corpoSubTitulo").value,
    });
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
      _id,
      idArtigo,
      subTitulo,
      corpoSubTitulo,
      url,
      key,
      loading,
      erro,
      success,
      formSuccess,
    } = this.state;
    if (formSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/articlebody/" + idArtigo,
            state: { msg: "Subtítulo alterado com sucesso!" },
          }}
        />
      );
    }
    return (
      <>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Editar Subtítulo</h2>
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

          <Link onClick={() => this.updateSubTitulo()} to="#">
            <SpinnerUp loading={loading} />
          </Link>
        </Form>
        <hr />
        <div className="mt-1 img-perfil">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Adicionar Imagem</h2>
          </div>
          <img src={url ? url : imagem} alt={key} width="600" height="300" />
          <div className="edit">
            <Link to={"/updatearticleimage/" + _id}>
              <button className="btn btn-outline-warning btn-sm">
                <FontAwesomeIcon icon="edit" />
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  articleDetail: state.article.articleDetail,
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(UpdateArticleBody);
