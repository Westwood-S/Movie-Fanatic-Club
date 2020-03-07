import { NavLink } from "react-router-dom";
import React from "react";
import "../App.css";
import {
  Navbar,
  Nav,
  NavItem
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
                <NavItem >
                  <NavLink className="nav-links" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-links" to="./Aboutus.js">About us</NavLink>
                </NavItem>
              </Nav>
              <p style={{ margin: 0 }}>
                © {new Date().getFullYear()}{" "}
                Mo &amp; Li‘s.
              </p>
            </div>
          </Navbar>
        </footer>
      </div>
    );
  }
}

export default Footer;
