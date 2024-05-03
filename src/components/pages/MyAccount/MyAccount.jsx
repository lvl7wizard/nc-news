import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/User";
import { deleteArticleById, fetchUsers, getArticles } from "../../../utils/apiRequest";
import UserCard from "../../pages/MyAccount/UserCard";
import styled from "styled-components";
import Loading from "../../loading/Loading";
import AbsoluteCenterContent from "../../layout/CenterContent/AbsoluteCenterContent";
import ArticleCardMini from "../Search/ArticleCardMini";
import Button from "../../buttons/Button";

const UserCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const MyAccountTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: black;
`;

const MyArticles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyAccount = () => {
  const { currentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersArticles, setUsersArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then((response) => {
        setUsers(response);
      })
      .then(() => {
        getArticles().then((response) => {
          const articles = response.filter(
            (article) => article.author === currentUser.username
          );
          setUsersArticles(articles);
          setIsLoading(false);
        });
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
        <Loading />
      </AbsoluteCenterContent>
    );
  } else {
    return (
      <>
        <MyAccountTextContainer>
          <h2>My Account</h2>
          <p>
            You are currently logged in as{" "}
            <strong>{currentUser.username}</strong>.{" "}
          </p>
          <p>Click below to change account</p>
        </MyAccountTextContainer>
        <UserCardContainer>
          {users.map((user) => {
            return <UserCard key={user.username} user={user} />;
          })}
        </UserCardContainer>
        <MyAccountTextContainer>
          <h2>Manage My Articles</h2>
        </MyAccountTextContainer>
        <MyArticles>
          {usersArticles.map((article) => {
            return (
              <CardContainer key={article.article_id}>
                <ArticleCardMini article={article} />
                <Button
                  onClick={() => deleteOnClickHandler(article.article_id)}
                >
                  Delete article ↑
                </Button>
              </CardContainer>
            );
          })}
        </MyArticles>
      </>
    );
  }
};

export default MyAccount;
