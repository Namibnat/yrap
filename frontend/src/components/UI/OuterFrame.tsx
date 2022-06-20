import { ReactNode } from "react";
import styles from "./OuterFrame.module.css";

interface Props {
  children?: ReactNode;
}
const OuterFrame = (props: Props): JSX.Element => {
  return <div className={styles.black}>{props.children}</div>;
};

export default OuterFrame;
