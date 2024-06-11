import { useState, useContext } from "react";
import Loading from "../../loading/Loading";
import Login from "./Login/Login";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";
import { UserContext } from "../../../contexts/User";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  return (
    <HomeContainer>
      {currentUser === null ? (
        isLoading ? (
          <Loading />
        ) : (
          <Login setIsLoading={setIsLoading} />
        )
      ) : (
        <WelcomeMessage />
      )}
    </HomeContainer>
  );
};

export default Home;
