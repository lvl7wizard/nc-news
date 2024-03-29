import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { fetchUsers } from "../utils/apiRequest";
import UserCard from "./myaccount_components/UserCard";
import styled from "styled-components";
import Loading from "./Loading";
import CenterContent from "./CenterContent";

const UserCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const MyAccountTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const MyAccount = () => {
  const { currentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then((response) => {
        setUsers(response);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
    <CenterContent>
    <Loading/>
    </CenterContent>
    )
  } else {
    return (
      <>
        <MyAccountTextContainer>
          <p>You are currently logged in as{" "}<strong>{currentUser.username}</strong>.{" "}</p>
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
