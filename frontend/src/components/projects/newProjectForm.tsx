import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface Props {
  addNewProjectAction: (e: React.FormEvent<HTMLFormElement>) => void;
  setNewProjectActionDesc: (desc: string) => void;
  newProjectActionDesc: string;
}

const NewProjectForm = ({
  addNewProjectAction,
  setNewProjectActionDesc,
  newProjectActionDesc,
}: Props) => {
  return (
    <>
      <form onSubmit={(e) => addNewProjectAction(e)}>
        <input
          onChange={(e) => setNewProjectActionDesc(e.target.value)}
          type="text"
          name="description"
          placeholder="Add action"
          value={newProjectActionDesc}
        />
        <button className="submit">
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </form>
    </>
  );
};

export default NewProjectForm;
