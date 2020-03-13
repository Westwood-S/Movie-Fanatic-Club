import React, {Component} from 'react';
import {
  Button, Container, Row, Col
} from 'reactstrap';

class Explore extends Component {

      constructor() {
        super()
        this.state = { 
            value: 0,
            apis: []
        };
      }

      render(){
        return (
            <Container>
                <Row className="btn-row">
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=biography&languages=en&sort=num_votes,desc"><Button className="btn-explore Biography">Biography</Button></a></Col>
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=documentary&genres=documentary&languages=en&sort=num_votes,desc"><Button className="btn-explore Documentary">Documentary</Button></a></Col>
                    
                </Row>
                
                <Row className="btn-row">
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=war&languages=en&sort=num_votes,desc"><Button className="btn-explore War">War</Button></a></Col>
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=film-noir&languages=en&sort=num_votes,desc"><Button className="btn-explore Film-Noir">Film-Noir</Button></a></Col>
                </Row>
                <Row className="btn-row">
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=romance&languages=en&sort=num_votes,desc"><Button className="btn-explore Romance">Romance</Button></a></Col>
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=musical&languages=en&sort=num_votes,desc"><Button className="btn-explore Musical">Musical</Button></a></Col>
                    
                </Row>
                <Row className="btn-row">
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=action&languages=en&sort=num_votes,desc"><Button className="btn-explore Action">Action</Button></a></Col>
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=crime&languages=en&sort=num_votes,desc"><Button className="btn-explore Crime">Crime</Button></a></Col>
                    
                    
                </Row>
                <Row className="btn-row">
                    
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=music&languages=en&sort=num_votes,desc"><Button className="btn-explore Music">Music</Button></a></Col>
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=animation&languages=en&sort=num_votes,desc"><Button className="btn-explore Animation">Animation</Button></a></Col>
                </Row>
                <Row className="btn-row">
                    
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=history&languages=en&sort=num_votes,desc"><Button className="btn-explore History">History</Button></a></Col>
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=adventure&languages=en&sort=num_votes,desc"><Button className="btn-explore Adventure">Adventure</Button></a></Col>
                </Row>
                <Row className="btn-row">
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=sci-fi&languages=en&sort=num_votes,desc"><Button className="btn-explore Sci-Fi">Sci-Fi</Button></a></Col>
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=drama&languages=en&sort=num_votes,desc"><Button className="btn-explore Drama">Drama</Button></a></Col>
                </Row>
                <Row className="btn-row">
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=mystery&languages=en&sort=num_votes,desc"><Button className="btn-explore Mystery">Mystery</Button></a></Col>
                    <Col lg="6" ><a rel = "noopener noreferrer" target="_blank" href="https://www.imdb.com/search/title/?title_type=feature&genres=horror&languages=en&sort=num_votes,desc"><Button className="btn-explore Horror">Horror</Button></a></Col>
                </Row>
            </Container>
          );
      }
  }


  
  export default Explore;