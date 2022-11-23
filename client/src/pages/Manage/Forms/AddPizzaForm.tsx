import axios from 'axios';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useAppSelector } from '../../../redux/hooks';
import { ToppingType } from '../../../redux/slices/toppingsSlice';
import {
  capFirstChar,
  joinToppings,
  pizzaNameIsValid,
  toppingsAreUniqueFromPizzaList,
} from '../../../utils';

type Props = {
  handleClose: () => void;
  showModal: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

const fetchToppings = async () => {
  const res = await fetch('/topping');
  return res.json();
};

export default function AddForm({ showModal, refetch, handleClose }: Props) {
  const [name, setName] = useState('');
  const [popularity, setPopularity] = useState<number>(0);
  const [calories, setCalories] = useState(500);
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [instructions, setInstructions] = useState('');
  const [img, setImg] = useState(''); // TODO: Upgrade to "upload img"
  const [toppingsAdded, setToppingsAdded] = useState<string[]>([]);
  // const [toppingString, setToppingString] = useState('');

  const { data, status } = useQuery('toppings', fetchToppings);

  const { pizzas } = useAppSelector((state) => state.pizzas);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    // Case 1 : The user checks the box
    if (checked) setToppingsAdded([...toppingsAdded, value]);
    // Case 2  : The user unchecks the box
    if (!checked) setToppingsAdded([...toppingsAdded.filter((el) => el !== value)]);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check topping and name validity
    if (!toppingsAreUniqueFromPizzaList(toppingsAdded, pizzas)) {
      // console.log('pizzas:', pizzas);
      alert('Error: Topping combo already exists.');
      return;
    }
    if (!pizzaNameIsValid(capFirstChar(name), pizzas)) {
      alert('Error: Pizza name already exists.');
      return;
    }
    try {
      const success = await axios.post('/pizza', {
        name: capFirstChar(name),
        popularity,
        calories,
        price,
        notes,
        instructions,
        img,
        toppings: joinToppings(toppingsAdded) || '',
      });
      if (success) {
        refetch();
        setToppingsAdded(() => []);
        handleClose();
      }
    } catch (error) {
      alert(`Error Adding ${name}`);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add A New Pizza</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="add-pizza-form" onSubmit={(e) => submitForm(e)}>
          <FloatingLabel controlId="floatingPizzaName" label="Pizza Name">
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="PizzaName"
              placeholder="PizzaName"
              className="mb-2"
            />
          </FloatingLabel>

          <Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Label htmlFor="topping-input">Toppings:</Form.Label>
              <Form.Group id="topping-input">
                {status === 'loading' && <p>Loading..</p>}
                {status === 'error' && <p>Error getting toppings</p>}
                {status === 'success' &&
                  data.map((t: ToppingType) => (
                    <div key={t.id} className="mb-1">
                      <Form.Check
                        label={t.name}
                        value={t.name}
                        type="checkbox"
                        onChange={(e) => handleChange(e)}
                        inline
                      />
                    </div>
                  ))}
              </Form.Group>
            </Col>
          </Row>

          <InputGroup id="price-input" className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FloatingLabel controlId="floatingPrice" label="Price">
              <Form.Control
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                aria-label="Amount (to the nearest dollar)"
              />
            </FloatingLabel>
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>

          <FloatingLabel className="mb-3" controlId="floatingCalories" label="Calories">
            <Form.Control
              onChange={(e) => setCalories(Number(e.target.value))}
              type="number"
              placeholder="Calories"
            />
          </FloatingLabel>

          <Form.Label htmlFor="popularity-input">Popularity Rating:</Form.Label>
          <Form.Select
            className="mb-3"
            id="popularity-input"
            defaultValue={0}
            onChange={(e) => setPopularity(Number(e.target.value))}
          >
            {[0, 1, 2, 3, 4, 5].map((n, i) => (
              <option key={i} value={n}>
                {n}
              </option>
            ))}
          </Form.Select>

          <FloatingLabel controlId="floatingNotes" label="Notes">
            <Form.Control
              as="textarea"
              className="mb-3"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Leave a comment here"
              style={{ height: '75px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInstructions" label="Instructions">
            <Form.Control
              as="textarea"
              className="mb-3"
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Leave baking instructions here"
              style={{ height: '150px' }}
            />
          </FloatingLabel>

          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingImgURL" label="Image URL">
                <Form.Control
                  size="sm"
                  // className="mb-3"
                  onChange={(e) => setImg(e.target.value)}
                  type="image-url"
                  placeholder="Image URL"
                />
              </FloatingLabel>
            </Col>
            <Col md>
              {/* <Form.Label>Default file input example</Form.Label> */}
              {/* <FloatingLabel controlId="floatingUploadImage" label="Upload Image"> */}
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Control
                  disabled
                  size="sm"
                  placeholder="Upload Image"
                  type="file"
                  aria-disabled
                />
              </Form.Group>
              {/* </FloatingLabel> */}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" form="add-pizza-form">
          {/* <Button type="submit" variant="primary" onClick={(e) => submitForm(e)}> */}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
