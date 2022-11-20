import React from 'react';
import { PizzaType } from '../../../redux/slices/pizzasSlice';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface Props extends PizzaType {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

export default function Entry({
  refetch,
  id,
  name,
  createdBy,
  staffId,
  calories,
  img,
  instructions,
  notes,
  popularity,
  price,
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
