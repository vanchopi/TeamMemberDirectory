import axios from "axios";

const instance = axios.create({
  timeout: 60000,
});

export default instance;
