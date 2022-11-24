import axios from 'axios';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useAppSelector } from '../../redux/hooks';
import { ToppingType } from '../../redux/slices/toppingsSlice';
import {
  capFirstChar,
  convertPrice,
  pizzaNameIsValid,
  toppingsAreUniqueFromPizzaList,
} from '../../utils';

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
  const [price, setPrice] = useState('$00.00');
  const [notes, setNotes] = useState('');
  const [instructions, setInstructions] = useState('');
  const [img, setImg] = useState('');
  const [toppingsAdded, setToppingsAdded] = useState<string[]>([]);

  const { data, status } = useQuery('toppings', fetchToppings);
  const { pizzas } = useAppSelector((state) => state.pizzas);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) setToppingsAdded([...toppingsAdded, value].sort());
    if (!checked) setToppingsAdded([...toppingsAdded.filter((el) => el !== value)].sort());
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!toppingsAreUniqueFromPizzaList(toppingsAdded, pizzas, '')) {
      alert('Error: Topping combo already exists.');
      return;
    }
    if (name === '') {
      alert('Error: Invalid pizza name.');
      return;
    }
    if (!pizzaNameIsValid(capFirstChar(name), pizzas)) {
      alert(`Error: ${name} already exists.`);
      return;
    }
    try {
      const success = await axios.post('/pizza', {
        name: capFirstChar(name),
        popularity,
        calories,
        price: convertPrice(price),
        notes,
        instructions,
        img,
        toppings: JSON.stringify(toppingsAdded),
      });
      if (success) {
        refetch();
        handleClose();
      }
    } catch (error) {
      alert(`Error adding ${name}.`);
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
            <Form.Label htmlFor="topping-input">Toppings:</Form.Label>
            <Col sm={3} className="my-1">
              <Form.Group id="topping-input">
                {status === 'loading' && <p>Loading..</p>}
                {status === 'error' && <p>Error getting toppings</p>}
                {status === 'success' &&
                  data.slice(0, Math.round(data.length / 2)).map((t: ToppingType) => (
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
            <Col sm={3} className="my-1">
              <Form.Group id="topping-input">
                {status === 'loading' && <p>Loading..</p>}
                {status === 'error' && <p>Error getting toppings</p>}
                {status === 'success' &&
                  data.slice(Math.round(data.length / 2), data.length).map((t: ToppingType) => (
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
            <Col>
              <Form.Label htmlFor="popularity-input">Popularity Rating:</Form.Label>
              <Form.Select
                className="mb-3"
                size="sm"
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
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup id="price-input" className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <FloatingLabel controlId="floatingPrice" label="Price">
                  <Form.Control
                    defaultValue={price.slice(1)}
                    type="text"
                    placeholder="Price"
                    pattern="^(0|[1-9]\d*)(\.\d+)?$"
                    required
                    max="100"
                    min="0"
                    onChange={(e) => {
                      const re = /^(0|[1-9]\d*)(\.\d+)?$/;
                      if (e.target.value === '' || re.test(e.target.value)) {
                        setPrice(e.target.value);
                      }
                    }}
                    aria-label="Amount (to the nearest dollar)"
                  />
                </FloatingLabel>
              </InputGroup>
            </Col>
            <Col>
              <FloatingLabel className="mb-3" controlId="floatingCalories" label="Calories">
                <Form.Control
                  onChange={(e) => setCalories(Number(e.target.value))}
                  type="number"
                  size="sm"
                  placeholder="Calories"
                  max="10000"
                  min="0"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

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
                  onChange={(e) => setImg(e.target.value)}
                  type="image-url"
                  placeholder="Image URL"
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Control
                  disabled
                  size="sm"
                  placeholder="Upload Image"
                  type="file"
                  aria-disabled
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" form="add-pizza-form">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
