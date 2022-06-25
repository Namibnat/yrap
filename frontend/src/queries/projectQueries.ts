import config from "../utils/config";
// import IProject from "../../types/IProjects";
import axios from "axios";

const projectAPI = axios.create({
  baseURL: config.baseUrl,
});

export const getProject = async () => {
  const slug = window.location.pathname.split("/projects/")[1].split("/")[0];
  const response = await projectAPI.get(`/projects/detail/${slug}`);
  return response.data;
};

export default projectAPI;
