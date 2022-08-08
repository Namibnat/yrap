/**
 * import { Navigate } from "react-router";
 */

import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/dashboard";
import Projects from "../components/projects/projects";
import ProjectDetail from "../components/projects/project";
import Page404 from "../components/errors/page404";

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isLoggedIn = useAuth();
  if (!isLoggedIn) {
    console.log("Not logged in");
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="projects/" element={<Projects />} />
      <Route path="/projects/:project_slug/" element={<ProjectDetail />} />
      <Route path="routines/" element={<p>stuff will come here</p>} />
      <Route path="weekly/" element={<p>stuff will come here</p>} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default ProtectedRoutes;
