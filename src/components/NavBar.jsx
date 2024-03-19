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

  ${(props) => {
    if (props.active === true) {
      return `
        background-color: white;
        color: black;
        border-radius: 25px;
      `;
    }
  }}
`;

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <>
      <Nav>
        <NavButton
          onClick={() => {
            window.location.href = "/";
          }}
          active={location.pathname === "/"}
        >
          Home
        </NavButton>
        <NavButton
          onClick={() => {
            window.location.href =
              "/articles/topics/all?sort_by=created_at&order=desc";
          }}
          active={location.pathname.startsWith("/articles")}
        >
          Search
        </NavButton>
        <NavButton
          onClick={() => {
            window.location.href = "/myaccount";
          }}
          active={location.pathname === "/myaccount"}
        >
          My Account
        </NavButton>
      </Nav>
    </>
  );
};

export default NavBar;
