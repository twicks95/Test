import React from "react";
import SplashIcon from "../../assets/icons/splash-icon.svg";
import styles from "./SplashScreen.module.css";

const Splashscreen = (props) => {
  console.log(props.display);
  return (
    <div
      className={`${styles.splashBackground}`}
      style={{ display: props.display }}
    >
      <img src={SplashIcon} alt="splash icon" className={styles.spinnerIcon} />
    </div>
  );
};

export default Splashscreen;
