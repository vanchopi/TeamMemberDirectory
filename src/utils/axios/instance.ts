import axios from "axios";

const instance = axios.create({
  baseURL: "",
  timeout: 60000,
});

export default instance;
