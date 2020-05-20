import React, { Component } from "react";
import {
  CardText,
  CardTitle,
  CardSubtitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Row,
  Col,
  Media
} from "reactstrap";
import classnames from 'classnames';
import rp from "request-promise";
import cheerio from "cheerio";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { auth, db } from "./Firebase";

class ComingSoon extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      dates: [],
      activeTab: "",
      apis: [],
      isSignedIn: false,
      removeButton: []
    };

    this.handleWatchlist = this.handleWatchlist.bind(this);
    this.setWatchList = this.setWatchList.bind(this);
  }

  async componentDidMount() {
    await rp(
      "https://cors-anywhere.herokuapp.com/https://www.imdb.com/calendar?region=US&ref_=rlm"
    )
      .then(html => {
        let dates = [],
          apis = [];
        let $ = cheerio.load(html);

        $("#main h4").each(function () {
          let date = $(this)
            .prepend()
            .text();

          dates.push(date);
        });
        this.setState({
          dates: dates
        });

        $("#main ul li a").each(function () {
          let name = $(this).attr("href");
          let link = name.match(/(?<=title\/).*?(?=\/)/gs);

          fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?i=" + link[0], {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
              "x-rapidapi-key": "c3bfcbae69msh2fefac5f7da67adp1d2687jsnade70055f49b"
            }})
            .then(response => {
              response.json().then(data => {
                apis.push(data);
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
        this.setState({
          apis: apis
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    auth.onAuthStateChanged(user => {
      let currentState = this
      if (user) {
        currentState.setState({
          isSignedIn:true
        })
      }
    })
  }

  setWatchList(id){
    let userRef = db.collection("user").doc(auth.currentUser.email)
    let removeButtonList = this.state.removeButton
    if (removeButtonList.indexOf(id) > -1) {
      var addIndex = removeButtonList.indexOf(id)
      if (addIndex > -1) {
            removeButtonList.splice(addIndex, 1)
      }
      userRef
        .get()
        .then(function (doc) {
          var newWatchlist = doc.data().watchlist;
          var index = newWatchlist.indexOf(id)
          if (index > -1) {
            newWatchlist.splice(index, 1)
          }
          userRef.update({
            watchlist: newWatchlist
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    else {
      removeButtonList.push(id)
      userRef
        .get()
        .then(function (doc) {
          var newWatchlist = doc.data().watchlist;
          newWatchlist.push(id)
          userRef.update({
            watchlist: newWatchlist
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    this.setState({removeButton: removeButtonList})
  }

  handleWatchlist() { }

  render() {
    const toggle = tab => {
      if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    };

    var tabNames = [];

    return (
      <div>
        <h2 className="section-titles">Coming Sooooooon</h2>
        <div className="tabs">
          <Nav tabs>
            {this.state.dates.map(item => {
              const tabName =
                item.split(" ")[1].slice(0, 3) + " " + item.split(" ")[2];
              if (tabNames.includes(tabName)) return "";
              else {
                tabNames.push(tabName);
                return (
                  <NavItem key={item} className="nav-items">
                    <a
                      className={classnames({
                        active: this.state.activeTab === tabName
                      })}
                      onClick={() => {
                        toggle(tabName);
                      }}
                    >
                      <button className="tab-btn">{tabName}</button>
                    </a>
                  </NavItem>
                );
              }
            })}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            {tabNames.map(item => {
              return (
                <TabPane tabId={item} key={item}>
                  <Row>
                    {this.state.apis
                      // .filter(data => data.Released.slice(3, 11) === item)
                      .map(data => {

                        if (this.state.isSignedIn){
                          var currentButtonList = this.state.removeButton
                          var currentState = this
                          db.collection("user").doc(auth.currentUser.email)
                                .get()
                                .then(function (doc) {
                                  var newWatchlist = doc.data().watchlist;
                                  var addIndex = newWatchlist.indexOf(data.imdbID)
                                  if (addIndex > -1) {
                                    currentButtonList.push(data.imdbID)
                                    currentState.setState({
                                      removeButton: currentButtonList
                                    })
                                  }
                        
                                })
                                .catch(function(error) {
                                  console.log("Error getting document:", error);
                                });
                        }  
                        
                        return (
                          <Col xl="6" key={data.Title}>
                            <Media className="media-body">
                              <Media left className="media-pic">
                                <a
                                  href={
                                    "https://www.imdb.com/title/" + data.imdbID
                                  }
                                  title="none clickbait"
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className="media-pic"
                                >
                                  <img alt={data.Title} src={data.Poster} />
                                </a>
                              </Media>
                              <Media body className="cards-body">
                                <CardTitle>
                                  <NavLink
                                    to={{
                                      pathname: "./Movie",
                                      id: data.imdbID
                                    }}
                                    className="card-title"
                                    title="more info"
                                  >
                                    {data.Title}
                                  </NavLink>
                                  {this.state.isSignedIn?
                                  <button 
                                    className="watchlist-btn" 
                                    onClick={() => {
                                      this.setWatchList(data.imdbID)
                                    }}
                                  >
                                    {this.state.removeButton.indexOf(data.imdbID)===-1?<FiPlusSquare />:<FiMinusSquare />}
                                  </button>
                                  :""}
                                </CardTitle>
                                <CardSubtitle className="card-subtitles">
                                  {data.Rated} | {data.Runtime} | {data.Genre} |{" "}
                                  {data.Released}
                                </CardSubtitle>
                                <CardText className="comingsoon-Card">Director: {data.Director}</CardText>
                                <CardText className="comingsoon-Card">Actors: {data.Actors}</CardText>
                                <CardText className="comingsoon-Plot">Plot: {data.Plot}</CardText>
                              </Media>
                            </Media>
                          </Col>
                        );
                      })}
                  </Row>
                </TabPane>
              );
            })}
          </TabContent>
        </div>
      </div>
    );
  }
}

export default ComingSoon;
