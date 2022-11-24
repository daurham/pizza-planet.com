import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { capFirstChar, convertPrice, toppingIsUniqueFromToppingList } from '../../../utils';
import { useAppSelector } from '../../../redux/hooks';

type Props = {
  handleClose: () => void;
  showModal: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

export default function AddForm({ refetch, handleClose, showModal }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('$0.00');
  const [pricingMeasurement, setPricingMeasurement] = useState('lb');
  const [img, setImg] = useState('');

  const { toppings } = useAppSelector((state) => state.toppings);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!toppingIsUniqueFromToppingList(capFirstChar(name), toppings)) {
      alert(`Error: ${name} already exists.`);
    }
    try {
      const success = await axios.post('/topping', {
        name: capFirstChar(name),
        price: convertPrice(price),
        pricingMeasurement,
        img,
      });
      if (success) {
        setPrice('$0.00');
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
        <Modal.Title>Add A New Topping</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="add-topping-form" onSubmit={(e) => submitForm(e)}>
          <FloatingLabel controlId="floatingToppingName" label="Topping Name">
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="ToppingName"
              placeholder="ToppingName"
              className="mb-3"
            />
          </FloatingLabel>

          <Row className="g-2">
            <Col md>
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
                      const regex = /^(0|[1-9]\d*)(\.\d+)?$/;
                      if (e.target.value === '' || regex.test(e.target.value)) {
                        setPrice(e.target.value);
                      }
                    }}
                    aria-label="Amount (to the nearest dollar)"
                    // type="number"
                    // placeholder="Price"
                    // onChange={(e) => setPrice(e.target.value)}
                    // aria-label="Amount (to the nearest dollar)"
                  />
                </FloatingLabel>
              </InputGroup>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingPricingMeasurement" label="Princing Measurement">
                <Form.Select
                  className="mb-3"
                  id="PricingMeasurement-input"
                  placeholder="Pricing Measurement"
                  defaultValue={pricingMeasurement}
                  onChange={(e) => setPricingMeasurement(e.target.value)}
                >
                  {['lb', 'oz', 'g'].map((n, i) => (
                    <option key={i} value={n}>
                      {n}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

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
        <Button form="add-topping-form" type="submit" variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
