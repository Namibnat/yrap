import React from "react";
import IUser from "../../types/IUsers";
import { useState } from "react";
import { loginQ } from "../../queries/loginQueries";
import { useQuery, useMutation, useQueryClient } from "react-query";

const login = () => {
  const queryClient = useQueryClient();

  // const {
  //   isLoading: loadingProject,
  //   isError: errorProject,
  //   error: errorProjectText,
  //   data: project,
  // } = useQuery<IUser>("user", getLogin);

  const invalUser = () => queryClient.invalidateQueries("user");

  const performLoginMutation = useMutation(loginQ, {
    onSuccess: () => invalUser(),
  });

  const userLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form_json: IUser = {
      email: "",
      password: "",
      is_admin: false,
    };
    performLoginMutation.mutate(form_json);
    // TODO: Pick up from here
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => userLogin(e)}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default login;
