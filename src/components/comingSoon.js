import React, { Component } from "react";
import {
  CardText,
  CardTitle,
  CardSubtitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Row,
  Col,
  Media
} from "reactstrap";
import classnames from 'classnames';
import rp from "request-promise";
import cheerio from "cheerio";
import { NavLink } from "react-router-dom";

class ComingSoon extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      dates: [],
      activeTab: "",
      apis: []
    };

    this.handleWatchlist = this.handleWatchlist.bind(this);
  }

  async componentDidMount() {
    await rp(
      "https://cors-anywhere.herokuapp.com/https://www.imdb.com/calendar?region=US&ref_=rlm"
    )
      .then(html => {
        let dates = [],
          apis = [];
        let $ = cheerio.load(html);

        $("#main h4").each(function () {
          let date = $(this)
            .prepend()
            .text();

          dates.push(date);
        });
        this.setState({
          dates: dates
        });

        $("#main ul li a").each(function () {
          let name = $(this).attr("href");
          let link = name.match(/(?<=title\/).*?(?=\/)/gs);

          fetch("https://www.omdbapi.com/?apikey=1e54e73e&i=" + link[0])
            .then(response => {
              response.json().then(data => {
                apis.push(data);
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
        this.setState({
          apis: apis
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleWatchlist() { }

  render() {
    const toggle = tab => {
      if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    };

    var tabNames = [];

    return (
      <div>
        <h2 className="section-titles">Coming Sooooooon</h2>

        <div className="tabs">
          <Nav tabs>
            {this.state.dates.map(item => {
              const tabName =
                item.split(" ")[1].slice(0, 3) + " " + item.split(" ")[2];
              if (tabNames.includes(tabName)) return "";
              else {
                tabNames.push(tabName);
                return (
                  <NavItem key={item} className="nav-items">
                    <a
                      className={classnames({
                        active: this.state.activeTab === tabName
                      })}
                      onClick={() => {
                        toggle(tabName);
                      }}
                      href="/"
                    >
                      <button className="tab-btn">{tabName}</button>
                    </a>
                  </NavItem>
                );
              }
            })}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            {tabNames.map(item => {
              return (
                <TabPane tabId={item} key={item}>
                  <Row>
                    {this.state.apis
                      .filter(data => data.Released.slice(3, 11) === item)
                      .map(data => {
                        return (
                          <Col xl="6" key={data.Title}>
                            <Media className="media-body">
                              <Media left className="media-pic">
                                <a
                                  href={
                                    "https://www.imdb.com/title/" + data.imdbID
                                  }
                                  title="none clickbait"
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
                                    title="more info"
                                  >
                                    {data.Title}
                                  </NavLink>
                                </CardTitle>
                                <CardSubtitle className="card-subtitles">
                                  {data.Rated} | {data.Runtime} | {data.Genre} |{" "}
                                  {data.Released}
                                </CardSubtitle>
                                <CardText className="comingsoon-Card">Director: {data.Director}</CardText>
                                <CardText className="comingsoon-Card">Actors: {data.Actors}</CardText>
                                <CardText className="comingsoon-Plot">Plot: {data.Plot}</CardText>
                              </Media>
                            </Media>
                          </Col>
                        );
                      })}
                  </Row>
                </TabPane>
              );
            })}
          </TabContent>
        </div>
      </div>
    );
  }
}

export default ComingSoon;
