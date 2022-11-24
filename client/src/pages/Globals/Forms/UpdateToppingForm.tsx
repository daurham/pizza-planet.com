import axios from 'axios';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { capFirstChar, toppingIsUniqueFromToppingList } from '../../../utils';
// import { useAppSelector } from '../../../redux/hooks';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { convertPrice } from '../../../utils';

type Props = {
  entry: {
    name: string;
    price: string;
    pricingMeasurement: string;
    img: string;
  };
  handleClose: () => void;
  showModal: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

export default function AddForm({ handleClose, showModal, refetch, entry }: Props) {
  const [price, setPrice] = useState(entry.price.slice(1));
  const [pricingMeasurement, setPricingMeasurement] = useState(entry.pricingMeasurement);
  const [img, setImg] = useState(entry.img); // TODO: Upgrade to "upload img"

  // const { toppings } = useAppSelector((state) => state.toppings);

  const deleteEntry = async () => {
    try {
      await axios.delete('/topping', {
        data: {
          name: entry.name,
        },
      });
      refetch();
      handleClose();
    } catch (error) {
      alert(`Error deleting ${entry.name}`);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await axios.patch('/topping', {
        name: entry.name,
        price: convertPrice(price),
        pricingMeasurement,
        img,
      });
      if (success) {
        refetch();
        handleClose();
      }
    } catch (error) {
      alert(`Error updating ${entry.name}`);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {entry.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="update-topping-form" onSubmit={(e) => submitForm(e)}>
          <Row className="g-2">
            <Col md>
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
            <Col md>
              <FloatingLabel
                controlId="floatingPricingMeasurement"
                label="Princing per measurement"
              >
                <Form.Select
                  className="mb-3"
                  id="PricingMeasurement-input"
                  placeholder="Pricing per measurement"
                  defaultValue={entry.pricingMeasurement}
                  onChange={(e) => setPricingMeasurement(e.target.value)}
                >
                  {['lb', 'oz', 'g'].map((n, i) => (
                    <option defaultValue={entry.pricingMeasurement} key={i} value={n}>
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
                  size="sm"
                  disabled
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
        <Button type="submit" variant="primary" form="update-topping-form">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
