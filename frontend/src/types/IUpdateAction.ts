import React from "react";

import IActions from "./IActions";

export default interface IUpdateAction {
  action_ref: IActions;
  new_desc: string;
}
