// body component for loading stuff about an individual movie
// when the user clicks on it

import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // below I added a link back to the landing page, just to make our lives easier while testing
  // we'll remove it when we actually build the events page, since users won't need to go back to
  // the landing page
  render() {
    return (
      <div>
        <div>
          <p>Movie page component</p>
          <p>Can be found in src/components/Movie.js</p>
        </div>
        <div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Movie;
