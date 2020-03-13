import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { FaImdb } from "react-icons/fa";
import { TiMediaFastForward } from "react-icons/ti";
import Icon from "react-fa";
import rp from "request-promise";
import cheerio from "cheerio";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import ComingSoon from "./comingSoon";
import { NavLink } from "react-router-dom";

class InTheater extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      apis: []
    };
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    await rp(
      "https://cors-anywhere.herokuapp.com/https://www.imdb.com/search/title/?title_type=feature&user_rating=7.5,&groups=now-playing-us&languages=en"
    )
      .then(html => {
        let apis = [];
        let $ = cheerio.load(html);

        $(".lister-item-header a").each(function() {
          let name = $(this)
            .prepend()
            .text();

          fetch(
            "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
              name,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host":
                  "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key":
                  "c3bfcbae69msh2fefac5f7da67adp1d2687jsnade70055f49b"
              }
            }
          )
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
          apis: apis,
          laoding: true
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <div className="carousel-inners">
          <h2 className="section-title">In Theater</h2>

          <Carousel
            value={this.state.value}
            onChange={this.onChange}
            arrowLeft={<Icon name="angle-double-left" />}
            arrowLeftDisabled={<Icon name="angle-left" />}
            arrowRight={<Icon name="angle-double-right" />}
            arrowRightDisabled={<Icon name="angle-right" />}
            addArrowClickHandler
            clickToChange
            autoPlay={4000}
            stopAutoPlayOnHover
            slidesPerPage={3}
            infinite
            className="carousel-item"
          >
            {this.state.apis.length === 0 ? (
              <div>i&apos;m gettin there...</div>
            ) : (
              this.state.apis.map(item => {
                return (
                  <Card key={item.title} className="card">
                    <a
                      title="traaaailer"
                      href={item.trailer.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img alt={item.title} src={item.poster} />
                    </a>
                    <CardBody>
                      <CardTitle>
                        <NavLink
                          to={{
                            pathname: "./Movie",
                            id: item.id
                          }}
                          className="card-title"
                        >
                          {item.title}
                        </NavLink>
                      </CardTitle>
                      <CardSubtitle>
                        <FaImdb />
                        {item.rating}
                      </CardSubtitle>
                      <CardSubtitle>
                        <TiMediaFastForward />
                        {item.length}
                      </CardSubtitle>
                      {/*<CardSubtitle>Director: </CardSubtitle>*/}
                      <CardText>Plot: {item.plot}</CardText>
                    </CardBody>
                  </Card>
                );
              })
            )}
          </Carousel>
        </div>
        <ComingSoon />
      </div>
    );
  }
}

export default InTheater;
