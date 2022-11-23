import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import Modal from 'react-bootstrap/Modal';
import { capFirstChar, toppingIsUniqueFromToppingList } from '../../../utils';
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
  const [img, setImg] = useState(''); // TODO: Upgrade to "upload img"

  const { toppings } = useAppSelector((state) => state.toppings);

  // const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!toppingIsUniqueFromToppingList(capFirstChar(name), toppings)) {
      alert(`${name} already exists`);
    }
    try {
      const success = await axios.post('/topping', {
        name: capFirstChar(name),
        price,
        pricingMeasurement: pricingMeasurement.toLocaleLowerCase(),
        img,
      });
      if (success) {
        refetch();
        handleClose();
      }
    } catch (error) {
      alert(`${name} already exists`);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add A New Topping</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <form> */}
        <Form id="add-topping-form" onSubmit={(e) => submitForm(e)}>
          <input placeholder="name" type="text" onChange={(e) => setName(e.target.value)} />
          <input
            defaultValue="$0.00"
            placeholder="$0.00"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* <input
            placeholder="pricingMeasurement"
            type="text"
            onChange={(e) => setPricingMeasurement(e.target.value)}
          /> */}
          <select defaultValue="lb" onChange={(e) => setPricingMeasurement(e.target.value)}>
            <option value="lb">lb</option>
            <option value="oz">oz</option>
            <option value="gram">gram</option>
          </select>
          <input placeholder="img URL" type="text" onChange={(e) => setImg(e.target.value)} />
          {/* <Button type="submit">Submit</Button> */}
        </Form>
        {/* </form> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button type="submit" variant="primary" onClick={(e) => submitForm(e)}> */}
        <Button
          form="add-topping-form"
          type="submit"
          variant="primary"
          // onClick={(e) => submitForm(e)}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
