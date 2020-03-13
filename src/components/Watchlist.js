// body component for a user's watchlist

import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import { auth, db } from "./Firebase";
import {
  CardText,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Media
} from "reactstrap";

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
      <div className="watchlist">
        <h2 className="section-title">Watchlist</h2>

        <div className="tabs">
          <Row>
            {this.state.apis.map(data => {
              console.log("DATA INSIDE MAP IS: ", data);
              return (
                <Col xl="6" key={data.Title}>
                  <Media className="media-body">
                    <Media left className="media-pic">
                      <a
                        href={"https://www.imdb.com/title/" + data.imdbID}
                        title="imdb express"
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
                          title="this is it"
                        >
                          {data.Title}
                        </NavLink>
                      </CardTitle>
                      <CardSubtitle className="card-subtitles">
                        {data.Rated} | {data.Runtime} | {data.Genre} |{" "}
                        {data.Released}
                      </CardSubtitle>
                      <CardText className="watchlist-info">Director: {data.Director}</CardText>
                      <CardText className="watchlist-info">Actors: {data.Actors}</CardText>
                      <CardText className="watchlist-plot">Plot: {data.Plot}</CardText>
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
