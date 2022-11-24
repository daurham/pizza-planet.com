import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function HomeCarousel() {
  // TODO: Pass pizzas into here so I can show off the entries.
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://restaurantclicks.com/wp-content/uploads/2022/01/pizza-phoenix-arizona.jpg"
          alt="The Stuffed Nebula"
        />
        <Carousel.Caption>
          {/* <h3>The Stuffed Nebula</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.pizzahut.com/assets/w/images/homepage_deal/Sidekick_999L1T_LargeMobile_v2_541x282.jpg"
          alt="Dozens of Red Dwarfs"
        />

        <Carousel.Caption>
          {/* <h3>Dozens of Red Dwarfs</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.seriouseats.com/thmb/c9291mRIx6n1mtaxIRuypUe4mhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2017__02__20170216-detroit-style-pizza-47-1500x1125-1-233d75e6021048b3bf3cf28bd59d310b.jpg"
          alt="Space Blockade"
        />

        <Carousel.Caption>
          {/* <h3>Space Blockade</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
