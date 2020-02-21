import React, { useState } from 'react';
import { FaRegNewspaper,
  FaUserSecret } from "react-icons/fa";
import { MdMovieFilter,
  MdLocationSearching } from "react-icons/md";
import { Container, Row, Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  
} from 'reactstrap';
import './index.css';
import InTheater from './components/inTheater';
import '@brainhubeu/react-carousel/lib/style.css';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  const [isHover3, setIsHover3] = useState(false);
  const [isHover4, setIsHover4] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const hoverme1 = () => setIsHover1(!isHover1);
  const hoverme2 = () => setIsHover2(!isHover2);
  const hoverme3 = () => setIsHover3(!isHover3);
  const hoverme4 = () => setIsHover4(!isHover4);

  return (
    <div>
        <Navbar color="light" light expand="md">
          <div className="container">
            <NavbarBrand href="/" className="nav-brand">
              Movie Fanatic Club
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/" title="watchlist" className="nav-link" onMouseEnter={hoverme2} onMouseOut={hoverme2}>{isHover2?isOpen?<MdMovieFilter className="nav-icon"/>:"explore":<MdMovieFilter className="nav-icon"/>}{isOpen?"    explore":""}</NavLink>
                </NavItem>
                {/*<NavItem>
                  <NavLink href="/" title="notification" className="nav-link" onMouseEnter={hoverme1} onMouseOut={hoverme1}>{isHover1?isOpen?<FaRegNewspaper className="nav-icon"/>:"notification":<FaRegNewspaper className="nav-icon"/>}{isOpen?"   notification":""}</NavLink>
                </NavItem>*/}
                <NavItem>
                  <NavLink href="/" title="login" className="nav-link" onMouseEnter={hoverme3} onMouseOut={hoverme3}>{isHover3?isOpen?<FaUserSecret className="nav-icon"/>:"login":<FaUserSecret className="nav-icon"/>}{isOpen?"   login":""}</NavLink>
                </NavItem>
                <NavItem>  
                  <NavLink href="/" title="search" className="nav-link" onMouseEnter={hoverme4} onMouseOut={hoverme4}>{isHover4?isOpen?<MdLocationSearching className="nav-icon"/>:"search":<MdLocationSearching className="nav-icon"/>}{isOpen?"   search":""}</NavLink>
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
        <InTheater />
        <footer className="footer">
          <Navbar color="light" light expand="md">
            <div className="container">
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="views/Aboutus.js">About us</NavLink>
                </NavItem>
              </Nav>
              <p style={{margin: 0}}>© {new Date().getFullYear()} <a href="https://github.com/Westwood-S/Movie-Fanatic-Club">Mo &amp; Li‘s</a>.</p>
            </div>
          </Navbar>
        </footer>
    </div>
  );
}

export default NavBar;
