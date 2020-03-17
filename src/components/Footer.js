import { NavLink } from "react-router-dom";
import React from "react";
import "../index.css";
import {
  Navbar,
  Nav,
  NavItem
} from "reactstrap";
import "../index.css";
import { GiFilmSpool } from "react-icons/gi";

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
                  <NavLink title="I stan Hitchcock!" className="nav-links" to="/">Home</NavLink>
                </NavItem>
              </Nav>
              <p style={{ margin: 0 }} title="Frankly, my dear, I don't give a damn.">
                © {new Date().getFullYear()}{" "}
                <GiFilmSpool /> Movie Fanatic Club
              </p>
            </div>
          </Navbar>
        </footer>
      </div>
    );
  }
}

export default Footer;
