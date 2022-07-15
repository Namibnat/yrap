import React from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Dashboard from "./components/dashboard/dashboard";
import Projects from "./components/projects/projects";
import Login from "./components/login/login";
import ProjectDetail from "./components/projects/project";
import { NavBar, OuterFrame, Footer, ContentFrame } from "./components/UI";

export interface IApplication {}

const queryClient = new QueryClient();

const Router: React.FC<IApplication> = () => {
  const isAuthenticated = () => {
    return true;
  };
  const ProtectedRoute = ({ child }: JSX.Element) => {
    if (isAuthenticated()) {
      return child;
    }
    return <Redirect to="/login" />;
  };
  return (
    <QueryClientProvider client={queryClient}>
      <OuterFrame>
        <NavBar />
        <ContentFrame>
          <BrowserRouter>
            <Routes>
              <Route path="login/" element={<Login />} />
              {/* <Route path="/" element={<Dashboard />} />
               */}
              <Route
                path="/"
                element={<ProtectedRoute child={<Dashboard />} />}
              />
              <Route path="projects/" element={<Projects />} />
              <Route
                path="/projects/:project_slug/"
                element={<ProjectDetail />}
              />
              <Route path="routines/" element={<p>stuff will come here</p>} />
              <Route path="weekly/" element={<p>stuff will come here</p>} />
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
