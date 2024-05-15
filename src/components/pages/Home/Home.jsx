import { useState, useContext, useEffect } from "react";
import styles from "./Home.module.css";
import Loading from "../../loading/Loading";
import Login from "./Login/Login";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";
import { fetchUsers } from "../../../utils/apiRequest";
import { UserContext } from "../../../contexts/User";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    // API call added on render just to wake up the server
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      {currentUser === null ? (
        isLoading ? <Loading/> : <Login setIsLoading={setIsLoading}/>
      ) : (
        <WelcomeMessage/>
      )}
    </div>
  );
};

export default Home;
