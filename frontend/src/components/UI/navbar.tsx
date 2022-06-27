import React from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export interface IApplication {}

const NavBar: React.FC<IApplication> = () => {
  return (
    <>
      <div className={styles.navbarFrame}>
        <div className={styles.navbarFrameContent}>
          <h1>YRAP</h1>
          <h2>Your routines and projects</h2>
          <FontAwesomeIcon
            className={styles.navbarFrameIcon}
            icon={faCoffee}
            size="lg"
          />
          <ul className={styles.navbarFrameNavList}>
            <li>
              <a href="/">Dashboard</a>
            </li>
            <li>
              <span className={styles.navbarFrameDivs}>|</span>
            </li>
            <li>
              <a href="/projects/">Projects</a>
            </li>
            <li>
              <span className={styles.navbarFrameDivs}>|</span>
            </li>
            <li>
              <a href="/routines/">Routines</a>
            </li>
            <li>
              <span className={styles.navbarFrameDivs}>|</span>
            </li>
            <li>
              <a href="/weekly/">Weekly Review</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
