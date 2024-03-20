import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/User";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: black;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  top: 0px;
`;

const NavButton = styled.button`
  color: white;
  background-color: black;
  border-radius: 25px;
  border: none;
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    outline: solid white;
    border-radius: 25px;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <>
      <Nav>
        <NavButton
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
          <StyledLink to="/">Home</StyledLink>
        </NavButton>
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
          <StyledLink to="/articles/topics/all?sort_by=created_at&order=desc">
            Search
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
          <StyledLink to="/myaccount">My Account</StyledLink>
        </NavButton>
      </Nav>
      {console.log(currentUser)}
    </>
  );
};

export default NavBar;
