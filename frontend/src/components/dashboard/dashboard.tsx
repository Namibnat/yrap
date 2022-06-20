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
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>
              Praesent non mauris molestie, volutpat lacus et, ultricies est.
            </li>
            <li>Maecenas placerat purus vitae eros dapibus tempus.</li>
            <li>
              Maecenas eget magna ac purus elementum vulputate vel at nisi.
            </li>
            <li>Cras vulputate risus id turpis mollis fringilla.</li>
            <li>Aliquam a nibh in ante tincidunt finibus.</li>
            <li>Mauris quis mi eget ante feugiat congue faucibus non orci.</li>
            <li>Mauris ullamcorper elit at orci egestas congue.</li>
            <li>Donec nec tortor nec ante cursus laoreet.</li>
            <li>Fusce placerat purus a tortor tincidunt egestas.</li>
            <li>Aliquam ut enim eleifend, pulvinar arcu ac, aliquam tellus.</li>
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
