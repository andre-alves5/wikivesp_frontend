import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const handleLogin = ({ email, password }) =>
  axios.post(url + "/login", { email, password });
