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
        setIsLoading(false);
      })
  }, []);

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
      </>
    );
  }
};

export default MyAccount;
