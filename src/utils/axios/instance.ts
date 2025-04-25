import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL || null,
  timeout: 60000,
});

export default instance;
