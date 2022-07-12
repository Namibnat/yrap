import { useState } from "react";
import styles from "./project.module.scss";
import { useQuery, useMutation, useQueryClient } from "react-query";
import NewProjectForm from "./newProjectForm";
import EditProjectAction from "./editProjectAction";
import MarkDone from "./markDone";
import {
  getProject,
  addAction,
  deleteAction,
  updateAction,
  updateDoneAction,
} from "../../queries/projectQueries";
import IProject from "../../types/IProjects";
import IActions from "../../types/IActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

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
  const updateActionDone = useMutation(updateDoneAction, {
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
      done: false,
      this_week: false,
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
          {project.actions && project.actions.length > 0 ? (
            <>
              <h4>Actions on the project</h4>
              <ul className={styles.actionsList}>
                {project.actions &&
                  project.actions.map((action) => {
                    return (
                      <li className={styles.Action} key={action.key}>
                        <div className={styles.ActionDescription}>
                          {editAction === action.id && (
                            <EditProjectAction
                              updateProjectAction={updateProjectAction}
                              action={action}
                              setCurActionDescVal={setCurActionDescVal}
                              curActionDescVal={curActionDescVal}
                              editActionDesc={editActionDesc}
                            />
                          )}
                          {editAction !== action.id && (
                            <>
                              <span className={styles.ActionDescriptionText}>
                                {action.description}
                              </span>
                              {action.this_week && (
                                <span className={styles.ActionDescriptionWeek}>
                                  Due this week
                                </span>
                              )}
                              <span className={styles.ActionDescriptionDate}>
                                Added:{" "}
                                {moment(action.date_added).format("DD-MM-YYYY")}
                              </span>
                              <MarkDone
                                action={action}
                                updateActionDone={updateActionDone}
                              />
                              <button
                                className="edit"
                                onClick={(e) => editActionDesc(action.id)}
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                            </>
                          )}
                          <button
                            className="trash"
                            onClick={() =>
                              deleteProjectAction.mutate(action.id)
                            }
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </>
          ) : (
            <p>No actions yet</p>
          )}
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
