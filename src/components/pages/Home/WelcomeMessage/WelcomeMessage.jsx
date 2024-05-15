import { ReactTyped } from "react-typed";
import styles from "./WelcomeMessage.module.css";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/User";


const WelcomeMessage = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className={styles.content}>
      <h2>
        Welcome back,{" "}
        <span className={styles.username}>{currentUser.username}</span>
      </h2>
      <div className={styles.text}>
        <ReactTyped
          strings={[
            "Hit up the menu to start reading, commenting, and posting!",
          ]}
          typeSpeed={50}
          loop={false}
        />
      </div>
    </div>
  );
};

export default WelcomeMessage;