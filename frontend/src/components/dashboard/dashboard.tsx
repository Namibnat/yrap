import { ReactNode } from "react";
import styles from "./dashboard.module.css";

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
            <li className={styles.HighlightColor}>rgb(227, 71, 10)</li>
            <li className={styles.Grey0}>rgb(0,0,0)</li>
            <li className={styles.Grey1}>rgb(10,10,10)</li>
            <li className={styles.Grey2}>rgb(20,20,20)</li>
            <li className={styles.Grey3}>rgb(30,30,30)</li>
            <li className={styles.HighlightColor}>rgb(227, 71, 10)</li>
            <li className={styles.Grey4}>rgb(40,40,40)</li>
            <li className={styles.Grey5}>rgb(50,50,50)</li>
            <li className={styles.Grey6}>rgb(60,60,60)</li>
            <li className={styles.Grey7}>rgb(70,70,70)</li>
            <li className={styles.Grey8}>rgb(80,80,80)</li>
            <li className={styles.Grey9}>rgb(90,90,90)</li>
            <li className={styles.Grey10}>rgb(100,100,100)</li>
            <li className={styles.Grey11}>rgb(110,110,110)</li>
            <li className={styles.Grey12}>rgb(120,120,120)</li>
            <li className={styles.Grey13}>rgb(130,130,130)</li>
            <li className={styles.HighlightColor}>rgb(227, 71, 10)</li>
            <li className={styles.Grey14}>rgb(140,140,140)</li>
            <li className={styles.Grey15}>rgb(150,150,150)</li>
            <li className={styles.Grey16}>rgb(160,160,160)</li>
            <li className={styles.Grey17}>rgb(170,170,170)</li>
            <li className={styles.Grey18}>rgb(180,180,180)</li>
            <li className={styles.Grey19}>rgb(190,190,190)</li>
            <li className={styles.Grey20}>rgb(200,200,200)</li>
            <li className={styles.Grey21}>rgb(210,210,210)</li>
            <li className={styles.Grey22}>rgb(220,220,220)</li>
            <li className={styles.Grey23}>rgb(230,230,230)</li>
            <li className={styles.HighlightColor}>rgb(227, 71, 10)</li>
            <li className={styles.Grey24}>rgb(240,240,240)</li>
            <li className={styles.Grey25}>rgb(250,250,250)</li>
            <li className={styles.HighlightColor}>rgb(227, 71, 10)</li>
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
