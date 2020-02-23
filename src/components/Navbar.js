import React, { useState } from "react";
import { FaRegNewspaper, FaUserSecret } from "react-icons/fa";
import { MdMovieFilter, MdLocationSearching } from "react-icons/md";
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
import InTheater from "./inTheater";
import "@brainhubeu/react-carousel/lib/style.css";
import { Redirect, NavLink, Link } from "react-router-dom";

//function NavBar()
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    // value: name of city user entered
    /* toEvents: default value is false. when user hits submit button on landing page, the onClick attribute
                 calls the handleSubmit function, which switches 'toEvents' to true, meaning 'the user wants to 
                 be routed to the Events page.' Then, when Landing returns, if toEvents is true, it redirects to
                 the events page instead of rendering the Landing page
    */
    this.state = {
      value: "",
      toLogin: false,
      isOpen: false,
      isHover1: false,
      isHover2: false,
      isHover3: false,
      isHover4: false
    };
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginRedirect = this.handleLoginRedirect.bind(this);
    this.toggle = this.toggle.bind(this);
    this.hoverme = this.hoverme.bind(this);
  }

  handleLoginRedirect(event) {
    // set state "toEvents" to true
    this.setState(() => ({
      toLogin: true
    }));
  }

  toggle() {
    this.setState(() => ({
      isOpen: !this.state.isOpen
    }));
  }

  hoverme(num) {
    if (num === 1) {
      this.setState(() => ({
        isHover1: !this.state.isHover1
      }));
    } else if (num === 2) {
      this.setState(() => ({
        isHover2: !this.state.isHover2
      }));
    } else if (num === 3) {
      this.setState(() => ({
        isHover3: !this.state.isHover3
      }));
    } else {
      this.setState(() => ({
        isHover4: !this.state.isHover4
      }));
    }
  }

  render() {
    // if (this.state.toLogin === true) {
    //   return <Redirect to="/Login" />;
    // }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <div className="container">
            <NavbarBrand href="/" className="nav-brand">
              Movie Fanatic Club
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    to="/"
                    title="watchlist"
                    className="nav-link"
                    onMouseEnter={() => {
                      this.hoverme(2);
                    }}
                    onMouseOut={() => {
                      this.hoverme(2);
                    }}
                  >
                    {this.state.isHover2 ? (
                      this.state.isOpen ? (
                        <MdMovieFilter className="nav-icon" />
                      ) : (
                        "explore"
                      )
                    ) : (
                      <MdMovieFilter className="nav-icon" />
                    )}
                    {this.state.isOpen ? "    explore" : ""}
                  </NavLink>
                </NavItem>
                {/*<NavItem>
                    <NavLink href="/" title="notification" className="nav-link" onMouseEnter={hoverme1} onMouseOut={hoverme1}>{isHover1?isOpen?<FaRegNewspaper className="nav-icon"/>:"notification":<FaRegNewspaper className="nav-icon"/>}{isOpen?"   notification":""}</NavLink>
                  </NavItem>*/}
                <NavItem>
                  <NavLink
                    to="/Login"
                    title="login"
                    className="nav-link"
                    onMouseEnter={() => {
                      this.handleLoginRedirect();
                    }}
                    onMouseOut={() => {
                      this.hoverme(3);
                    }}
                  >
                    {this.state.isHover3 ? (
                      this.state.isOpen ? (
                        <FaUserSecret className="nav-icon" />
                      ) : (
                        "login"
                      )
                    ) : (
                      <FaUserSecret className="nav-icon" />
                    )}
                    {this.state.isOpen ? "   login" : ""}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/"
                    title="search"
                    className="nav-link"
                    onMouseEnter={() => {
                      this.hoverme(4);
                    }}
                    onMouseOut={() => {
                      this.hoverme(4);
                    }}
                  >
                    {this.state.isHover4 ? (
                      this.state.isOpen ? (
                        <MdLocationSearching className="nav-icon" />
                      ) : (
                        "search"
                      )
                    ) : (
                      <MdLocationSearching className="nav-icon" />
                    )}
                    {this.state.isOpen ? "   search" : ""}
                  </NavLink>
                </NavItem>
                {/*<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        
                      </DropdownItem>
                      <DropdownItem>
                        
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        ！
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>*/}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
