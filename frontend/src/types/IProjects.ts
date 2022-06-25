import React from "react";

import IActions from "./IActions";

export default interface IProject {
  id?: number;
  key?: string;
  title: string;
  slug: string;
  actions?: IActions[];
}
