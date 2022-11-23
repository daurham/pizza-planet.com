import axios from 'axios';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { capFirstChar, toppingIsUniqueFromToppingList } from '../../../utils';
import { useAppSelector } from '../../../redux/hooks';

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

  const { toppings } = useAppSelector((state) => state.toppings);

  const deleteEntry = async () => {
    await axios.delete('/pizza', {
      data: {
        name: entry.name,
      },
    });
    refetch();
    handleClose();
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (toppingIsUniqueFromToppingList(capFirstChar(entry.name), toppings)) {
      alert(`Error: ${entry.name} already exists`);
    }
    try {
      const success = await axios.patch('/topping', {
        name: entry.name,
        price,
        pricingMeasurement,
        img,
      });
      if (success) {
        refetch();
        handleClose();
      }
    } catch (error) {
      alert(`Error: ${entry.name} already exists`);
    }
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {entry.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="update-topping-form" onSubmit={(e) => submitForm(e)}>
          <input
            defaultValue={entry.price}
            placeholder="price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            defaultValue={entry.pricingMeasurement}
            onChange={(e) => setPricingMeasurement(e.target.value)}
          >
            <option value="lb">lb</option>
            <option value="oz">oz</option>
            <option value="gram">gram</option>
          </select>
          <input
            defaultValue={entry.img}
            placeholder="img URL"
            type="text"
            onChange={(e) => setImg(e.target.value)}
          />
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
