import axios from 'axios';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { capFirstChar, toppingIsUniqueFromToppingList } from '../../../utils';
// import { useAppSelector } from '../../../redux/hooks';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

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
  const [price, setPrice] = useState(entry.price);
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
        price: `$${price}.00`,
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
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    aria-label="Amount (to the nearest dollar)"
                  />
                </FloatingLabel>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingPricingMeasurement" label="Princing Measurement">
                <Form.Select
                  className="mb-3"
                  id="PricingMeasurement-input"
                  placeholder="Pricing Measurement"
                  defaultValue={0}
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
                  // className="mb-3"
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
                  // size="sm"
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
