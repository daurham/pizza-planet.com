import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Button from 'react-bootstrap/Button';
import { ToppingType } from '../../../redux/slices/toppingsSlice';
import UpdateToppingForm from '../Forms/UpdateToppingForm';

interface Props extends ToppingType {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

// https://stackoverflow.com/questions/57562357/bootstrap-how-to-designate-left-right-columns
export default function Entry({
  refetch,
  name,
  id,
  price,
  pricingMeasurement,
  // supplier,
  // supplierId,
  img,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="right" src={img} /> */}
        <Card.Img variant="top" src={`${img}/100px180`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Price per {pricingMeasurement}: {price}
          </Card.Text>
          <Button variant="secondary" onClick={handleShow}>
            Edit
          </Button>
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
