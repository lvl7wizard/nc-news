import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import styled from "styled-components";

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgb(0, 0, 0, 0);
  color: white;
  border: 0;
  border-radius: 15px;
  // box-shadow: 3px 3px 1px 1px rgba(0, 0, 0, 0.1);
  padding-top: 10px;
  padding-bottom: 20px;
  gap: 13px;

  img {
    border: solid black;
    border-radius: 15px;
    width: 100px;
    height: 100px;
    background: white;
  }

  p {
    margin: 0px;
  }
`;

const UserCard = ({ user }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const userOnClickHandler = () => {
    setCurrentUser(user);
  };

  return (
    <Card
      onClick={userOnClickHandler}
      style={{
        backgroundColor:
          user.username === currentUser.username
            ? "rgba(255, 255, 255, 0.6)"
            : null,
        color: user.username === currentUser.username ? "black" : null,
      }}
    >
      <p>{user.username}</p>
      <img src={user.avatar_url} alt={user.username} />
    </Card>
  );
};

export default UserCard;
