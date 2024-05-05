import styles from "./Home.module.css";
import { UserContext } from "../../../contexts/User";
import { useContext } from "react";
import { useState } from "react";
import spaceship1 from "../../../assets/Home/spaceship1.png";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.container}>
      {isLoading ? (
        ""
      ) : (
        <div className={styles.content}>
          <h2>Welcome back, {currentUser.username}!</h2>
          <div className={styles.text}>
            <p>
              Hit up the menu to start reading, commenting, and
              posting.
            </p>
          </div>
          <div className={styles.spaceShipContainer}>
          <img className={styles.spaceShip} src={spaceship1}></img>
          </div>
        </div>
      )}
      {/* <Carousel isLoading={isLoading} setIsLoading={setIsLoading} /> */}
    </div>
  );
};

export default Home;
