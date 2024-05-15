import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/User";
import { fetchUsers } from "../../../../utils/apiRequest";
import UserCard from "../../../pages/MyAccount/UserCard";
import styled from "styled-components";
import Loading from "../../../loading/Loading";
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";

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
  const { setCurrentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then((response) => {
        setUsers(response);
        setIsLoading(false);
      })
  }, []);

  const logOut = () => {
    setCurrentUser(null)
    navigate(`/`);
  }

  if (isLoading) {
    return (
        <Loading />
    );
  } else {
    return (
      <>
        <MyAccountTextContainer>
          <p>Click below to change account</p>
        </MyAccountTextContainer>
        <UserCardContainer>
          {users.map((user) => {
            return <UserCard key={user.username} user={user} />;
          })}
        </UserCardContainer>
        <Button onClick={logOut}>Log out</Button>
      </>
    );
  }
};

export default ChangeAccount;