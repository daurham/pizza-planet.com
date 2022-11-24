import React from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { ToppingType } from '../../redux/slices/toppingsSlice';
import { PizzaType } from '../../redux/slices/pizzasSlice';
import PizzaEntry from '../Globals/Entry/PizzaEntry';
import ToppingEntry from '../Globals/Entry/ToppingEntry';

interface ToppingProps {
  type: 'topping';
  entries: ToppingType[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

interface PizzaProps {
  type: 'pizza';
  entries: PizzaType[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

type Props = PizzaProps | ToppingProps;

export default function List({ entries, type, refetch }: Props) {
  if (!entries) return <p>Loading..</p>;
  return (
    <div className="list">
      {type === 'pizza' &&
        entries.map((e) => (
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
      {type === 'topping' &&
        entries.map((e) => (
          <ToppingEntry
            key={e.id}
            id={e.id}
            name={e.name}
            price={e.price}
            img={e.img}
            pricingMeasurement={e.pricingMeasurement}
            refetch={refetch}
          />
        ))}
    </div>
  );
}
