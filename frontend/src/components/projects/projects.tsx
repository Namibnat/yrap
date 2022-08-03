import { useState } from "react";
import styles from "./projects.module.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject } from "../../queries/projectsQueries";
import IProject from "../../types/IProjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const Projects = (): JSX.Element => {
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");
  const [newProjectDoneWhen, setNewProjectDoneWhen] = useState<string>("");

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
        done_when: newProjectDoneWhen,
      };
      addProjectMutation.mutate(form_json);
      setNewProjectTitle("");
      setNewProjectDoneWhen("");
    }
  };

  return (
    <div className={styles.projectsFrame}>
      <h2>Projects</h2>
      <div className={styles.addProjectsFrameContent}>
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
          <label htmlFor="done_when">The project will be done when...</label>
          <textarea
            onChange={(e) => setNewProjectDoneWhen(e.target.value)}
            value={newProjectDoneWhen}
            name="done_when"
          >
            "{newProjectTitle}" will be done when...
          </textarea>
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
