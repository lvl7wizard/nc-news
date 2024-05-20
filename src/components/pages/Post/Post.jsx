import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import PostArticleForm from "./PostArticleForm/PostArticleForm"
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const LoginPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 60px);
  min-height: 150px;
  align-items: center;
  text-align: center;
`;

const PostArticleFormContainer = styled.div`
display: flex;
align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: calc(100vh - 100px); // 60 px navbar 40 px margins
`;

const Post = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <main>
      {currentUser === null ? (
        <LoginPromptContainer>
          <h2>You must be logged in to post articles</h2>
          <Button href="/">Log in</Button>
        </LoginPromptContainer>
      ) : (
        <PostArticleFormContainer aria-labelledby="post-article">
          <PostArticleForm />
        </PostArticleFormContainer>
      )}
    </main>
  );
};

export default Post;
