import { useState } from "react";
import styles from "./project.module.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProject } from "../../queries/projectQueries";
import IProject from "../../types/IProjects";
import IActions from "../../types/IActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

const ProjectDetail = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: project,
  } = useQuery<IProject>("project", getProject);

  let projectsContent;
  if (isLoading) {
    projectsContent = <p>Loading...</p>;
  } else if (isError) {
    projectsContent = <p>Error loading projects</p>;
    console.log(error);
  } else {
    if (project) {
      projectsContent = (
        <>
          <h2>{project.title}</h2>
          {project.actions &&
            project.actions.map((action) => {
              return (
                <p key={action.key}>
                  {action.description} <FontAwesomeIcon icon={faTrash} />
                </p>
              );
            })}
        </>
      );
    }
  }
  return (
    <div className={styles.projectDetails}>
      <div>{projectsContent}</div>
      <p>
        <a href="/projects/">All Projects</a>
      </p>
    </div>
  );
};

export default ProjectDetail;
