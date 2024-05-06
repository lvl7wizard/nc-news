import styled from "styled-components";
import { UserContext } from "../../../contexts/User";
import { getArticles } from "../../../utils/apiRequest";
import { useContext, useState, useEffect } from "react";
import ArticleCardMini from "../Search/ArticleCardMini";
import Button from "../../buttons/Button";
import Loading from "../../loading/Loading";
import { deleteArticleById } from "../../../utils/apiRequest";
import AbsoluteCenterContent from "../../layout/CenterContent/AbsoluteCenterContent";

const MyArticlesTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;
`;
const MyArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  // gap: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyArticles = () => {
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
    <AbsoluteCenterContent>
        <Loading/>
    </AbsoluteCenterContent>
    )
  } else {
      return (
        <>
        <MyArticlesTextContainer>
          <h2>My Articles</h2>
          <p>
            You are currently logged in as{" "}
            <strong>{currentUser.username}</strong>.{" "}
          </p>
          <p>Click below to view or delete your articles</p>
        </MyArticlesTextContainer>
        <MyArticlesContainer>
          {usersArticles.map((article) => {
            return (
              <CardContainer key={article.article_id}>
                <ArticleCardMini article={article} />
                <Button onClick={() => deleteOnClickHandler(article.article_id)} style={{background: "#B22222"}}>
                  Delete article ↑
                </Button>
              </CardContainer>
            );
          })}
        </MyArticlesContainer>
        </>
      );
  }
};

export default MyArticles;
