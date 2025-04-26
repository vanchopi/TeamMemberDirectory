import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 60000,
});

export default instance;
