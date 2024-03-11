import { useContext} from 'react';
import { UserContext } from '../../contexts/User';
import styled from 'styled-components';
const Card = styled.button`
padding: 10px;
margin: 10px;
text-align: center;
text-align: center;
border: solid black;
border-radius: 25px;
box-shadow: 4px 4px 2px 1px rgba(0, 0, 0, 0.226);
background-color: rgb(255, 255, 255, 0.65);

img {
    width: 100px;
    max-height: 100px;
    border-radius: 10px;
  }
`

const UserCard = ({user}) => {
    const { setCurrentUser } = useContext(UserContext)
    const userOnClickHandler = () => {
        setCurrentUser(user)
    }

    return (
    <Card onClick={userOnClickHandler}>
        <img src={user.avatar_url}/>
        <p>{user.username}</p>
    </Card>)
}

export default UserCard; 