import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../../contexts/User";
// import Button from "../../buttons/Button";
import styled from "styled-components";
import closeIcon from "../../../assets/NavBar/menu_close_icon.png";
import menuIcon from "../../../assets/NavBar/menu_icon.png";
import planetIcon from "../../../assets/NavBar/planet-earth.png";

const Nav = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px;
  background-color:  black;
  box-shadow: 0px 0px 15px black inset;
  z-index: 1;
`;

const Title = styled.h1`
  text-decoration: none;
  font-size: 35px;
  margin: 0px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin-right: 5px;
  }
  text-shadow: 2px 2px black;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  z-index: -1;

  @media (max-width: 640px) {
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
      border-radius: 0px 0px 0px 10px;

      animation-name: slidein;
      animation-duration: 1s;
      animation-fill-mode: forwards;

      @keyframes slidein {
        from {
          opacity: 0.5;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
`;

const HamburgerMenuIcons = styled.div`
  display: none;
  margin-right: 10px;

  img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 640px) {
    display: flex;
  }
`;

const NavButton = styled.button`
background-color: rgba(255, 255, 255, 0);
  color: white;
  border-radius: 25px;
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: opacity 0.2s ease;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  
  &:hover {
    outline: solid white;
    border-radius: 25px;
  }
`;

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <>
      <Nav>
        <StyledLink to="/" onClick={menuOpen ? toggleMenu : ""}>
          <Title>
            {" "}
            <img src={planetIcon} />
            NC NEWS
          </Title>
        </StyledLink>
        <ButtonContainer className={menuOpen ? "menuOpen" : ""}>
          <NavButton
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
            <StyledLink
              to="/articles/topics/all?sort_by=created_at&order=desc"
              onClick={menuOpen ? toggleMenu : ""}
            >
              Search
            </StyledLink>
          </NavButton>
          <NavButton
            style={
              location.pathname === "/post"
                ? {
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px",
                    borderRadius: "25px",
                  }
                : null
            }
          >
            <StyledLink to="/post" onClick={menuOpen ? toggleMenu : ""}>
              Post
            </StyledLink>
          </NavButton>
          <NavButton
            style={
              location.pathname === "/myarticles"
                ? {
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px",
                    borderRadius: "25px",
                  }
                : null
            }
          >
            <StyledLink to="/myarticles" onClick={menuOpen ? toggleMenu : ""}>
              My Articles
            </StyledLink>
          </NavButton>
          <NavButton
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
            <StyledLink to="/myaccount" onClick={menuOpen ? toggleMenu : ""}>
              My Account
            </StyledLink>
          </NavButton>
        </ButtonContainer>
        <HamburgerMenuIcons>
          <img
            src={menuOpen ? closeIcon : menuIcon}
            alt="menu button"
            onClick={toggleMenu}
          />
        </HamburgerMenuIcons>
      </Nav>
    </>
  );
};

export default NavBar;
