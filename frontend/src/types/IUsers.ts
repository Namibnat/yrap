import React from "react";

export default interface IUser {
  jwt: number | null;
  username?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_admin: boolean;
  password: string;
}
