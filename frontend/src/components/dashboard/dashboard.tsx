import { ReactNode } from "react";
import styles from "./dashboard.module.scss";

interface Props {
  children?: ReactNode;
}
const Dashboard = (props: Props): JSX.Element => {
  return (
    <div className={styles.ContentFrame}>
      <div className={styles.ContentFrameContent}>
        <div className={styles.DashboardProjectActions}>
          <h3>Work on this week</h3>
          <ul>
            <li className={styles.TurnHighlightColor}>
              rgb(227, 71, 10) HighlightColor
            </li>
            <li className={styles.TurnBlack}>rgb(0,0,0) Black</li>

            <li className={styles.TurnWhite}>rgb(255, 255, 255) White</li>
            <li className={styles.TurnGrey1}>rgb(10,10,10) Grey1</li>
            <li className={styles.TurnGrey2}>rgb(20,20,20) Grey2</li>
            <li className={styles.TurnGrey3}>rgb(30,30,30) Grey3</li>
            <li className={styles.TurnHighlightColor}>
              rgb(227, 71, 10) HighlightColor
            </li>
            <li className={styles.TurnGrey4}>rgb(40,40,40) Grey4</li>
            <li className={styles.TurnGrey5}>rgb(50,50,50) Grey5</li>
            <li className={styles.TurnGrey6}>rgb(60,60,60) Grey6</li>
            <li className={styles.TurnGrey7}>rgb(70,70,70) Grey7</li>
            <li className={styles.TurnGrey8}>rgb(80,80,80) Grey8</li>
            <li className={styles.TurnGrey9}>rgb(90,90,90) Grey9</li>
            <li className={styles.TurnGrey10}>rgb(100,100,100) Grey10</li>
            <li className={styles.TurnGrey11}>rgb(110,110,110) Grey11</li>
            <li className={styles.TurnGrey12}>rgb(120,120,120) Grey12</li>
            <li className={styles.TurnHighlightColor}>
              rgb(227, 71, 10) HighlightColor
            </li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>
              Praesent non mauris molestie, volutpat lacus et, ultricies est.
            </li>
            <li>Maecenas placerat purus vitae eros dapibus tempus.</li>
          </ul>
        </div>
        <div>
          <h2>Today's routine</h2>
          <ul>
            <li>
              Quisque quis urna interdum, condimentum lorem sit amet, fringilla
              neque.
            </li>
            <li>Phasellus cursus magna a metus efficitur condimentum.</li>
            <li>Donec ac purus lacinia, scelerisque purus sed, mattis leo.</li>
            <li>
              Phasellus eu nisi elementum elit sodales dictum nec ac eros.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
