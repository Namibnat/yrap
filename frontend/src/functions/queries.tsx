import React, { useEffect, useState } from "react";
import config from "../utils/config";
import axios from "axios";

interface IProject {
  id: number;
  key: string;
  title: string;
}

const defaultProjects: IProject[] = [];

const ProjectsList = async () => {
  const url = config.baseUrl;
  const response = await fetch(url);
  return response.json();
};

export default ProjectsList;
