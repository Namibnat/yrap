import React from "react";
import IUser from "../../types/IUsers";
import {useState} from "react";
import {loginQ} from "../../queries/loginQueries";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

const Login = () => {
    const queryClient = useQueryClient();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const invalidateUser = () => queryClient.invalidateQueries(["user"]);

    const {
        isLoading: loadingLogin,
        isError: errorLogin,
        error: errorLoginText,
        data: user,
    } = useQuery<IUser>(["user"], loginQ);

    const performLoginMutation = useMutation(loginQ, {
        onSuccess: () => invalidateUser(),
    });

    const userLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form_json: IUser = {
            email: email,
            password: password,
            is_admin: false,
            jwt: null,
        };
        performLoginMutation.mutate(form_json);
        // On success, redirect to /dashboard
        window.location.href = "/dashboard";
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => userLogin(e)}>
                <label htmlFor="email">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
