/* eslint-disable max-len */
import React from 'react';
import styles from './AboutUs.module.scss';
import IMG_PATH from '@constants';

const AboutUs: React.FC = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.team}>
        <div className={styles.teamInfo}>
          <div className={styles.teamInfoTitle}>Our team</div>
          <div className={styles.teamInfoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus ultricies tristique nulla. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus. Placerat in egestas erat imperdiet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Faucibus a pellentesque sit amet porttitor eget. Est ultricies integer quis auctor elit sed vulputate mi. Diam maecenas sed enim ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus ultricies tristique nulla. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus. Placerat in egestas erat imperdiet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Faucibus a pellentesque sit amet porttitor eget. Est ultricies integer quis auctor elit sed vulputate mi. Diam maecenas sed enim ut.</div>
        </div>
        <img src={`${IMG_PATH}team.jpg`} className={styles.teamImage} alt="Team" />
      </div>
      <div className={styles.history}>
        <div className={styles.historyTitle}>History</div>
        <div className={styles.historySteps}>
          <div className={styles.historyStepsItem}>
            <div className={styles.historyStepsItemYear}>2001</div>
            <div className={styles.historyStepsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </div>
          <div className={styles.historyStepsItem}>
            <div className={styles.historyStepsItemYear}>2005</div>
            <div className={styles.historyStepsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </div>
          <div className={styles.historyStepsItem}>
            <div className={styles.historyStepsItemYear}>2021</div>
            <div className={styles.historyStepsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
