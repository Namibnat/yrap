import config from "../utils/config";
import IUser from "../types/IUsers";
import axios, { AxiosRequestHeaders } from "axios";

const headers: AxiosRequestHeaders = {
  ...config.postHeaders,
  Authorization: `Bearer "TMP_TOKEN"`, // TODO: replace with real token
};

const userAPI = axios.create({
  baseURL: config.baseUrl,
});

export const loginQ = async (user: IUser) => {
  const response = await userAPI.post(`/login/`, user, headers);
  return response.data;
};

// export const logoutQ = async (user: IUser) => {
//   return await userAPI.post(`/logout/`, headers);
// };

export default userAPI;
