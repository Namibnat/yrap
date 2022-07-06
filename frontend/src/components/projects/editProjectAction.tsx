import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface Props {
  updateProjectAction: (e: React.FormEvent<HTMLFormElement>) => void;
  setCurActionDescVal: (desc: string) => void;
  action: (e: React.FormEvent<HTMLFormElement>) => void;
  curActionDescVal: string;
}

const EditProjectAction = ({
  updateProjectAction,
  setCurActionDescVal,
  action,
  curActionDescVal,
}: Props) => {
  return (
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
        onChange={(e) => setCurActionDescVal(e.target.value)}
      />
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
};

export default EditProjectAction;
