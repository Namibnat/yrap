import config from "../utils/config";
import IProject from "../types/IProjects";
import IActions from "../types/IActions";
import IUpdateAction from "../types/IUpdateAction";
import axios from "axios";
import curLocalTime from "../utils/localTime";

const slug = () =>
  window.location.pathname.split("/projects/")[1].split("/")[0];

const projectAPI = axios.create({
  baseURL: config.baseUrl,
});

export const getProject = async () => {
  const response = await projectAPI.get(`/projects/detail/${slug()}/`);
  return response.data;
};

export const updateProject = async (project: IProject) => {
  return await projectAPI.patch(`/projects/detail/${slug()}/`);
};

export const addAction = async (action: IActions) => {
  action.date_added = curLocalTime();
  return await projectAPI.post(`/projects/detail/${slug()}/action/`, action);
};

export const updateAction = async (action_info: IUpdateAction) => {
  action_info.action_ref.description = action_info.new_desc;
  return await projectAPI.patch(
    `/projects/detail/${slug()}/action/${action_info.action_ref.id}/`,
    action_info.action_ref
  );
};

export const deleteAction = async (action_id: number) => {
  return await projectAPI.delete(
    `/projects/detail/${slug()}/action/${action_id}/`
  );
};

export default projectAPI;
