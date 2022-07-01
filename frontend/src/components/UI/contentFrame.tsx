import { ReactNode } from "react";
import styles from "./contentFrame.module.scss";

interface Props {
  children?: ReactNode;
}
const ContentFrame = (props: Props): JSX.Element => {
  return (
    <div className={styles.ContentFrame}>
      <div className={styles.ContentFrameContent}>{props.children}</div>
    </div>
  );
};

export default ContentFrame;
