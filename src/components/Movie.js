// body component for loading stuff about an individual movie
// when the user clicks on it

import React from "react";
import "../index.css";
import { Media, Container, Row, Button } from "reactstrap";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import { auth, db } from "./Firebase";
import firebase from "firebase";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movies: {},
      loading: true,
      isAdd: false
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

  componentDidMount() {
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
            movie: data
          })
        })
      })
      .catch(err => {
        console.log(err);
      });

    fetch(
      "https://www.omdbapi.com/?apikey=1e54e73e&i=" + this.props.location.id
    )
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


  checkExists(id) {
    if (this.state.isAdd === "false") {
      console.log("isadd")
      db.collection("user")
        .doc(auth.currentUser.email)
        .get()
        .then(function (doc) {
          var newWatchlist = doc.data().watchlist;
          var index = newWatchlist.indexOf(id)
          if (index > -1) {
            this.setState({
              isAdd: true
            })
          }

        })
        .catch(function (error) {
          console.log(error)
        })

      this.setState({
        isAdd: !this.state.isAdd
      })
    }
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
    if (this.state.isAdd === 'false' && this.state.movie.id) {
      console.log("check")
      db.collection("user")
        .doc(auth.currentUser.email)
        .get()
        .then(function (doc) {
          var newWatchlist = doc.data().watchlist;
          var index = newWatchlist.indexOf(this.state.movie.id)
          if (index > -1) {
            this.setState({
              isAdd: true
            })
          }

        })
        .catch(function (error) {
          console.log(error)
        })
    }

    return (
      <Container>
        {this.state.movie ?
          <div>
            <Row>
              <a title="if u stan imdb..." className="movie-title" rel="noopener noreferrer" target="_blank" href={"https://www.imdb.com/title/" + this.state.movie.id}>{this.state.movie.title} ({this.state.movie.year})</a>
            </Row>
            <Row>
              <div className="movie-poster">
                {this.state.movie.poster ?
                  <a title="trailer is here!" className="movie-title" rel="noopener noreferrer" target="_blank" href={this.state.movie.trailer ? this.state.movie.trailer.link : "/"}>
                    <img className="movie-actual-poster" alt={this.state.movie.title} src={this.state.movie.poster} />
                  </a>
                  : ""}

              </div>
            </Row>
            <Row><div className="movie-director">directed by: {this.state.movies.Director}</div></Row>
            <Row><div className="movie-info">{this.state.movies.Rated} | {this.state.movies.Runtime} | {this.state.movies.Released}</div></Row>
            <Row><div className="movie-info">{this.state.movies.Country} | {this.state.movies.Language}</div></Row>
            <Row><div className="movie-info">IMDb rating: {this.state.movies.imdbRating} | Metascore: {this.state.movies.Metascore}</div></Row>
            {this.state.movies.Production ?
              <Row><div className="movie-director">this.state.movies.Production</div></Row> : ""}
            <Row><div className="movie-info">AWARDS: {this.state.movies.Awards}</div></Row>
            <Row><div className="movie-info">PLOT: {this.state.movies.Plot}</div></Row>
            {this.state.movie.cast ?
              this.state.movie.cast.map(item => {
                return (
                  <Row key=""><div className="movie-actor">
                    <a title="visit fav actor" className="movie-actor-link" rel="noopener noreferrer" target="_blank" href={'https://www.imdb.com/name/' + item.actor_id}>{item.actor}</a> as {item.character}
                  </div></Row>
                )
              })
              : ""}
            <Row>
              <div className="movie-btn">
                <Button
                  onClick={() => {
                    this.setWatchList(this.state.movie.id)
                  }}
                  onMouseEnter={() => {
                    this.checkExists(this.state.movie.id)
                  }}
                  className="movie-rl-btn">{this.state.isAdd ? <TiMinusOutline /> : <TiPlusOutline />}
                watchlist
              </Button>

              </div>
            </Row>
          </div>
          : <Media>wait a sec bru</Media>}
      </Container>
    );
  }
}

export default Movie;
