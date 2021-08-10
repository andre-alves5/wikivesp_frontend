import axios from "axios";
import { getHeaders } from "../actions/localStorage";

const url = process.env.REACT_APP_API_URL;

export const getUser = () => axios.get(url + "/perfil", getHeaders());
