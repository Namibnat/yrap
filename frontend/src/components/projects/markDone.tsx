import React from "react";
import IActions from "../../types/IActions";
import IUpdateAction from "../../types/IUpdateAction";

import { UseMutationResult } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { AxiosResponse } from "axios";

interface Props {
  action: IActions;
  updateActionDone: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    IActions,
    unknown
  >;
}
const MarkDone = ({ action, updateActionDone }: Props) => {
  return (
    <>
      <button onClick={() => updateActionDone.mutate(action)}>
        {action && action.done ? (
          <FontAwesomeIcon icon={faSquareCheck} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}
      </button>
    </>
  );
};

export default MarkDone;
