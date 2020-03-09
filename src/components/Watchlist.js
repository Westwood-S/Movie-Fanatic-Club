// body component for a user's watchlist

import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import { auth, db } from "./Firebase";
import firebase, { DocumentReference, DocumentSnapshot } from "firebase";

import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { FaImdb } from "react-icons/fa";
import { TiMediaFastForward } from "react-icons/ti";
import Icon from "react-fa";
import rp from "request-promise";
import cheerio from "cheerio";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import ComingSoon from "./comingSoon";

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      apis: []
    };
  }

  async componentDidMount() {
    if (auth.currentUser != null) {
      var docRef = db.collection("user").doc(auth.currentUser.email);

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log("watchlist:", doc.data().watchlist);

            console.log("length of watchlist:", doc.data().watchlist.length);
            let apis = [];
            for (let i = 0; i < doc.data().watchlist.length; i++) {
              let name = doc.data().watchlist[i];
              fetch(
                "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/title/" +
                  name,
                {
                  method: "GET",
                  mode: "no-cors",
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
            }
            this.setState({
              apis: apis
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    } else {
      console.log("currentUser is null");
    }
  }

  // below I added a link back to the landing page, just to make our lives easier while testing
  // we'll remove it when we actually build the events page, since users won't need to go back to
  // the landing page
  render() {
    return (
      <div className="carousel-inners">
        <h2 className="section-title">Watchlist</h2>

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
            this.state.apis.map(item => {
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
                  <CardBody>
                    <CardTitle>
                      <NavLink
                        to={{
                          pathname: "./Movie",
                          id: item.id
                        }}
                        className="card-title"
                      >
                        {item.title}
                      </NavLink>
                    </CardTitle>
                    <CardSubtitle>
                      <FaImdb />
                      {item.rating}
                    </CardSubtitle>
                    <CardSubtitle>
                      <TiMediaFastForward />
                      {item.length}
                    </CardSubtitle>
                    {/*<CardSubtitle>Director: </CardSubtitle>*/}
                    <CardText>Plot: {item.plot}</CardText>
                  </CardBody>
                </Card>
              );
            })
          )}
        </Carousel>
      </div>
    );
 