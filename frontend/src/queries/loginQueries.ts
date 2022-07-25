import config from "../utils/config";
import IUser from "../types/IUsers";

import axios from "axios";

const userAPI = axios.create({
  baseURL: config.baseUrl,
});

export const loginQ = async (username: string, password: string) => {
  const response = await userAPI.post(`/login/`, {
    username,
    password,
  });
  return response.data;
};

export const logoutQ = async (user: IUser) => {
  return await userAPI.post(`/logout/`, {
    jwt: user.jwt,
  });
};

export default userAPI;
