import config from "../utils/config";
import IProjects from "../types/IProjects";
import axios, { AxiosRequestHeaders } from "axios";

const headers: AxiosRequestHeaders = {
  ...config.postHeaders,
  Authorization: `Bearer "TMP_TOKEN"`, // TODO: replace with real token
};

const projectsAPI = axios.create({
  baseURL: config.baseUrl,
});

export const getProjects = async () => {
  const response = await projectsAPI.get("/projects/", headers);
  return response.data;
};

export const createProject = async (project: IProjects) => {
  return await projectsAPI.post("/projects/add/", project, headers);
};

export default projectsAPI;
