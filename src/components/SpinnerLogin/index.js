import React from "react";
import { Button, Spinner } from "reactstrap";

const SpinnerLogin = (props) => {
  if (props.loading)
    return (
      <Button
        type="button"
        color="secondary"
        className="btn btn-lg btn-block"
        disabled
      >
        Acessando...
        <Spinner className="ml-1" size="sm" color="light" />
      </Button>
    );

  return (
    <Button type="button" color="secondary" className="btn btn-lg btn-block">
      Acessar
    </Button>
  );
};

export default SpinnerLogin;
