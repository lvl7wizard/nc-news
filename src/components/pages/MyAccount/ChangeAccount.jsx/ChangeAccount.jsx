import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/User";
import { fetchUsers } from "../../../../utils/apiRequest";
import UserCard from "../../../pages/MyAccount/UserCard";
import styled from "styled-components";
import Loading from "../../../loading/Loading";

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
  color: white;
`;


const ChangeAccount = () => {
  const { currentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <Loading />
    );
  } else {
    return (
      <>
        <MyAccountTextContainer>
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

export default ChangeAccount;