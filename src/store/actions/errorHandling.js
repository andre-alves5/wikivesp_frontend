const errorHandling = (error) => {
  if (!error.response || !error.response.data) {
    return {
      erro: {
        error: true,
        status: 500,
        message: "Ocorreu um erro no servidor. Tente mais tarde!",
      },
    };
  }
  return { erro: error.response.data };
};

export default errorHandling;
