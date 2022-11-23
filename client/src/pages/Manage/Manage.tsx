import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import List from './List';
import ListHeader from './ListHeader';
import { PizzaType, storePizzas } from '../../redux/slices/pizzasSlice';
import { ToppingType } from '../../redux/slices/toppingsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

type EntriesT = (PizzaType[] | ToppingType[]) | (PizzaType | ToppingType)[];
const fetchEntries = async ({ queryKey }: any) => {
  const { type } = queryKey[1];
  const res = await fetch(type ? `/${type}` : '/pizza'); // TODO: Consider using axios to remain consistent
  return res.json();
};

export default function AdminManage() {
  // const { user } = useAppSelector(state => state)
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.site.listType);
  const { data, status, refetch } = useQuery({
    queryKey: ['entryData', { type }],
    queryFn: fetchEntries,
    // staleTime: Infinity,
  });
  const [entries, setEntries] = useState<EntriesT>(data);
  const [sortedEntries, setSortedEntries] = useState<EntriesT>(data);
  if (data) console.log('fetched', type, ' data:', data);

  const sortEntries = (
    method: 'popular' | 'price' | 'alphabet' | 'all',
    reverse?: boolean | undefined
  ) => {
    if (method === 'popular') {
      const e = entries.sort((a, b) => {
        return 1;
      }); // TODO
      if (reverse) setSortedEntries(e.reverse());
      if (!reverse) setSortedEntries(() => e);
    }
    if (method === 'price') {
      const e = entries.sort((a, b) => {
        return 1;
      }); // TODO
      if (reverse) setSortedEntries(e.reverse());
      if (!reverse) setSortedEntries(() => e);
    }
    if (method === 'alphabet') {
      const e = entries.sort((a, b) => {
        return 1;
      }); // TODO
      if (reverse) setSortedEntries(e.reverse());
      if (!reverse) setSortedEntries(() => e);
    }
    if (method === 'all') {
      if (reverse) setSortedEntries([...entries.reverse()]);
      if (!reverse) setSortedEntries([...entries]);
    }
  };

  const filterEntries = (query: string) => {
    if (sortedEntries) {
      const result = sortedEntries.filter((e) => {
        if (e.name.includes(query)) return true;
        return false;
      });
      setSortedEntries([...result]);
    }
  };
  useEffect(() => {
    // console.log('data changed');
    if (data) {
      console.log('data updating');
      if (type === 'pizza') dispatch(storePizzas(data));
      setEntries(data);
      setSortedEntries(data);
    }
  }, [data]);

  // TODO On render, populate the state resultwith entries // use reactQuery OR useEffect

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Pizza Manager</h1>

      {status === 'error' && <h1>Error</h1>}

      {status === 'loading' && <h1>Loading..</h1>}
      {/* Adding Loading Spinner? */}
      {/* {data && JSON.stringify(data)} */}
      <br />
      {/* {sortedEntries && JSON.stringify(sortedEntries)} */}
      <ListHeader sortFn={sortEntries} filterFn={filterEntries} refetch={refetch} />

      {/* @ts-ignore: Unreachable code error */}
      {status === 'success' && <List entries={sortedEntries} type={type} refetch={refetch} />}
    </div>
  );
}
