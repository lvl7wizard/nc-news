import styles from "./Home.module.css";
import { useState } from "react";
import Loading from "../../loading/Loading";
import Login from "./Login/Login";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";
import { fetchUsers } from "../../../utils/apiRequest";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  {
    // API call added here to reduce load times for this demo as the current free server is slow to wake up
    fetchUsers()
  }

  return (
    <div className={styles.container}>
      {!loggedIn ? <Login setLoggedIn={setLoggedIn} setIsLoading={setIsLoading}/> : (isLoading ? <Loading/> : <WelcomeMessage/>)}
    </div>
  );
};

export default Home;
