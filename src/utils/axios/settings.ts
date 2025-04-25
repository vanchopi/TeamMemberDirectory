import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import instance from "./instance";
import { errorMessage } from "@/utils/notifications";

const notificationString = (err: AxiosError): void => {
  const status = err.response?.status;
  const message = err.message || `Ошибка ${status}`;
  errorMessage(message);
};

const settings = (): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
        config.headers["Accept-encoding"] = "gzip, deflate";
      }

      if (config.url) {
        config.headers["accept"] = "*/*";
        config.headers["X-CSRF-TOKEN"] = "";
        config.headers["Access-Control-Allow-Origin"] = "*";
      }

      if (config.method === "patch") {
        config.headers["Content-Type"] = "application/json;charset=utf-8";
      }

      return config;
    },
    (error: AxiosError) => {
      console.error("Request error");
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (err: AxiosError) => {
      const status = err.response?.status;

      if (status) {
        switch (status) {
          case 400:
            console.log("Bad Request");
            break;
          case 401:
            console.log("Unauthorized");
            break;
          case 403:
            console.log("Forbidden");
            break;
          case 404:
            console.log("Not Found");
            break;
          case 501:
            console.log("Not Implemented");
            break;
          case 503:
            console.log("Service Unavailable");
            break;
          default:
            console.log("Response error");
        }

        notificationString(err);
      }

      if (err.message.includes("timeout")) {
        console.error(err.message);
      }

      return Promise.reject(err);
    }
  );
};

export default settings;