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
              // fetch(
              //   "https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=1e54e73e&i=" +
              //     name
              //   // {
              //   //   method: "GET",
              //   //   headers: {
              //   //     "x-rapidapi-host":
              //   //       "imdb-internet-movie-database-unofficial.p.rapidapi.com",
              //   //     "x-rapidapi-key":
              //   //       "c3bfcbae69msh2fefac5f7da67adp1d2687jsnade70055f49b"
              //   //   }
              //   // }
              // )
              //   .then(response => {
              //     response.json().then(data => {
              //       apis.push(data);
              //     });
              //   })
              //   .catch(err => {
              //     console.log(err);
              //   });
              fetch("http://www.omdbapi.com/?apikey=1e54e73e&i=tt4154796")
                .then(success => {
                  success.json();
                })
                .then(movies => {
                  console.log("MOVIES: ", movies.Title);
                })
                .catch(error => {
                  console.log(error);
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
      </div>
    );
  }
}

export default Watchlist;
