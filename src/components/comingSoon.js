import React, { Component } from 'react';
import {
  Card, CardText, 
  CardTitle, CardSubtitle,
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
  Media
} from 'reactstrap';
import { FiPlusSquare } from "react-icons/fi";
import classnames from 'classnames';
import rp from "request-promise";
import cheerio from "cheerio";

class ComingSoon extends Component {

      constructor() {
        super()
        this.state = { 
            value: 0,
            dates: [],
            activeTab: '',
            apis:[]
        };
      }

      async componentDidMount() {
        await rp("https://cors-anywhere.herokuapp.com/https://www.imdb.com/calendar?region=US&ref_=rlm")
        .then(html => {
          let dates= [], apis= [];
          let $ = cheerio.load(html);
  
          $("#main h4").each(function() {
            let date = $(this)
              .prepend()
              .text();
              
            dates.push(date);
          });
          this.setState({
            dates: dates
          })
          
          $("#main ul li a").each(function() {
            let name = $(this).attr("href");
            let link = name.match(/(?<=title\/).*?(?=\/)/gs);

            fetch("https://www.omdbapi.com/?apikey=1e54e73e&i="+link[0])
            .then(response => {
                response.json().then (data =>{
                    apis.push(data);
                })
            })
            .catch(err => {
                console.log(err);
            }); 
              
          });
          this.setState({
            apis: apis
          })
        })
        .catch(function(err) {
          console.log(err);
        });
      }

      
      render() {
        const toggle = tab => {
            if(this.state.activeTab !== tab) this.setState({activeTab: tab});
        }

        var tabNames = [];

        return (
        <div>
            <h2 className="section-title">Coming Sooooooon</h2>
           
            <div className="tabs">
                <Nav tabs>
                    {this.state.dates.map(item => {
                        const tabName = item.split(" ")[1].slice(0,3)+" "+item.split(" ")[2];
                        if (tabNames.includes(tabName)) return "";
                        
                        else {
                          tabNames.push(tabName);
                          return(<NavItem key={item} className="nav-items">
                              <NavLink
                                  className={classnames({ active: this.state.activeTab === tabName })}
                                  onClick={() => { toggle(tabName); }}
                              >
                                  {tabName}
                              </NavLink>
                          </NavItem>)
                        }
                    })}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    {tabNames.map(item => {
                        return (
                            <TabPane tabId={item} key={item}>
                                <Row>
                                {this.state.apis.filter(data => data.Released.slice(3,11)===item)
                                    .map(data => {
                                        return (<Col sm="6" key={data.Title}>
                                            <Media className="media-body">
                                                <Col sm="3">
                                                    <Media left className="media-pic" >
                                                        <a title="link" rel = "noopener noreferrer" target="_blank" className="media-pic"><img alt={data.Title} src={data.Poster}/></a>
                                                    </Media>
                                                </Col>
                                                <Card body className="cards-body">
                                                    <CardTitle>{data.Title}  <button className="watchlist-icon" /* onClick={this.handleWatchlist('1') } */><FiPlusSquare /></button></CardTitle>
                                                    <CardSubtitle>{data.Rated} | {data.Runtime} | {data.Genre} | {data.Released}</CardSubtitle>
                                                    <CardText>Director: {data.Director}</CardText>
                                                    <CardText>Actors: {data.Actors}</CardText>
                                                    <CardText>Plot: {data.Plot}</CardText>
                                                </Card>
                                            </Media>
                                    </Col>)
                                    })
                                }
                                </Row>
                            </TabPane>)
                    })}
                    
                </TabContent>
            </div>
        </div>
        );
      }
  }


  
  export default ComingSoon;