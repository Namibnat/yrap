import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Dashboard from "./components/dashboard/dashboard";
import Projects from "./components/projects/projects";
import ProjectDetail from "./components/projects/project";
import { NavBar, OuterFrame, Footer, ContentFrame } from "./components/UI";

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
              <Route path="/" element={<Dashboard />} />
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
