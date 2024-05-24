import { useState, useContext, useEffect } from "react";
import Loading from "../../loading/Loading";
import Login from "./Login/Login";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";
import { fetchUsers } from "../../../utils/apiRequest";
import { UserContext } from "../../../contexts/User";
import styled from "styled-components";

const HomeContainer = styled.div`
display: flex;
flex-direction: column;
height: calc(100vh - 60px);
align-items: center;
justify-content: center;
`

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    // API call added on render just to wake up the server as it can take up to a minute
    fetchUsers();
  }, []);

  return (
    <HomeContainer>
      {currentUser === null ? (
        isLoading ? <Loading/> : <Login setIsLoading={setIsLoading}/>
      ) : (
        <WelcomeMessage/>
      )}
    </HomeContainer>
  );
};

export default Home;
