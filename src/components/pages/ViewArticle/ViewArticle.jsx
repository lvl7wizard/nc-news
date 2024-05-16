import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById } from "../../../utils/apiRequest.js";
import ArticleCardFull from "./ArticleCardFull/ArticleCardFull.jsx";
import Loading from "../../loading/Loading.jsx";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User.jsx";
import styled from "styled-components";
import CommentSection from "./CommentSection/CommentSection.jsx";

const LoadingContainer = styled.div`
display: flex;
height: calc(100vh - 60px);
align-items: center;
justify-content: center
`;

const ViewArticleContainer = styled.div`
margin-top: 5vh;
margin-bottom: 5vh;
margin-left: 5vw;
margin-right: 5vw;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`;

const ViewArticle = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then((article) => {
        setArticle(article);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [article_id]);

    if (isLoading) {
      return (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      );
    } else {
      return (
        <ViewArticleContainer>
          <ArticleCardFull article={article} />
          <CommentSection article_id={article.article_id} />
        </ViewArticleContainer>
      );
    }
};

export default ViewArticle;
