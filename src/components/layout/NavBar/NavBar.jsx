import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import planetIcon from "../../../assets/NavBar/planet-earth.png";

const StyledNavbar = styled(Navbar)`
  min-height: 60px;
  padding: 10px;
`;

const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-menu {
    background-color: #343a40;
  }

  .dropdown-header {
    color: lightgrey;
  }

  .dropdown-item {
    color: #fff;
  }

  .dropdown-item:hover,
  .dropdown-item:focus {
    background-color: #495057;
  }
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`;

const NCNewsText = styled.span`
  font-size: 20px; /* Adjust font size as needed */
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px black;
`;

const NavBar = () => {
  return (
    <StyledNavbar
      bg="dark"
      variant="dark"
      fixed="top"
      expand="sm"
      collapseOnSelect
    >
      <StyledNavbarBrand>
        <LogoImage src={planetIcon} />
        <NCNewsText>NC News</NCNewsText>
      </StyledNavbarBrand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
        <Nav.Link eventKey="0" as={NavLink} to="">
            Home
          </Nav.Link>
          <StyledNavDropdown title="Search">
            <NavDropdown.Header>Topic</NavDropdown.Header>
            <NavDropdown.Divider />
            <NavDropdown.Item
              eventKey="1"
              as={NavLink}
              to="/articles/topics/all?sort_by=created_at&order=desc"
            >
              All
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey="2"
              as={NavLink}
              to="/articles/topics/coding?sort_by=created_at&order=desc"
            >
              Coding
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey="3"
              as={NavLink}
              to="/articles/topics/football?sort_by=created_at&order=desc"
            >
              Football
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey="4"
              as={NavLink}
              to="/articles/topics/cooking?sort_by=created_at&order=desc"
            >
              Cooking
            </NavDropdown.Item>
          </StyledNavDropdown>
          <Nav.Link eventKey="5" as={NavLink} to="/post">
            Post
          </Nav.Link>
          <Nav.Link eventKey="6" as={NavLink} to="/myarticles">
            My Articles
          </Nav.Link>
          <Nav.Link eventKey="7" as={NavLink} to="/myaccount">
            My Account
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

export default NavBar;
