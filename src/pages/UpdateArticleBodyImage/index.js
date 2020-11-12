import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions/articles";

import { Form, FormGroup, Input } from "reactstrap";
import imagem from "../../assets/placeholder.jpg";
import SpinnerUp from "../../components/SpinnerUp";
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";

class UpdateArticleBodyImage extends Component {
  state = {
    _id: "",
    file: null,
    url: "",
    erro: "",
    success: "",
    loading: false,
    formSuccess: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.getArticleBodyImage(id);
    await this.receberDadosApi();
  }
  async componentDidUpdate(nextProps) {
    const { id } = this.props.match.params;
    if (!this.props.usuario && nextProps.usuario)
      this.props.getArticleBodyImage(id);
    await this.receberDadosApi();
  }

  getArticleBodyImage(id) {
    this.props.getArticleDetail(id);
    const { articleDetail } = this.props;
    console.log(articleDetail);
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
      this.setState({ url: this.props.articleDetail.url });
      this.setState({ dadosApi: true });
    }
  }

  onChangeInput = (field, ev) => {
    this.setState({ [field]: ev.target.files[0] });
  };

  async updateArticleBodyImageLocal() {
    const { _id } = this.state;
    console.log(_id);
    this.setState({ erro: "" });
    this.setState({ success: "" });

    if (!this.validate()) return;
    this.setState({ loading: true });

    const formData = new FormData();
    formData.append("file", this.state.file);

    await this.props.putArticleImage({ _id }, formData, (msg) => {
      if (msg.erro.error) {
        this.setState({ erro: { message: msg.erro.message } });
        this.setState({ loading: false });
      } else {
        this.setState({ success: { message: msg.erro.message } });
        this.setState({ loading: false });
        this.setState({ formSuccess: true });
      }
    });
  }
  validate() {
    const { file } = this.state;
    if (!file)
      return this.setState({
        erro: { message: "Necessário selecionar uma imagem!" },
      });
    return true;
  }

  componentWillUnmount() {
    this.props.limparArticleDetail();
  }
  render() {
    const { _id, file, url, loading, erro, success, formSuccess } = this.state;
    if (formSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/updatearticlebody/" + _id,
            state: { msg: "Imagem do Subtítulo editada com sucesso!" },
          }}
        />
      );
    }

    return (
      <>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h2 className="display-4 titulo">Editar Imagem Subtítulo</h2>
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
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Imagem do Subtítulo"
                width="300"
                height="300"
              />
            ) : url ? (
              <img
                src={url}
                alt="Imagem do Subtítulo"
                width="300"
                height="300"
              />
            ) : (
              <img
                src={imagem}
                alt="Imagem do Subtítulo"
                width="300"
                height="300"
              />
            )}
          </FormGroup>

          <FormGroup>
            <Input
              type="file"
              name="file"
              id="file"
              autoComplete="file"
              onChange={(ev) => this.onChangeInput("file", ev)}
            />
          </FormGroup>

          <Link onClick={() => this.updateArticleBodyImageLocal()} to="#">
            <SpinnerUp loading={loading} />
          </Link>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  articleDetail: state.article.articleDetail,
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(UpdateArticleBodyImage);
