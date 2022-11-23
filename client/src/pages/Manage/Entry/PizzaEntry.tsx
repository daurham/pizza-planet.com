import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UpdatePizzaForm from '../Forms/UpdatePizzaForm';
import { PizzaType } from '../../../redux/slices/pizzasSlice';

interface Props extends PizzaType {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

export default function Entry({
  refetch,
  id,
  name,
  // createdBy,
  // staffId,
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

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={img} className="cards-img" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Price: {price}</Card.Text>
          <Card.Text>Calories: {calories}</Card.Text>
          <Card.Text>Popularity: {popularity}</Card.Text>
          <Card.Text>Instructions: {instructions}</Card.Text>
          <Card.Text>Notes: {notes}</Card.Text>
          <Card.Text>Popularity: {popularity}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Edit
          </Button>
        </Card.Body>
      </Card>

      <UpdatePizzaForm
        showModal={showModal}
        handleClose={handleClose}
        refetch={refetch}
        entry={{ name, calories, img, instructions, notes, popularity, price, toppings }}
      />
    </div>
  );
}
