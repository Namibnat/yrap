import config from "../utils/config";
import IUser from "../types/IUsers";

import axios from "axios";

const userAPI = axios.create({
  baseURL: config.baseUrl,
});

export const loginQ = async (user: IUser) => {
  const response = await userAPI.post(`/login/`, user);
  return response.data;
};

export const logoutQ = async (user: IUser) => {
  return await userAPI.post(`/logout/`, {
    jwt: user.jwt,
  });
};

export default userAPI;
