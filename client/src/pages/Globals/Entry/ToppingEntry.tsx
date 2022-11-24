import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ToppingType } from '../../../redux/slices/toppingsSlice';
import UpdateToppingForm from '../Forms/UpdateToppingForm';

interface Props extends ToppingType {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

export default function Entry({ refetch, name, id, price, pricingMeasurement, img }: Props) {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Card className={`card-topping-${id}`} style={{ width: '25rem' }}>
        <Card.Body>
          <Row className="entry">
            <Col className="entry--image">
              <Card.Img
                src={img}
                alt={name}
                style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'cover' }}
              />
            </Col>

            <Col className="entry--details">
              <Card.Title>{name}</Card.Title>
              <Card.Text>Price Per {pricingMeasurement}:</Card.Text>
              <Card.Text>{price}</Card.Text>
              <Button size="sm" variant="secondary" onClick={handleShow}>
                Edit
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <UpdateToppingForm
        showModal={showModal}
        handleClose={handleClose}
        refetch={refetch}
        entry={{ name, img, price, pricingMeasurement }}
      />
    </div>
  );
}
