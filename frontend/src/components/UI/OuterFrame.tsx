import { ReactNode } from "react";
import styles from "./OuterFrame.module.scss";

interface Props {
  children?: ReactNode;
}

const OuterFrame = (props: Props): JSX.Element => {
  return <div className={styles.MainFrame}>{props.children}</div>;
};

export default OuterFrame;
