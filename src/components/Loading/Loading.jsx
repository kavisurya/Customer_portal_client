import React from 'react';
import styles from './Loading.module.css'; // Import the CSS file for styling

function LoadingAnimation() {
  return (
    <div className={styles.loadingcontainer}>
      <div className={`${styles.dot} ${styles.dot1}`}></div>
      <div className={`${styles.dot} ${styles.dot2}`}></div>
      <div className={`${styles.dot} ${styles.dot3}`}></div>
    </div>
  );
}

export default LoadingAnimation;
