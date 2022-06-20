import React from "react";

export interface IProjectList {
  projects: {
    id: number;
    key: string;
    title: string;
    slug: string;
    actions?: string[];
  }[];
}
