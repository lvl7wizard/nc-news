import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../../contexts/User";
import Button from "../../buttons/Button";
import styled from "styled-components";
import closeIcon from "../../../assets/NavBar/closeIcon.png";
import menuIcon from "../../../assets/NavBar/menuIcon.png"


const Nav = styled.nav`
display: flex;
position: fixed;
top: 0px;
width: calc(100vw - 40px);
height: 35px;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 10px 20px 10px;
background-color: black;
`;

const Title = styled.h1`
text-decoration: none;
`

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const ButtonContainer = styled.div`
display: flex;

@media (max-width: 480px) {
display: none;

&&.menuOpen {
  position: fixed;
  right: 0px;
  display: flex;
  flex-direction: column;
  top: 55px;
  background: rgba(0, 0, 0, 1);
  padding: 20px;
  gap: 20px;
}
}

`;

const HamburgerMenuContainer = styled.div`
display: none;

@media (max-width: 480px) {
  display: flex;
}
`

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  }

  return (
    <>
      <Nav>
        <StyledLink to="/" onClick={menuOpen ? toggleMenu : ""}>
        <Title>NC News</Title>
        </StyledLink>
        <ButtonContainer className={menuOpen ? "menuOpen" : ""}>
        <Button
          style={
            location.pathname === "/"
              ? {
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "25px",
                }
              : null
          }
        >
          <StyledLink to="/" onClick={menuOpen ? toggleMenu : ""}>Home</StyledLink>
        </Button>
        <Button
          style={
            location.pathname.startsWith("/articles")
              ? {
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "25px",
                }
              : null
          }
        >
          <StyledLink to="/articles/topics/all?sort_by=created_at&order=desc" onClick={menuOpen ? toggleMenu : ""}>
            Search
          </StyledLink>
        </Button>
        <Button
          style={
            location.pathname === "/myaccount"
              ? {
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "25px",
                }
              : null
          }
        >
          <StyledLink to="/myaccount" onClick={menuOpen ? toggleMenu : ""}>My Account</StyledLink>
        </Button>
        </ButtonContainer>
        <HamburgerMenuContainer>
          <img src={menuOpen ? closeIcon : menuIcon} alt="menu button" onClick={toggleMenu}/>
        </HamburgerMenuContainer>
      </Nav>
    </>
  );
};

export default NavBar;