import { Link } from "react-router-dom";
import { useContext} from 'react';
import { UserContext } from "../contexts/User";

const NavBar = () => {
    const { currentUser } = useContext(UserContext)
    return (<nav>
        <div className="nav-item">
        <Link id="home-link" to="/">🏠 Home</Link>
        </div>
        <div className="nav-item">
        <Link id="search-link" to="/articles/topics/all">🔍 Search</Link>
        </div>
        <div className="nav-item">
        <Link id="account-link" to="/myaccount">⚙️ My Account</Link>
        </div>
        <div className="nav-avatar">
            <div>
        <img src={currentUser.avatar_url}/>
        <>logged in as: {currentUser.username}</>
            </div>
        </div>
    </nav>)
}

export default NavBar;