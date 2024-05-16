import styled from "styled-components";
import { UserContext } from "../../../contexts/User";
import { getArticles } from "../../../utils/apiRequest";
import { useContext, useState, useEffect } from "react";
import ArticleCardMini from "../Search/ArticleCardMini";
import Button from "react-bootstrap/Button";
import Loading from "../../loading/Loading";
import { deleteArticleById } from "../../../utils/apiRequest";

const LoadingContainer = styled.div`
display: flex;
height: calc(100vh - 60px);
align-items: center;
`

const MyArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const MyArticleCards = () => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [usersArticles, setUsersArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticles().then((response) => {
      const articles = response.filter(
        (article) => article.author === currentUser.username
      );
      setUsersArticles(articles);
      setIsLoading(false);
    });
  }, [currentUser]);

  const deleteOnClickHandler = (article_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your article?"
    );
    if (isConfirmed) {
      console.log(article_id);
      const updatedArticles = usersArticles.filter((item) => {
        return item.article_id !== article_id;
      });
      setUsersArticles(updatedArticles);
      deleteArticleById(article_id).catch((error) => {
        window.alert(`Delete request was unsuccessful.`)
      })
    }
  };

  if (isLoading) {
    return (
    <LoadingContainer>
        <Loading/>
    </LoadingContainer>
    )
  } else {
      return (
        <>
          <p>
            You are currently logged in as{" "}<span className="text-warning">
            <strong>{currentUser.username}</strong></span>.{" "}
          </p>
          <p>Click below to view or <span className="text-danger">delete</span> your articles</p>
        <MyArticlesContainer>
          {usersArticles.map((article) => {
            return (
              <div key={article.article_id}>
                <ArticleCardMini article={article}/>
                <Button onClick={() => deleteOnClickHandler(article.article_id)} variant="danger">
                  Delete article ↑
                </Button>
              </div>
            );
          })}
        </MyArticlesContainer>
        </>
      );
  }
};

export default MyArticleCards;