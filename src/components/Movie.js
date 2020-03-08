// body component for loading stuff about an individual movie
// when the user clicks on it

import React from "react";
import "../index.css";
import { Media, Container, Row, Button} from 'reactstrap';
import { NavLink } from "react-router-dom";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movies: {},
      loading: true
    };
  }

  componentDidMount(){
    fetch("https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/"+this.props.location.id, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key": "c3bfcbae69msh2fefac5f7da67adp1d2687jsnade70055f49b"
            }
    })
    .then(response => {
      response.json().then (data =>{
          this.setState({
            movie: data
          }) 
          console.log(this.state.movie)
      })
    })
    .catch(err => {
        console.log(err);
    }); 

    fetch('https://www.omdbapi.com/?apikey=1e54e73e&i='+this.props.location.id)
    .then(response => {
      response.json().then (data =>{
          this.setState({
            movies: data
          })
          console.log(this.state.movies)
      })
    })
    .catch(err => {
        console.log(err);
    }); 
  }
  
  // below I added a link back to the landing page, just to make our lives easier while testing
  // we'll remove it when we actually build the events page, since users won't need to go back to
  // the landing page
  render() {
    return (
      <Container>
        {this.state.movie? 
        <div>
          <Row>
            <a title="if u stan imdb..." className="movie-title" rel="noopener noreferrer" target="_blank" href={"https://www.imdb.com/title/"+this.state.movie.id}>{this.state.movie.title} ({this.state.movie.year})</a>
          </Row>
          <Row>
            <div className="movie-poster">
              <a title="trailer is here!" className="movie-title" rel="noopener noreferrer" target="_blank" href={this.state.movie.trailer?this.state.movie.trailer.link:"/"}>
                <img className="movie-actual-poster" alt={this.state.movie.title} src={this.state.movie.poster}/>
              </a>
            </div>
          </Row>
          <Row><div className="movie-director">directed by: {this.state.movies.Director}</div></Row>
          <Row><div  className="movie-info">{this.state.movies.Rated} | {this.state.movies.Runtime} | {this.state.movies.Released}</div></Row>
          <Row><div  className="movie-info">{this.state.movies.Country} | {this.state.movies.Language}</div></Row>
          <Row><div  className="movie-info">IMDb rating: {this.state.movies.imdbRating} | Metascore: {this.state.movies.Metascore}</div></Row>
          <Row><div  className="movie-director">{this.state.movies.Production?this.state.movies.Production:""}</div></Row>
          <Row><div  className="movie-info">AWARDS: {this.state.movies.Awards}</div></Row>
          <Row><div  className="movie-info">PLOT: {this.state.movies.Plot}</div></Row>
          {this.state.movie.cast?
          this.state.movie.cast.map(item=>{
            return(
              <Row key=""><div  className="movie-actor">
                <a className="movie-actor-link" rel="noopener noreferrer" target="_blank" href={'https://www.imdb.com/name/'+item.actor_id}>{item.actor}</a> as {item.character}
              </div></Row>
            )
          })
          :""}
          
          <Row><div className="movie-btn"> <Button className="movie-rl-btn"><TiPlusOutline /> watchlist</Button></div></Row>
          <Row><div className="movie-btn"> <Button className="movie-rl-btn"><TiMinusOutline /> watchlist</Button></div></Row>
        </div>
        : <Media>wait a sec bru</Media>}
      </Container>
    );
  }
}

export default Movie;
