import React from "react";

export default interface IActions {
  id: number;
  key: string;
  description: string;
  this_week?: boolean;
  date_added?: string;
  done: boolean;
}
