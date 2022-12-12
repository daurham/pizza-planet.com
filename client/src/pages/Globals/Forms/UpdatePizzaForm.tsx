import axios from 'axios';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAppSelector } from '../../../redux/hooks';
import { convertPrice, parseToppings, toppingsAreUniqueFromPizzaList } from '../../../utils';
import { ToppingType } from '../../../redux/slices/toppingsSlice';

type Props = {
  entry: {
    name: string;
    price: string;
    popularity: number;
    calories: number;
    notes: string;
    instructions: string;
    img: string;
    toppings: string;
  };
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

export default function AddForm({ refetch, handleClose, showModal, entry }: Props) {
  const [popularity, setPopularity] = useState(entry.popularity);
  const [calories, setCalories] = useState(entry.calories);
  const [price, setPrice] = useState(entry.price);
  const [notes, setNotes] = useState(entry.notes);
  const [instructions, setInstructions] = useState(entry.instructions);
  const [img, setImg] = useState(entry.img);
  const [toppingsAdded, setToppingsAdded] = useState<string[]>(parseToppings(entry.toppings));

  const { data, status } = useQuery('toppings', fetchToppings);
  const { pizzas } = useAppSelector((state) => state.pizzas);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) setToppingsAdded([...toppingsAdded, value].sort());
    if (!checked) setToppingsAdded([...toppingsAdded.filter((el) => el !== value)].sort());
  };

  const deleteEntry = async () => {
    try {
      await axios.delete('/pizza', {
        data: {
          name: entry.name,
        },
      });
      refetch();
      handleClose();
    } catch (error) {
      alert(`Error Updating ${entry.name}`);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // IF topping not unique
    if (!toppingsAreUniqueFromPizzaList(toppingsAdded, pizzas, entry.name)) {
      alert('Topping combo already exists.');
      return;
    }
    try {
      const success = await axios.patch('/pizza', {
        name: entry.name,
        popularity,
        calories,
        price: convertPrice(price),
        notes,
        instructions,
        img: img || 'https://speedwaymedia.com/wp-content/uploads/2019/04/no-image-available.jpg',
        toppings: JSON.stringify(toppingsAdded),
      });
      if (success) {
        refetch();
        handleClose();
      }
    } catch (error) {
      alert(`Error Updating ${entry.name}`);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {entry.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="update-pizza-form" onSubmit={(e) => submitForm(e)}>
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
                        defaultChecked={parseToppings(entry.toppings).includes(t.name)}
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
                        defaultChecked={parseToppings(entry.toppings).includes(t.name)}
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
                defaultValue={entry.popularity}
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
                    defaultValue={entry.price.slice(1)}
                    type="text"
                    placeholder="Price"
                    pattern="^(0|[1-9]\d*)(\.\d+)?$"
                    required
                    max="100"
                    min="0"
                    onChange={(e) => {
                      const regex = /^(0|[1-9]\d*)(\.\d+)?$/;
                      if (e.target.value === '' || regex.test(e.target.value)) {
                        setPrice(e.target.value);
                      }
                    }}
                    aria-label="Amount (to the nearest dollar)"
                  />
                </FloatingLabel>
              </InputGroup>
            </Col>
            <Col md>
              <FloatingLabel className="mb-3" controlId="floatingCalories" label="Calories">
                <Form.Control
                  onChange={(e) => setCalories(Number(e.target.value))}
                  type="number"
                  size="sm"
                  placeholder="Calories"
                  defaultValue={entry.calories}
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
              defaultValue={entry.notes}
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
              defaultValue={entry.instructions}
              style={{ height: '150px' }}
            />
          </FloatingLabel>

          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingImgURL" label="Image URL">
                <Form.Control
                  size="sm"
                  defaultValue={entry.img}
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
        <Button variant="danger" onClick={deleteEntry}>
          Delete
        </Button>
        <Button type="submit" variant="primary" form="update-pizza-form">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
