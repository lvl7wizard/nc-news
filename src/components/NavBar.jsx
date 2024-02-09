import { Link } from "react-router-dom";
import { useContext} from 'react';
import { UserContext } from "../contexts/User";

const NavBar = () => {
    const { currentUser } = useContext(UserContext)
    return (
    <>
    <nav>
        <div>
        <Link id="home-link" className="nav-item" to="/">Home</Link>
        </div>
        <div>
        <Link id="search-link" className="nav-item" to="/articles/topics/all?sort_by=created_at&order=desc">Search</Link>
        </div>
        <div>
        <Link id="account-link" className="nav-item" to="/myaccount">My Account</Link>
        </div>
        <div className="nav-avatar">
        </div>
    </nav>
    </>)
}

export default NavBar;
