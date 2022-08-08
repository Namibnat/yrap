import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Login from "./components/login/login";
import { NavBar, OuterFrame, Footer, ContentFrame } from "./components/UI";
import ProtectedRoutes from "./auth/protectedRoutes";

export interface IApplication {}

const queryClient = new QueryClient();

const Router: React.FC<IApplication> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OuterFrame>
        <NavBar />
        <ContentFrame>
          <BrowserRouter>
            <Routes>
              <Route path="login/" element={<Login />} />
              <Route path="*" element={<ProtectedRoutes />} />
            </Routes>
          </BrowserRouter>
        </ContentFrame>
        <Footer />
      </OuterFrame>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Router;
