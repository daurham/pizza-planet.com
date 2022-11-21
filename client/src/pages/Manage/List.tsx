import React from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { ToppingType } from '../../redux/slices/toppingsSlice';
import { PizzaType } from '../../redux/slices/pizzasSlice';
import PizzaEntry from './Entry/PizzaEntry';
import ToppingEntry from './Entry/ToppingEntry';
// import { useAppSelector } from '../../redux/hooks';

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
  // const { listType } = useAppSelector((state) => state.site);
  console.log('entries', entries);
  if (!entries) return <p>Loading..</p>;
  return (
    <div>
      {/* {type} */}
      {/* {JSON.stringify(entries)} */}
      {type === 'pizza' &&
        entries.map((e) => (
          <PizzaEntry
            key={e.id}
            id={e.id}
            staffId={e.staffId}
            name={e.name}
            calories={e.calories}
            createdBy={e.createdBy}
            popularity={e.popularity}
            price={e.price}
            instructions={e.instructions}
            notes={e.notes}
            img={e.img}
            refetch={refetch}
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
            supplier={e.supplier}
            supplierId={e.supplierId}
            refetch={refetch}
          />
        ))}
    </div>
  );
}
