import React from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { PizzaType } from '../../redux/slices/pizzasSlice';
import PizzaEntry from '../Globals/Entry/PizzaEntry';

interface PizzaProps {
  entries: PizzaType[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

type Props = PizzaProps;

export default function List({ entries, refetch }: Props) {
  const sortEntriesByPopularity = () => {
    const e = [...entries];
    return e.sort((a, b) => b.popularity - a.popularity);
  };
  if (!entries) return <p>Loading..</p>;
  return (
    <div className="list">
      {entries &&
        sortEntriesByPopularity().map((e) => (
          <PizzaEntry
            key={e.id}
            id={e.id}
            name={e.name}
            calories={e.calories}
            popularity={e.popularity}
            price={e.price}
            instructions={e.instructions}
            notes={e.notes}
            img={e.img}
            refetch={refetch}
            toppings={e.toppings}
          />
        ))}
    </div>
  );
}
