import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById } from "../../../utils/apiRequest";
import ArticleCardFull from "./ArticleCardFull/ArticleCardFull";
import Loading from "../../loading/Loading";
import styled from "styled-components";
import CommentSection from "./CommentSection/CommentSection";

const LoadingContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  align-items: center;
  justify-content: center;
`;

const ArticleContainer = styled.div`
  margin: 5vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentsContainer = styled.div`
  margin: 5vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ViewArticle = () => {
  const [article, setArticle] = useState(null);
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const articleData = await fetchArticleById(article_id);
        setArticle(articleData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [article_id]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <p>Error: {error}</p>
      </LoadingContainer>
    );
  }

  if (!article) {
    return (
      <LoadingContainer>
        <p>No article found.</p>
      </LoadingContainer>
    );
  }

  return (
    <>
      <ArticleContainer>
        <ArticleCardFull article={article} />
      </ArticleContainer>
      <CommentsContainer>
        <CommentSection article_id={article.article_id} />
      </CommentsContainer>
    </>
  );
};

export default ViewArticle;