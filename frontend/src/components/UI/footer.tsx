import React from "react";
import styles from "./footer.module.scss";

export interface IApplication {}

const Footer: React.FC<IApplication> = () => {
  return (
    <>
      <div className={styles.footerFrame}>
        <div className={styles.footerFrameContent}>
          <p>future footer</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
