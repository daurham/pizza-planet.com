import axios from 'axios';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppSelector } from '../../../redux/hooks';
import { joinToppings, splitToppings, toppingsAreUniqueFromPizzaList } from '../../../utils';
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
  // const [name, setName] = useState(entry.name);
  const [popularity, setPopularity] = useState(entry.popularity);
  const [calories, setCalories] = useState(entry.calories);
  const [price, setPrice] = useState(entry.price);
  const [notes, setNotes] = useState(entry.notes);
  const [instructions, setInstructions] = useState(entry.instructions);
  const [img, setImg] = useState(entry.img); // TODO: Upgrade to "upload img"
  const [toppingsAdded, setToppingsAdded] = useState<string[]>([]);

  const { data, status } = useQuery('toppings', fetchToppings);
  const { pizzas } = useAppSelector((state) => state.pizzas);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    // Case 1 : The user checks the box
    if (checked) setToppingsAdded([...toppingsAdded, value]);
    // Case 2  : The user unchecks the box
    if (!checked) setToppingsAdded([...toppingsAdded.filter((el) => el !== value)]);
  };

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
    // IF topping not unique
    if (!toppingsAreUniqueFromPizzaList(toppingsAdded, pizzas)) {
      alert('Topping combo already exists.');
      return;
    }
    try {
      const success = await axios.patch('/pizza', {
        name: entry.name,
        popularity,
        calories,
        price,
        notes,
        instructions,
        img,
        toppings: joinToppings(toppingsAdded),
      });
      if (success) {
        setToppingsAdded(() => []);
        refetch();
        handleClose();
      }
    } catch (error) {
      alert('Error Updating');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {entry.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="update-pizza-form" onSubmit={(e) => submitForm(e)}>
          <input
            placeholder="calories"
            defaultValue={entry.calories}
            type="number"
            onChange={(e) => setCalories(Number(e.target.value))}
          />
          <input
            defaultValue={entry.price}
            placeholder="price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="popularity">
            Popularity:
            <select
              id="popularity"
              defaultValue={0}
              onChange={(e) => setPopularity(Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4, 5].map((n, i) => (
                <option key={i} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <input
            defaultValue={entry.notes}
            placeholder="notes"
            type="text"
            onChange={(e) => setNotes(e.target.value)}
          />
          <input
            defaultValue={entry.instructions}
            placeholder="instructions"
            type="text"
            onChange={(e) => setInstructions(e.target.value)}
          />
          <input
            defaultValue={entry.img}
            placeholder="img URL"
            type="text"
            onChange={(e) => setImg(e.target.value)}
          />
          {JSON.stringify(splitToppings(entry.toppings))}
          {status === 'loading' && <p>Loading..</p>}
          {status === 'error' && <p>Error getting toppings</p>}
          {status === 'success' &&
            data.map((t: ToppingType) => (
              <div key={t.id} className="mb-3">
                <Form.Check
                  defaultChecked={splitToppings(entry.toppings).includes(t.name)}
                  label={t.name}
                  value={t.name}
                  type="checkbox"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
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
