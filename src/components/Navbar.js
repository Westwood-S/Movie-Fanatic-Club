import React from "react";
import { FaRegNewspaper, FaUserSecret} from "react-icons/fa";
import { FiGrid, FiXCircle } from "react-icons/fi";
import { MdMovieFilter, MdLocationSearching} from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
  Popover, Button,
  Modal, ModalBody, Media
} from "reactstrap";
import "../index.css";
import { Redirect, NavLink, Link } from "react-router-dom";                        
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, db } from './Firebase';
import firebase from 'firebase';
import Search from "./Search";

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
      isOpen: false,
      isToggleSignInOpen: false,
      isToggleSearchOpen: false,
      isHover1: false, 
      isHover2: false,
      isHover3: false,
      isHover4: false,
      isHover5: false,
      isHover6: false,
      searchLoading: true,
      movies: []
    };

    this.uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
    }

    this.handleLoginRedirect = this.handleLoginRedirect.bind(this);
    
    this.toggle = this.toggle.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.hoverme = this.hoverme.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.search = this.search.bind(this);
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

  //search collapse
  toggleSearch(){
    this.setState(()=>({
      isToggleSearchOpen: !this.state.isToggleSearchOpen,
      movies: []
    }))
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
    auth.onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      })
      if (user){
        const userRef = db.collection("user").doc(auth.currentUser.email)
        userRef  
          .get()
          .then(function(doc) {
            if (doc.exists) {
              userRef.update({
                  name: auth.currentUser.displayName,
                  photo: auth.currentUser.photoURL,
                  uid: auth.currentUser.uid,
                })
            } else {
              userRef.set({
                  name: auth.currentUser.displayName,
                  email: auth.currentUser.email,
                  photo: auth.currentUser.photoURL,
                  uid: auth.currentUser.uid,
                  watchlist: {}
                })
            }
          })
          .catch(function(error){
            console.log(error)
          })

      }
    })
  }

  // when click on the outside, the signin popup window will disappear
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

  //search omdb api
  search(searchValue){
    this.setState({
      searchLoading: true,
      movies: []
    })

    fetch('https://www.omdbapi.com/?apikey=1e54e73e&s='+searchValue)
    .then(response => {
      response.json().then (data =>{
          this.setState({
            movies: data.Search
          })
      })
    })
    .catch(err => {
        console.log(err);
    }); 
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
                {this.state.isSignedIn ?
                <NavItem>
                  <NavLink 
                    to="/" 
                    title="if you wake up in the morning and have some ideas, you have this obsession that you have to make them, then you are an artist - Marina Abramović"
                    className="nav-link nav-fa" 
                  >
                    {auth.currentUser.displayName}
                  </NavLink>
                </NavItem> : ""}
                {this.state.isSignedIn ?
                <NavItem>
                  <NavLink 
                    to="/Watchlist" 
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
                        <MdMovieFilter className="nav-icon"/>
                      ) : (
                        "watchlist"
                      )
                    ) : (
                      <MdMovieFilter className="nav-icon"/>
                    )}
                    {this.state.isOpen?"   watchlist":""}
                  </NavLink>
                </NavItem> : ""}
                {this.state.isSignedIn ?
                <NavItem>
                    <NavLink 
                      to="/"  
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
                <NavItem>
                  <NavLink
                    to="./Explore"
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
                        <FiGrid className="nav-icon" />
                      ) : (
                        "explore"
                      )
                    ) : (
                      <FiGrid className="nav-icon" />
                    )}
                    {this.state.isOpen ? "    explore" : ""}
                  </NavLink>
                </NavItem>
                {this.state.isSignedIn ? "": 
                <NavItem>
                  <NavLink
                    to="/"
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
                    <StyledFirebaseAuth show={this.state.isToggleSignInOpen} uiConfig={this.uiConfig} firebaseAuth={auth}/>
                  </Popover>
                </NavItem>}
                <NavItem>
                  <NavLink
                    to="/"
                    className="nav-link nav-fa"
                    onMouseEnter={() => {
                      this.hoverme(4);
                    }}
                    onMouseOut={() => {
                      this.hoverme(4);
                    }}
                    onClick={() =>{
                      this.toggleSearch();
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
                  <Modal isOpen={this.state.isToggleSearchOpen} toggle={this.toggleSearch}>
                    <ModalBody className="modal-body">
                      <Search search={this.search}/>
                      <Button className="btn-search" color="link" onClick={this.toggleSearch}>maybe later <FiXCircle /></Button>
                    </ModalBody>
                    {this.state.movies?this.state.movies.map((movie, index)=>(
                      <NavLink
                        key={movie.Title}
                        to={{
                          pathname: './Movie',
                          id: movie.imdbID
                        }}
                      >
                        <ModalBody >
                          <Media>
                            <Media left className="search-pic" >
                                <img alt={movie.Title} src={movie.Poster}/>
                            </Media>
                            <Media body className="media-title">
                              <Media heading className="media-heading">{index+1}. {movie.Title} ({movie.Year})</Media>
                            </Media>
                          </Media>
                        </ModalBody>
                      </NavLink>
                    ))
                    :""}
                  </Modal>
                </NavItem>
                {this.state.isSignedIn ?
                <NavItem>
                    <NavLink 
                      to="/"  
                      className="nav-link nav-fa" 
                      onMouseEnter={()=>{
                        this.hoverme(6);
                      }}
                      onMouseOut={()=>{
                        this.hoverme(6);
                      }}
                      onClick={()=>{
                        auth.signOut()
                      }}
                    >
                      {this.state.isHover6 ? (
                        this.state.isOpen ? (
                          <IoMdLogOut className="nav-icon"/>
                        ) : (
                          "logout"
                        )
                      ) : (
                        <IoMdLogOut className="nav-icon"/>
                      )}
                      {this.state.isOpen?"   logout":""}
                    </NavLink>
                  </NavItem> : ""}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
