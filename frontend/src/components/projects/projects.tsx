import { ReactNode } from "react";
import styles from "./projects.module.css";

const Projects = (): JSX.Element => {
  return (
    <div className={styles.projectFrame}>
      <div className={styles.projectFrameContent}>
        <h2>Projects</h2>
        <form>
          <label>
            Add project
            <input type="text" name="project" placeholder="new project"></input>
          </label>
          <button className="btn btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Projects;
