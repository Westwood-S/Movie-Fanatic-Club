import React, {useState} from 'react';
import {
  Row,
  Card, CardBody,
  CardTitle, CardSubtitle, 
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import { FaImdb } from "react-icons/fa";

const items = [
  {
    src:'https://m.media-amazon.com/images/M/MV5BMTFiNDlmOTMtZGM5MC00OWQzLWE4YmYtZDBlY2NiZDMyNGNlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,677,1000_AL_.jpg',
    title: 'Invisible Life',
    imdbscore: 8.1,
    director: 'Karim Aïnouz',
    trailer: 'https://imdb-video.media-imdb.com/vi3375480601/1434659607842-pgv4ql-1574793627864.mp4?Expires=1582178077&Signature=LTql2kVa4BfXsCTf~g91nER0FOuPJMy~sKyIsAGuz-XLb8Y2gDQ8A83scX97HMGQytODeD0269Erj5UtwEmwsVFoj~ZQOUd0c6Ys5dLIswBnj-IlCqLKRLKOTCCWEjtZPiYfoMC~1ZRvKpPt46Ml4dxB6jf6mYNnbL5C5o-8OfB2jiZyPtAk6qDlrrJ5aps9tXu61H6QR4gLy9qUH~KojkMlKaO1-SCsrY7VPJTBtI6PxSXfzq49iIn7YA3m07mz9DZ3eBpun234qbzsu1U3qV2s16l~J97rpiwyflsW5ILhkkPrc6dk6AGdbBR5YEfUQcBFutTgTjNKCaHXdH05Kw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
    intro: 'Two sisters born in Rio de Janeiro make their way through life, each mistakenly believing the other is living out her dreams half a world away.'
  },
  {
    src:'https://m.media-amazon.com/images/M/MV5BZDhkMjUyYjItYWVkYi00YTM5LWE4MGEtY2FlMjA3OThlYmZhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,640,1000_AL_.jpg',
    title: 'Uncut Gem',
    imdbscore: 7.7,
    director: 'Benny Safdie, Josh Safdie',
    trailer: 'https://imdb-video.media-imdb.com/vi2668412697/1434659607842-pgv4ql-1578068245276.mp4?Expires=1582179285&Signature=udoYgAqWXUZiR3mH~ALKegd-sw8idlTskGsiWX35n3OdFbdXC6uWrO6-WW1Duuwudc-g81ZjP6Blgos3NcMvKBjCuYsAz54sgX3OHeOny9NarVqBChXhJRw393lTsWFfAV9I0Wv5XXpVveMBrwg6HLWo1cQ3YyiZabZd-WOnF83lslbx9eM3KBsxNjFnb-3nmGxMsoiR9WduBl2m0Tq3hZ92T8FPmD6Xa8XbZjCMNOhx3BRfncozaLARfFRGy2f2G5G7VzB3qezNs23MiDNLRnlE6Y0EanH9UrvbIdjkqWtbdhcS3RS75sOQ0elktdf34SBYqBBx83QeDT0~onwcAA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
    intro: 'A charismatic New York City jeweler always on the lookout for the next big score makes a series of high-stakes bets that could lead to the windfall of a lifetime. Howard must perform a precarious high-wire act, balancing business, family, and encroaching adversaries on all sides in his relentless pursuit of the ultimate win.'
  }
];


const Carousels = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className="carousel-item"
      >
        <h2 className="section-title"><a href="/">In Theater</a></h2>
        <a href={item.trailer} title="traaailer" className="card-img" rel="noopener noreferrer" target="_blank"><img src={item.src} alt={item.title} /></a>
        <Card>
          <CardBody>
            <CardTitle className="card-title">{item.title}</CardTitle>
            <CardSubtitle><FaImdb />{item.imdbscore}</CardSubtitle>
            <CardSubtitle>Director: {item.director}</CardSubtitle>
            {/*<CardText>{item.intro}</CardText>
            <Button>Button</Button>*/}
          </CardBody>
        </Card>
      </CarouselItem>

    );
  });

  return (
    <Row>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className="carousel-inners"
        interval="1000000"
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </Row>
  );
}

export default Carousels;