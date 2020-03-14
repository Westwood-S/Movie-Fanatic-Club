import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { FaImdb } from "react-icons/fa";
import { TiMediaFastForward } from "react-icons/ti";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import Icon from "react-fa";
import rp from "request-promise";
import cheerio from "cheerio";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import ComingSoon from "./comingSoon";
import { NavLink } from "react-router-dom";
import { auth, db } from "./Firebase";

class InTheater extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      apis: [],
      isSignedIn: false,
      removeButton: []
    };
    this.onChange = this.onChange.bind(this);
    this.setWatchList = this.setWatchList.bind(this);
  }

  async componentDidMount() {
    await rp(
      "https://cors-anywhere.herokuapp.com/https://www.imdb.com/search/title/?title_type=feature&user_rating=7.5,&groups=now-playing-us&languages=en"
    )
      .then(html => {
        let apis = [];
        let $ = cheerio.load(html);

        $(".lister-item-header a").each(function () {
          let name = $(this)
            .prepend()
            .text();

          fetch(
            "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
            name,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host":
                  "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key":
                  "c3bfcbae69msh2fefac5f7da67adp1d2687jsnade70055f49b"
              }
            }
          )
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
          apis: apis,
          laoding: true
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    auth.onAuthStateChanged(user => {
      let currentState = this
      if (user) {
        currentState.setState({
          isSignedIn: true
        })
      }
    })
  }

  onChange(value) {
    this.setState({ value });
  }

  setWatchList(id, index) {
    let userRef = db.collection("user").doc(auth.currentUser.email)
    let removeButtonList = this.state.removeButton
    if (removeButtonList.indexOf(index) > -1) {
      var addIndex = removeButtonList.indexOf(index)
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
      removeButtonList.push(index)
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
    this.setState({ removeButton: removeButtonList })
  }

  render() {
    return (
      <div>
        <div className="carousel-inners">
          <h2 className="section-title">In Theater</h2>

          <Carousel
            value={this.state.value}
            onChange={this.onChange}
            arrowLeft={<Icon name="angle-double-left" />}
            arrowLeftDisabled={<Icon name="angle-left" />}
            arrowRight={<Icon name="angle-double-right" />}
            arrowRightDisabled={<Icon name="angle-right" />}
            addArrowClickHandler
            clickToChange
            autoPlay={4000}
            stopAutoPlayOnHover
            slidesPerPage={3}
            infinite
            className="carousel-item"
          >
            {this.state.apis.length === 0 ? (
              <div>i&apos;m gettin there...</div>
            ) : (
                this.state.apis.map((item, index) => {
                  if (this.state.isSignedIn) {
                    var currentButtonList = this.state.removeButton
                    var currentState = this
                    db.collection("user").doc(auth.currentUser.email)
                      .get()
                      .then(function (doc) {
                        var newWatchlist = doc.data().watchlist;
                        var addIndex = newWatchlist.indexOf(item.id)
                        if (addIndex > -1) {
                          currentButtonList.push(index)
                          currentState.setState({
                            removeButton: currentButtonList
                          })
                        }

                      })
                      .catch(function (error) {
                        console.log("Error getting document:", error);
                      });
                  }

                  return (
                    <Card key={item.title} className="card">
                      <a
                        title="traaaailer"
                        href={item.trailer.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <img alt={item.title} src={item.poster} />
                      </a>
                      <CardBody className="intheater-cardbody" title="stop on hover">
                        <CardTitle>
                          <NavLink
                            to={{
                              pathname: "./Movie",
                              id: item.id
                            }}
                            className="card-titles"
                            title="more info babe"
                          >
                            {item.title}
                          </NavLink>
                          {this.state.isSignedIn ?
                            <button
                              className="intheater-btn"
                              onClick={() => {
                                this.setWatchList(item.id, index)
                              }}
                            >
                              {this.state.removeButton.indexOf(index) === -1 ? <FiPlusSquare /> : <FiMinusSquare />}
                            </button>
                            : ""}
                        </CardTitle>
                        <CardSubtitle>
                          <FaImdb />
                          {item.rating}
                        </CardSubtitle>
                        <CardSubtitle>
                          <TiMediaFastForward />
                          {item.length}
                        </CardSubtitle>
                        {/*<CardSubtitle>Director: </CardSuabtitle>*/}
                        <CardText className="intheater-cardtext">Plot: {item.plot}</CardText>
                      </CardBody>
                    </Card>
                  );
                })
              )}
          </Carousel>
        </div>
        <ComingSoon />
      </div>
    );
  }
}

export default InTheater;
