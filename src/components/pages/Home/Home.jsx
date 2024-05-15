import styles from "./Home.module.css";
import { useState } from "react";
import Loading from "../../loading/Loading";
import Login from "./Login/Login";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";
import { fetchUsers } from "../../../utils/apiRequest";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  {
    // API call added here to reduce load times for this demo as the current free server is slow to wake up
    fetchUsers()
  }

  return (
    <div className={styles.container}>
      {currentUser === null ? <Login setIsLoading={setIsLoading}/> : (isLoading ? <Loading/> : <WelcomeMessage/>)}
    </div>
  );
};

export default Home;
