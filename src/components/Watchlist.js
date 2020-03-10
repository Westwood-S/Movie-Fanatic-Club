// body component for a user's watchlist

import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import { auth, db } from "./Firebase";
import firebase, { DocumentReference, DocumentSnapshot } from "firebase";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Row,
  Col,
  Media,
  Button
} from "reactstrap";
import { FaImdb } from "react-icons/fa";
import { TiMediaFastForward, TiEqualsOutline } from "react-icons/ti";
import Icon from "react-fa";
import rp from "request-promise";
import cheerio from "cheerio";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import ComingSoon from "./comingSoon";
import classnames from "classnames";

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      apis: [],
      dates: [],
      activeTab: ""
    };
    this.setAPIState = this.setAPIState.bind(this);
  }

  setAPIState = APIs => {
    this.setState({ apis: [...this.state.apis, APIs] });
  };

  async componentDidMount() {
    let currentComponent = this;
    if (auth.currentUser != null) {
      var docRef = db.collection("user").doc(auth.currentUser.email);

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            for (let i = 0; i < doc.data().watchlist.length; i++) {
              let name = doc.data().watchlist[i];
              const URL = "http://www.omdbapi.com/?apikey=1e54e73e&i=" + name;
              fetch(URL)
                .then(result => result.json())
                .then(result => {
                  currentComponent.setAPIState(result);
                });
            }
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

  render() {
    return (
      <div>
        <h2 className="section-title">Watchlist</h2>

        <div className="tabs">
          <Row>
            {this.state.apis.map(data => {
              console.log("DATA INSIDE MAP IS: ", data);
              return (
                <Col sm="6" key={data.Title}>
                  <Media className="media-body">
                    <Media left className="media-pic">
                      <a
                        href={"https://www.imdb.com/title/" + data.imdbID}
                        title="link"
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
                        >
                          {data.Title}
                        </NavLink>
                      </CardTitle>
                      <CardSubtitle>
                        {data.Rated} | {data.Runtime} | {data.Genre} |{" "}
                        {data.Released}
                      </CardSubtitle>
                      <CardText>Director: {data.Director}</CardText>
                      <CardText>Actors: {data.Actors}</CardText>
                      <CardText>Plot: {data.Plot}</CardText>
                    </Media>
                  </Media>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default Watchlist;
