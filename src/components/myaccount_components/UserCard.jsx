import { useContext} from 'react';
import { UserContext } from '../../contexts/User';

const UserCard = ({user}) => {
    const { setCurrentUser } = useContext(UserContext)
    const userOnClickHandler = () => {
        setCurrentUser(user)
    }

    return (
    <div className="user-card">
        <button className="user-button" onClick={userOnClickHandler}>
        <img src={user.avatar_url}/>
        <div>
        <p>{user.username}</p>
        </div>
        </button>
    </div>)
}

export default UserCard; 