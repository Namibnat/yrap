import { useState } from "react";
import styles from "./project.module.scss";
import { useQuery, useMutation, useQueryClient } from "react-query";
import NewProjectForm from "./newProjectForm";
import {
  getProject,
  addAction,
  deleteAction,
  updateAction,
} from "../../queries/projectQueries";
import IProject from "../../types/IProjects";
import IActions from "../../types/IActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUpload,
  faPen,
  faXmark,
  faSquareCheck,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

const ProjectDetail = () => {
  const UNSET = -1;
  const [newProjectActionDesc, setNewProjectActionDesc] = useState<string>("");
  const [editAction, setEditAction] = useState<number>(UNSET);
  const [curActionDescVal, setCurActionDescVal] = useState<string>("");

  const editActionDesc = (id: number) => {
    setEditAction(editAction === id ? UNSET : id);
  };

  const queryClient = useQueryClient();

  const {
    isLoading: loadingProject,
    isError: errorProject,
    error: errorProjectText,
    data: project,
  } = useQuery<IProject>("project", getProject);

  const invalProjects = () => queryClient.invalidateQueries("project");

  const addProjectActionMutation = useMutation(addAction, {
    onSuccess: () => invalProjects(),
  });
  const updateProjectAction = useMutation(updateAction, {
    onSuccess: () => invalProjects(),
  });
  const deleteProjectAction = useMutation(deleteAction, {
    onSuccess: () => invalProjects(),
  });

  const addNewProjectAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form_json: IActions = {
      id: UNSET,
      key: "tmp",
      description: newProjectActionDesc,
    };
    addProjectActionMutation.mutate(form_json);
    setNewProjectActionDesc("");
  };

  let projectsContent;
  if (loadingProject) {
    projectsContent = <p>Loading...</p>;
  } else if (errorProject) {
    projectsContent = <p>Error loading projects</p>;
    console.log(errorProjectText);
  } else {
    if (project) {
      projectsContent = (
        <>
          <h2>{project.title}</h2>
          <p>{project.done_when}</p>
          <div className={styles.addActionFormContainer}>
            <NewProjectForm
              addNewProjectAction={addNewProjectAction}
              setNewProjectActionDesc={setNewProjectActionDesc}
              newProjectActionDesc={newProjectActionDesc}
            />
          </div>
          {project.actions &&
            project.actions.map((action) => {
              return (
                <div className={styles.Action} key={action.key}>
                  <div className={styles.ActionDescription}>
                    {editAction === action.id && (
                      <>
                        <form
                          onSubmit={() =>
                            updateProjectAction.mutate({
                              action_ref: action,
                              new_desc: curActionDescVal,
                            })
                          }
                        >
                          <input
                            type="text"
                            placeholder={action.description}
                            name="description"
                            onChange={(e) =>
                              setCurActionDescVal(e.target.value)
                            }
                          />
                          <button className="submit">
                            <FontAwesomeIcon icon={faUpload} />
                          </button>
                        </form>
                        <button
                          className="edit"
                          onClick={(e) => editActionDesc(action.id)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </>
                    )}
                    {editAction !== action.id && (
                      <>
                        {action.description}&nbsp;&nbsp;-&nbsp;&nbsp;
                        {action.date_added}&nbsp;&nbsp;-&nbsp;&nbsp;
                        <button
                          className="edit"
                          onClick={(e) => editActionDesc(action.id)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <span className={styles.FixThisUp}>
                          FixThisUp - &nbsp;&nbsp; --- TODO &nbsp;&nbsp;
                          <FontAwesomeIcon icon={faSquareCheck} />
                          &nbsp;vs&nbsp;
                          <FontAwesomeIcon icon={faSquare} />
                          &nbsp;&nbsp; TODO --- &nbsp;&nbsp; (and add state,
                          active, this_week, deleted) - FixThisUp
                        </span>
                      </>
                    )}

                    <button
                      className="trash"
                      onClick={() => deleteProjectAction.mutate(action.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
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
