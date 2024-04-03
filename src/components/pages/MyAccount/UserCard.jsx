import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import styled from "styled-components";

const Card = styled.button`
  padding: 10px;
  margin: 10px;
  text-align: center;
  border: solid black;
  border-radius: 25px;
  box-shadow: 4px 4px 2px 1px rgba(0, 0, 0, 0.226);
  background-color: rgb(0, 0, 0, 0.65);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    border: solid black;
    border-radius: 15px;
    width: 100px;
    min-height: 100px;
    max-height: 100px;
    height: auto;
    background: white;
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
      <img src={user.avatar_url} alt={user.username} />
      <p>{user.username}</p>
    </Card>
  );
};

export default UserCard;
