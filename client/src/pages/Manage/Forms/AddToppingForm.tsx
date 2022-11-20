import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppSelector } from '../../../redux/hooks';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

type Props = {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

export default function AddForm({ refetch }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [pricingMeasurement, setPricingMeasurement] = useState('');
  const [supplier, setSupplier] = useState({}); // TODO: Consider scrapping supplier
  const [img, setImg] = useState(''); // TODO: Upgrade to "upload img"
  const [showSupplierForm, setShowSupplierForm] = useState(false);

  const [supplierName, setSupplierName] = useState('');
  const [supplierNumber, setSupplierNumber] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierId, setSupplierId] = useState<string | number>('');

  const handleClose = () => setShowSupplierForm(false);
  const handleShow = () => setShowSupplierForm(true);

  // const { user } = useAppSelector((state) => state.users);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('/topping/add', {
      name,
      price,
      pricingMeasurement,
      supplier,
      supplierId,
      img,
    });
    // TODO: pass in refresh()
  };

  const submitSupplierForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await axios.post('/supplier/add', {
      name: supplierName,
      number: supplierNumber,
      email: supplierEmail,
    });
    const res = await axios.get(`/supplier?name=${supplierName}`);
    // const id: number = res.data;
    console.log('is this an id?', res.data);
    setSupplierId(res.data); // TODO: Specifiy Supplier ID on data res
    // TODO: pass in refresh()
    refetch()
  };

  return (
    <div>
      <h4>Add Pizza</h4>
      <form onSubmit={(e) => submitForm(e)}>
        <input placeholder="name" type="text" onChange={(e) => setName(e.target.value)} />
        <input
          placeholder="pricingMeasurement"
          type="text"
          onChange={(e) => setPricingMeasurement(e.target.value)}
        />
        <input placeholder="price" type="text" onChange={(e) => setPrice(e.target.value)} />
        <input
          placeholder="supplier name"
          type="text"
          onChange={(e) => setSupplier(e.target.value)}
        />
        <Button onClick={() => setShowSupplierForm(true)}>
          New Supplier?
        </Button>
      </form>

      {/* MODAL */}
      <Modal show={showSupplierForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Topping Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Remeber to add the new Supplier before your new topping, unless its a supplier we've
            already dealt with.
          </p>
          <form>
            <input />
            <input
              placeholder="supplier name"
              type="text"
              onChange={(e) => setSupplierName(e.target.value)}
            />
            <input
              placeholder="supplier number"
              type="text"
              onChange={(e) => setSupplierNumber(e.target.value)}
            />
            <input
              placeholder="supplier email"
              type="text"
              onChange={(e) => setSupplierEmail(e.target.value)}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => submitSupplierForm(e)}>
            SubmitSupplier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
