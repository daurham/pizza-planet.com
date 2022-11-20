import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToppingType } from '../../../redux/slices/toppingsSlice';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

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
  priceMeasurement,
  supplier,
  supplierId,
  img,
}: Props) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`${img}/100px180`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </Card.Text>
          <Button variant="primary">Edit</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
