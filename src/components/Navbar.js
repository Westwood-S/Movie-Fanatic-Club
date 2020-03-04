import React from "react";
import { FaRegNewspaper, FaUserSecret, FaUserAstronaut } from "react-icons/fa";
import { MdMovieFilter, MdLocationSearching, MdLocalMovies } from "react-icons/md";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Popover, 
} from "reactstrap";
import "../index.css";
import { Redirect, NavLink, Link } from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBAiPt_zuhTaKnFil-h6G7-OghzLB0B4h4",
  authDomain: "movie-fanatic-club.firebaseapp.com",
  databaseURL: "https://movie-fanatic-club.firebaseio.com",
  projectId: "movie-fanatic-club",
  storageBucket: "movie-fanatic-club.appspot.com",
  messagingSenderId: "574114777977",
  appId: "1:574114777977:web:d861d1649cbd06e45b3da8",
  measurementId: "G-D27DHGSFS4"
});

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
      isSignedIn: false,
      isToggleSignInOpen: false,
      isOpen: false,
      isHover1: false, 
      isHover2: false,
      isHover3: false,
      isHover4: false,
      isHover5: false,
      isHover6: false
    };

    this.uiConfig = {
      signInFlow: 'popup',
      //signInSuccessUrl: '/Watchlist',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }

    this.handleLoginRedirect = this.handleLoginRedirect.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.toggle = this.toggle.bind(this);
    this.hoverme = this.hoverme.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleLoginRedirect(event) {
    // set state "toEvents" to true
    this.setState(() => ({
      toLogin: true
    }));
  }

  // navbar toggle for small screen
  toggle() {
    this.setState(() => ({
      isOpen: !this.state.isOpen
    }));
  }

  // signin popup window toggle
  toggleSignIn() {
    this.setState(() => ({
      isToggleSignInOpen: !this.state.isToggleSignInOpen
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
    } else if (num === 4){
      this.setState(() => ({
        isHover4: !this.state.isHover4
      }));
    } else if (num === 5){
      this.setState(() => ({
        isHover5: !this.state.isHover5
      }));
    } else if (num === 6){
      this.setState(() => ({
        isHover6: !this.state.isHover6
      }));
    }
  }

  componentDidMount(){ 
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      })
    })
  }

  // when click on the outside, the signin toggle will disappear
  handleClick(){
    if (!this.state.isToggleSignInOpen) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       isToggleSignInOpen: !prevState.isToggleSignInOpen
    }));
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    
    this.handleClick();
  }

  render() {
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
                    className="nav-link nav-fa"
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
                {this.state.isSignedIn ?
                <NavItem>
                    <NavLink 
                      to="/" 
                      title="notification" 
                      className="nav-link nav-fa" 
                      onMouseEnter={()=>{
                        this.hoverme(1);
                      }}
                      onMouseOut={()=>{
                        this.hoverme(1);
                      }}
                    >
                      {this.state.isHover1 ? (
                        this.state.isOpen ? (
                          <FaRegNewspaper className="nav-icon"/>
                        ) : (
                          "notification"
                        )
                      ) : (
                        <FaRegNewspaper className="nav-icon"/>
                      )}
                      {this.state.isOpen?"   notification":""}
                    </NavLink>
                  </NavItem> : ""}
                {this.state.isSignedIn ?
                <NavItem>
                  <NavLink 
                    to="/Watchlist" 
                    title="watchlist" 
                    className="nav-link nav-fa" 
                    onMouseEnter={()=>{
                      this.hoverme(5);
                    }}
                    onMouseOut={()=>{
                      this.hoverme(5);
                    }}
                  >
                    {this.state.isHover5 ? (
                      this.state.isOpen ? (
                        <MdLocalMovies className="nav-icon"/>
                      ) : (
                        "watchlist"
                      )
                    ) : (
                      <MdLocalMovies className="nav-icon"/>
                    )}
                    {this.state.isOpen?"   watchlist":""}
                  </NavLink>
                </NavItem> : ""}
                {this.state.isSignedIn ?
                <NavItem>
                  <NavLink 
                    to="/" 
                    title="logout" 
                    className="nav-link nav-fa" 
                    onMouseEnter={()=>{
                      this.hoverme(6);
                    }}
                    onMouseOut={()=>{
                      this.hoverme(6);
                    }}
                    onClick={()=> {
                      firebase.auth().signOut();
                    }}
                  >
                    {this.state.isHover6 ? (
                      this.state.isOpen ? (
                        <FaUserAstronaut className="nav-icon"/>
                      ) : (
                        "logout"
                      )
                    ) : (
                      <FaUserAstronaut className="nav-icon"/>
                    )}
                    {this.state.isOpen?"   logout":""}
                  </NavLink>
                </NavItem> : ""}
                {/* {this.state.isSignedIn ? "": */}
                <NavItem>
                  <NavLink
                    to="/"
                    title="login"
                    className="nav-link nav-fa"
                    onMouseEnter={() => {
                      this.handleLoginRedirect();
                      this.hoverme(3);
                    }}
                    onMouseOut={() => {
                      this.hoverme(3);
                    }}
                    onClick={() => {
                      this.toggleSignIn();
                      this.handleClick();
                    }}
                    id="Popover1" 
                    type="button"
                    ref={node => { this.node = node; }}
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
                  <Popover placement="bottom" isOpen={this.state.isToggleSignInOpen} target="Popover1" toggle={this.toggleSignIn}>
                    <StyledFirebaseAuth show={this.state.isToggleSignInOpen} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                  </Popover>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/"
                    title="search"
                    className="nav-link nav-fa"
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
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
