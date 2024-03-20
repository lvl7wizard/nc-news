import { useContext } from "react";
import { useLocation } from "react-router-dom";
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
  background-color: transparent;
  border: none;
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    outline: solid white;
    border-radius: 25px;
  }
`;


const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <>
      <Nav>
        <NavButton
          onClick={() => {
            window.location.href = "/";
          }}
          style={location.pathname === "/" ? { backgroundColor: "white", color: "black", borderRadius: "25px" } : null}
        >
          Home
        </NavButton>
        <NavButton
          onClick={() => {
            window.location.href =
              "/articles/topics/all?sort_by=created_at&order=desc";
          }}
          style={location.pathname.startsWith("/articles") ? { backgroundColor: "white", color: "black", borderRadius: "25px" } : null}
        >
          Search
        </NavButton>
        <NavButton
          onClick={() => {
            window.location.href = "/myaccount";
          }}
          style={location.pathname === "/myaccount" ? { backgroundColor: "white", color: "black", borderRadius: "25px" } : null}
        >
          My Account
        </NavButton>
      </Nav>
      {console.log(currentUser)}
    </>
  );
};

export default NavBar;
