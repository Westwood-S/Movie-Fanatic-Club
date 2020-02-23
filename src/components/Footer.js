import { NavLink } from "react-router-dom";
import React from "react";
import "../App.css";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import "../index.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <footer className="footer">
          <Navbar color="light" light expand="md">
            <div className="container">
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="views/Aboutus.js">About us</NavLink>
                </NavItem>
              </Nav>
              <p style={{ margin: 0 }}>
                © {new Date().getFullYear()}{" "}
                <a href="https://github.com/Westwood-S/Movie-Fanatic-Club">
                  Mo &amp; Li‘s
                </a>
                .
              </p>
            </div>
          </Navbar>
        </footer>
      </div>
    );
  }
}

export default Footer;
