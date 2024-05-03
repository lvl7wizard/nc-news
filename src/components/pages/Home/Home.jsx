import Carousel from "../../pages/Home/Carousel/Carousel";
import styles from "./Home.module.css";
import { UserContext } from "../../../contexts/User";
import { useContext } from "react";
import { useState } from "react";
import rocket from "../../../assets/Home/rocket.png";
import rocket2 from "../../../assets/Home/rocket2.png";
import astronaut from "../../../assets/Home/astronaut.png";
import astronaut2 from "../../../assets/Home/astronaut2.png";
import astronaut3 from "../../../assets/Home/astronaut3.jpg";
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
          <img className={styles.rocket} src={spaceship1}></img>
        </div>
      )}
      {/* <Carousel isLoading={isLoading} setIsLoading={setIsLoading} /> */}
    </div>
  );
};

export default Home;
