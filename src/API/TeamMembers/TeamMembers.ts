import axios from "@/utils/axios/instance";

export default class TeamMembersApi {
  _url: string;

  constructor() {
    this._url = process.env.BASE_URL;
  }

  get<T = any>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get(`${this._url}${url}`)
          .then(({ data }) => resolve(data))
          .catch((error) => reject(error));
      }, 1000); // response delay imitation
    });
  }
}
