import { UserContext } from "../../../contexts/User";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import MyArticleCards from "./MyArticlesCards/MyArticlesCards";
import styled from "styled-components";

const MyArticlesContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
min-height: calc(100vh - 60px);
margin-left: 5vw;
margin-right: 5vw;
`

const MyArticles = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <MyArticlesContainer>
      {currentUser === null ? (
        <>
          <h2>You must be logged in to view your articles</h2>
          <Button href="/">Log in</Button>
        </>
      ) : (
        <>
        <p>
          Click the buttons below to <strong>view</strong>,{" "}
          <strong>edit</strong>, or{" "}
          <strong>delete</strong> your articles
        </p>        
        <MyArticleCards />
        </>
      )}
    </MyArticlesContainer>
  );
};

export default MyArticles;
