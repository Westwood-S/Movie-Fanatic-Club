// body component for a user's watchlist

import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import { auth, db } from "./Firebase";
import { FiFolderMinus, FiFolderPlus } from "react-icons/fi";
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
      activeTab: "",
      removeButton: []
    };
    this.setAPIState = this.setAPIState.bind(this);
    this.setWatchList = this.setWatchList.bind(this);
  }

  setAPIState(APIs){
    this.setState({ apis: [...this.state.apis, APIs] });
  }

  setWatchList(id, index) {
    let userRef = db.collection("user").doc(auth.currentUser.email)
    let removeButtonList = this.state.removeButton
    if (removeButtonList.indexOf(index)===-1) {
      removeButtonList.push(index)
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
      var addIndex = removeButtonList.indexOf(index)
      if (addIndex > -1) {
            removeButtonList.splice(addIndex, 1)
      }
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

  async componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        let currentComponent = this;
        var docRef = db.collection("user").doc(auth.currentUser.email);
          docRef
            .get()
            .then(function(doc) {
              if (doc.exists) {
                for (let i = 0; i < doc.data().watchlist.length; i++) {
                  let name = doc.data().watchlist[i];
                  const URL = "https://www.omdbapi.com/?apikey=1e54e73e&i=" + name;
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
      }
      else {
        console.log ("cannot find user in watchlist")
      }
    })
        
    
  }

  render() {


    return (
      <div className="watchlist">
        <h2 className="section-title">Watchlist</h2>

        <div className="tabs">
          <Row>
            {this.state.apis.map((data,index) => {
              
              return (
                <Col xl="6" key={data.Title} className>
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
                        <button 
                          className="watchlist-btn" 
                          onClick={() => {
                            this.setWatchList(data.imdbID, index)
                          }}
                        >
                          {this.state.removeButton.indexOf(index)===-1?<FiFolderMinus />:<FiFolderPlus />}
                        </button>
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
