import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import UpdatePizzaForm from '../Forms/UpdatePizzaForm';
import { PizzaType } from '../../../redux/slices/pizzasSlice';

interface Props extends PizzaType {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

function StarRating(n: number) {
  return (
    <div className="star-rating">
      {[...Array(n)].map((star, i) => {
        return (
          <span key={i} className="star">
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

export default function Entry({
  refetch,
  id,
  name,
  calories,
  img,
  instructions,
  notes,
  popularity,
  price,
  toppings,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { pathname } = useLocation();
  const atHome = () => pathname === '/';
  const atManage = () => pathname === '/admin/manage';

  return (
    <div>
      {atHome() && (
        <Card className={`card-pizza-${id} home-card`} style={{ width: '30vw' }}>
          <Card.Body>
            <Card.Img
              src={img}
              alt={name}
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
            />
            <Card.Title>{name}</Card.Title>
            <Card.Text>Price: {price}</Card.Text>
            <Card.Text>Calories: {calories}</Card.Text>
            <span className="inline-span">
              <Card.Text>{'Popularity: '}</Card.Text> {StarRating(popularity)}
            </span>
          </Card.Body>
        </Card>
      )}
      {atManage() && (
        <>
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Row className="entry">
                <Col className="entry--image">
                  <Card.Img
                    src={img}
                    alt={name}
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </Col>

                <Col className="entry--details">
                  <Card.Title>{name}</Card.Title>
                  <Card.Text>Price: {price}</Card.Text>
                  <Card.Text>Calories: {calories}</Card.Text>
                  <span className="inline-span">
                    <Card.Text>{'Popularity: '}</Card.Text> {StarRating(popularity)}
                  </span>
                  <Accordion style={{ padding: '0' }}>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Baking Directions:</Accordion.Header>
                      <Accordion.Body>{instructions}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion style={{ padding: '0' }}>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Chef Notes:</Accordion.Header>
                      <Accordion.Body>{notes}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  {/* <Card.Text>Notes: {notes}</Card.Text> */}
                  <Button size="sm" variant="secondary" onClick={handleShow}>
                    Edit
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <UpdatePizzaForm
            showModal={showModal}
            handleClose={handleClose}
            refetch={refetch}
            entry={{ name, calories, img, instructions, notes, popularity, price, toppings }}
          />
        </>
      )}{' '}
    </div>
  );
}
