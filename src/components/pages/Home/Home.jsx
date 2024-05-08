import styles from "./Home.module.css";
import { UserContext } from "../../../contexts/User";
import { useContext } from "react";
import { useState } from "react";
import { ReactTyped } from "react-typed";
import InitialConnect from "../../loading/InitialConnect";
import { fetchUsers } from "../../../utils/apiRequest";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  {
    // add logic here to check browser history if a previous user has been logged in.
    // if they have set the userContext to that user.
    // if not a default user can be used
    // some kind of connection should be made to server here to wake it up as it can be slow if inactive for awhile.
    // add a nice greeting message while the server connects
    fetchUsers().then(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <InitialConnect />
      ) : (
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
      )}
    </div>
  );
};

export default Home;
