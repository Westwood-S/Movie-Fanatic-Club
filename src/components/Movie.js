// body component for loading stuff about an individual movie
// when the user clicks on it

import React from "react";
import "../index.css";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import { auth, db } from "./Firebase";
import firebase from "firebase";
import {
  Button,
  Card,
  CardGroup,
  CardSubtitle,
  Container,
  Row,
  Media,
  CardImg
} from "reactstrap";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movies: {},
      loading: true,
      isAdd: false,
      thisMovie: "",
      isMounted: false
    };

    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  addToWatchlist() {
    var watchlistRef = db.collection("user").doc(auth.currentUser.email);
    watchlistRef.update({
      watchlist: firebase.firestore.FieldValue.arrayUnion(this.state.movie.id)
    });
    alert("adding to watchlist");
    this.setWatchList = this.setWatchList.bind(this)
    this.checkExists = this.checkExists.bind(this)
  }

  removeFromWatchlist() {
    var watchlistRef = db.collection("user").doc(auth.currentUser.email);
    watchlistRef.update({
      watchlist: firebase.firestore.FieldValue.arrayRemove(this.state.movie.id)
    });
    alert("removing from watchlist");
  }

  async componentDidMount() {
    this.setState({ isMounted: true })

    fetch(
      "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
      this.props.location.id,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key": "c3bfcbae69msh2fefac5f7da67adp1d2687jsnade70055f49b"
        }
      }
    )
      .then(response => {
        response.json().then(data => {
          this.setState({
            movie: data,
            thisMovie: data.id
          })

          auth.onAuthStateChanged(user => {
            let currentState = this, thisMovie = currentState.state.thisMovie
            if (user && currentState.state.isMounted && thisMovie !== "") {
              var docRef = db.collection("user").doc(auth.currentUser.email);
              docRef
                .get()
                .then(function (doc) {
                  var newWatchlist = doc.data().watchlist;
                  var index = newWatchlist.indexOf(thisMovie)
                  if (index > -1) {
                    currentState.setState({
                      isAdd: true
                    })
                  }

                })
                .catch(function (error) {
                  console.log("Error getting document:", error);
                });
            }
          })
        })
      })
      .catch(err => {
        console.log(err);
      });

    fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?i=" + this.props.location.id, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "c3bfcbae69msh2fefac5f7da67adp1d2687jsnade70055f49b"
      }})
      .then(response => {
        response.json().then(data => {
          this.setState({
            movies: data
          })
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  setWatchList(id) {
    let userRef = db.collection("user").doc(auth.currentUser.email)
    if (this.state.isAdd) {
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

      this.setState({
        isAdd: !this.state.isAdd
      })
    }
    else {
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

      this.setState({
        isAdd: !this.state.isAdd
      })
    }
  }

  render() {
    {/* 
    The purpose of the code inside this 'render' is to map over the cast of the movie and divide them evenly into two arrays, because I want to
    display the cast in two columns instead of one so that the page doesn't end up being too long. This way we can map over each of these two arrays
    in their own card and build some html to return   
    */}
    var arr1 = [];
    var arr2 = [];
    var counter = 0;

    if (this.state.movie.cast !== undefined) {
      this.state.movie.cast.map(item => {
        if (counter % 2 === 0) {
          arr1.push(item);
        } else {
          arr2.push(item);
        }
        counter++;
      })
    }

    return (
      <Container key="">
        {this.state.movie ?
          <div id="card-body">
            <div id="title-and-btn">
              <a title="if u stan imdb..." className="movie-title" rel="noopener noreferrer" target="_blank" href={"https://www.imdb.com/title/" + this.state.movie.id}>{this.state.movie.title} ({this.state.movie.year})</a>
              
            </div>

            <CardGroup>
              <Card id="poster">
                {this.state.movie.poster ?
                  <CardImg top width="100%" src={this.state.movie.poster}>
                  </CardImg>
                  : ""}
                <div className="movie-btn">
                <Button
                  onClick={() => {
                    this.setWatchList(this.state.movie.id)
                  }}
                  className="movie-rl-btn">{this.state.isAdd ? <TiMinusOutline /> : <TiPlusOutline />}
                watchlist
              </Button>
              </div>
              </Card>
              <Card>
              
                <CardSubtitle>
                  <div className="movie-info">{this.state.movies.Rated} | {this.state.movies.Runtime} | {this.state.movies.Released}</div>
                </CardSubtitle>
                <CardSubtitle>
                  <div className="movie-director">Directed by: <div className="movie-info-inline">{this.state.movies.Director}</div></div>
                </CardSubtitle>
                <CardSubtitle>
                  <div className="movie-director">Countries Released: <div className="movie-info">{this.state.movies.Country} </div></div>
                </CardSubtitle>
                <CardSubtitle>
                  <div className="movie-director">Translations: <div className="movie-info">{this.state.movies.Language}</div></div>
                </CardSubtitle>
                <CardSubtitle>
                  <div className="movie-director">IMDb rating: <div className="movie-info-inline">{this.state.movies.imdbRating}</div></div>
                </CardSubtitle>
                <CardSubtitle>
                  <div className="movie-director">Metascore: <div className="movie-info-inline">{this.state.movies.Metascore}</div></div>
                </CardSubtitle>
                {this.state.movies.Production ?
                  <CardSubtitle>
                    <div className="movie-director">Production: <div className="movie-info-inline">{this.state.movies.Production}</div></div>
                  </CardSubtitle> : ""}
                <CardSubtitle>
                  <div className="movie-director">Awards: <div className="movie-info">{this.state.movies.Awards}</div></div>
                </CardSubtitle>
                <CardSubtitle>
                  <div className="movie-director">Plot: <div className="movie-info">{this.state.movies.Plot}</div></div>
                </CardSubtitle>
              </Card>
            </CardGroup>
            <div className="movie-title-2">Cast</div>
            <CardGroup>
              <Card>
                {arr1 ?
                  arr1.map(item => {
                    return (
                      <Row key="yay"><div className="movie-actor">
                        <a title="visit fav actor" className="movie-actor-link" rel="noopener noreferrer" target="_blank" href={'https://www.imdb.com/name/' + item.actor_id}><div className="actor">{item.actor}</div></a> <div className="character"> as </div><div className="character">{item.character}</div>
                      </div></Row>
                    )
                  })
                  : ""}
              </Card>
              <Card>
                {arr2 ?
                  arr2.map(item => {
                    return (
                      <Row key="yay"><div className="movie-actor">
                        <a title="visit fav actor" className="movie-actor-link" rel="noopener noreferrer" target="_blank" href={'https://www.imdb.com/name/' + item.actor_id}><div className="actor">{item.actor}</div></a> <div className="character"> as </div><div className="character">{item.character}</div>
                      </div></Row>
                    )
                  })
                  : ""}
              </Card>
            </CardGroup>
          </div>
          : <Media>wait a sec bru</Media>}
      </Container>
    );
  }
}

export default Movie;
