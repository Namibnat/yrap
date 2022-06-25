import config from "../utils/config";
import IProjects from "../types/IProjects";
import axios from "axios";

const projectsAPI = axios.create({
  baseURL: config.baseUrl,
});

export const getProjects = async () => {
  const response = await projectsAPI.get("/projects/");
  return response.data;
};

export const createProject = async (project: IProjects) => {
  return await projectsAPI.post("/projects/add/", project, {
    headers: config.postHeaders,
  });
};

export default projectsAPI;
