import { useContext } from "react";
import { UserContext } from "../../../../contexts/User";
import styled from "styled-components";
import { ReactTyped } from "react-typed";

const WelcomeMessageContainer = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: column;
gap: 5vh;
margin-left: 10vw;
margin-right: 10vw;
text-align: center;
`

const MainText = styled.h2`
font-size: 80px;
@media (max-width: 640px) {
      font-size: 50px;
}
`

const UserNameText = styled.span`
background-color: #f3ec78;
background-image: linear-gradient(180deg, #f3ef96 30%, #ffbb1d);
background-size: 100%;
-webkit-background-clip: text;
-moz-background-clip: text;
-webkit-text-fill-color: transparent;
-moz-text-fill-color: transparent;
background-clip: text;
text-shadow: 0 0 40px rgba(255, 228, 96, 0.2);
`

const WelcomeMessage = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <WelcomeMessageContainer>
      <MainText>
        Welcome back,{" "}
        <UserNameText>{currentUser.username}</UserNameText>
      </MainText>
        <ReactTyped
          strings={[
            "Hit up the menu to start reading, commenting, and posting!",
          ]}
          typeSpeed={50}
          loop={false}
          aria-label="Instructions: Hit up the menu to start reading, commenting, and posting!"
        />
    </WelcomeMessageContainer>
  );
};

export default WelcomeMessage;
