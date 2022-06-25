import { useState } from "react";
import styles from "./projects.module.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProjects, createProject } from "../../queries/projectsQueries";
import IProject from "../../types/IProjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const Projects = (): JSX.Element => {
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: allProjects,
  } = useQuery<IProject[]>("projects", getProjects);

  let projectsContent;
  if (isLoading) {
    projectsContent = <p>Loading...</p>;
  } else if (isError) {
    projectsContent = <p>Error loading projects</p>;
    console.log(error);
  } else {
    projectsContent = allProjects?.map((project) => {
      return (
        <li key={project.key}>
          <a href={`${project.slug}/`}>{project.title}</a>
        </li>
      );
    });
  }

  const addProjectMutation = useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });

  const addNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newProjectTitle) {
      const slug = newProjectTitle.replaceAll(" ", "_").toLowerCase();
      const form_json: IProject = {
        id: -1,
        key: "tmp",
        title: newProjectTitle,
        slug: slug,
      };
      addProjectMutation.mutate(form_json);
      setNewProjectTitle("");
    }
  };

  return (
    <div className={styles.projectsFrame}>
      <h2>Projects</h2>
      <div className={styles.projectsFrameContent}>
        <h4>Add A Project</h4>
        <form onSubmit={(e) => addNewProject(e)}>
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setNewProjectTitle(e.target.value)}
            value={newProjectTitle}
            type="text"
            name="title"
            placeholder="project title"
          ></input>
          <button className="submit">
            <FontAwesomeIcon icon={faUpload} />
          </button>
        </form>
      </div>

      <div className={styles.projectsFrameContent}>
        <h3>Projects</h3>
        <div>
          <ul>{projectsContent}</ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
