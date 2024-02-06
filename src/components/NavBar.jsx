import { Link } from "react-router-dom";

const NavBar = () => {
    return (<nav>
        <div className="nav-item">
        <Link id="home-link" to="/">🏠 Home</Link>
        </div>
        <div className="nav-item">
        <Link id="search-link" to="/articles">🔍 Search</Link>
        </div>
    </nav>)
}

export default NavBar;