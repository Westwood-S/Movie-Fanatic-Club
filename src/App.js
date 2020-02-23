import React, { useState, Component } from "react";
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
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import "./index.css";
import InTheater from "./components/inTheater";
import "@brainhubeu/react-carousel/lib/style.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Body from "./components/Body";

class App extends Component {
  constructor(props) {
    super(props);
    // initializing state.
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
