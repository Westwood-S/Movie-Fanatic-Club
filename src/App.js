import React, { Component } from "react";
import "./index.css";
import "@brainhubeu/react-carousel/lib/style.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Body from "./components/Body";

class App extends Component {
  constructor(props) {
    super(props);
    // initializing state.
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
