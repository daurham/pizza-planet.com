import axios from 'axios';
import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';

type Props = {
  refresh: () => void
};

export default function AddForm({refresh}: Props) {
  const [name, setName] = useState('');
  const [popularity, setPopularity] = useState<number>(0);
  const [calories, setCalories] = useState(500);
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [instructions, setInstructions] = useState('');
  const [img, setImg] = useState(''); // TODO: Upgrade to "upload img"

  const { user } = useAppSelector(state => state.users);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('/pizza/add', {
      name,
      popularity,
      calories,
      price,
      notes,
      instructions,
      img,
      staffId: user!.id
    });
    // TODO: pass in refresh()
  };
  return (
    <div>
      <h4>Add Pizza</h4>
      <form onSubmit={(e) => submitForm(e)}>
        <input placeholder="name" type="text" onChange={(e) => setName(e.target.value)} />
        <input
          placeholder="popularity"
          type="number"
          min={0}
          max={5}
          onChange={(e) => setPopularity(Number(e.target.value))}
        />
        <input placeholder="calories" type="number" onChange={(e) => setCalories(Number(e.target.value))} />
        <input placeholder="price" type="text" onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="notes" type="text" onChange={(e) => setNotes(e.target.value)} />
        <input
          placeholder="instructions"
          type="text"
          onChange={(e) => setInstructions(e.target.value)}
        />
      </form>
    </div>
  );
}
