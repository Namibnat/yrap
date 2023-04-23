import config from "../utils/config";
import IProject from "../types/IProjects";
import IActions from "../types/IActions";
import IUpdateAction from "../types/IUpdateAction";
import axios, { AxiosRequestHeaders } from "axios";
import curLocalTime from "../utils/localTime";

const slug = () =>
  window.location.pathname.split("/projects/")[1].split("/")[0];

const headers: AxiosRequestHeaders = {
  ...config.postHeaders,
  Authorization: `Bearer "TMP_TOKEN"`, // TODO: replace with real token
};

const projectAPI = axios.create({
  baseURL: config.baseUrl,
});

export const getProject = async () => {
  const response = await projectAPI.get(`/projects/detail/${slug()}/`, headers);
  return response.data;
};

export const updateProject = async (project: IProject) => {
  return await projectAPI.patch(`/projects/detail/${slug()}/`, headers);
};

export const addAction = async (action: IActions) => {
  action.date_added = curLocalTime();
  return await projectAPI.post(
    `/projects/detail/${slug()}/action/`,
    action,
    headers
  );
};

export const updateAction = async (action_info: IUpdateAction) => {
  action_info.action_ref.description = action_info.new_desc;
  return await projectAPI.patch(
    `/projects/detail/${slug()}/action/${action_info.action_ref.id}/`,
    action_info.action_ref,
    headers
  );
};

export const updateDoneAction = async (action: IActions) => {
  action.done = !action.done;
  console.log(action);
  return await projectAPI.patch(
    `/projects/detail/${slug()}/action/${action.id}/`,
    action,
    headers
  );
};

export const deleteAction = async (action_id: number) => {
  return await projectAPI.delete(
    `/projects/detail/${slug()}/action/${action_id}/`,
    headers
  );
};

export const thisWeekAction = async (action: IActions) => {
  action.this_week = !action.this_week;
  return await projectAPI.patch(
    `/projects/detail/${slug()}/action/${action.id}/`,
    action,
    headers
  );
};

