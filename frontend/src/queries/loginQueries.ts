import config from "../utils/config";
import IUser from "../types/IUsers";

import axios from "axios";

const slug = () => window.location.pathname.split("/login/")[1].split("/")[0];

const userAPI = axios.create({
  baseURL: config.baseUrl,
});

const login = async (username: string, password: string) => {
  const response = await userAPI.post(`/login/`, {
    username,
    password,
  });
  return response.data;
};

const logout = async (user: IUser) => {
  return await userAPI.post(`/logout/`, {
    jwt: user.jwt,
  });
};
