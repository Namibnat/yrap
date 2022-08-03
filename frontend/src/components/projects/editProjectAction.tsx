import React from "react";

import { UseMutationResult } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUpload } from "@fortawesome/free-solid-svg-icons";
import IActions from "../../types/IActions";
import IUpdateAction from "../../types/IUpdateAction";
import { AxiosResponse } from "axios";

interface Props {
  setCurActionDescVal: (desc: string) => void;
  updateProjectAction: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    IUpdateAction,
    unknown
  >;
  editActionDesc: (id: number) => void;
  action: IActions;
  curActionDescVal: string;
}

const EditProjectAction = ({
  updateProjectAction,
  setCurActionDescVal,
  action,
  curActionDescVal,
  editActionDesc,
}: Props) => {
  return (
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
          onChange={(e) => setCurActionDescVal(e.target.value)}
        />
        <button className="submit">
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </form>

      <button className="edit" onClick={(e) => editActionDesc(action.id)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </>
  );
};

export default EditProjectAction;
