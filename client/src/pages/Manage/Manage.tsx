import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import List from './List';
import ListHeader from './ListHeader';
import { PizzaType } from '../../redux/slices/pizzasSlice';
import { ToppingType } from '../../redux/slices/toppingsSlice';
import { useAppSelector } from '../../redux/hooks';

type EntriesT = (PizzaType[] | ToppingType[]) | (PizzaType | ToppingType)[];
// type FetchKey = { queryKey: [] }
const fetchEntries = async ({ queryKey }: any) => {
  // console.log(queryKey);
  const { type } = queryKey[1];
  // const [key, { type }] = queryKey;
  const url = type ? `/${type}` : '/pizza';
  console.log('fetchEntries: ', url);
  const res = await fetch(url); // TODO: Consider using axios to remain consistent
  return res.json();
};

export default function AdminManage() {
  // const { users } = useAppSelector(state => state)
  const type = useAppSelector((state) => state.site.listType);
  // const [type, setType] = useState('topping');
  const { data, status, refetch } = useQuery({
    queryKey: ['entryData', { type }],
    // queryKey: ['entryData', { type }],
    queryFn: fetchEntries,
    staleTime: Infinity,
  });
  if (data) console.log('fetched', type, ' data:', data);
  const [entries, setEntries] = useState<EntriesT>(data);
  const [sortedEntries, setSortedEntries] = useState<EntriesT>(data);

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
    console.log('data changed');
    if (data) {
      console.log('data updating');
      setEntries(data);
      setSortedEntries(data);
    }
  }, [data]);

  // TODO On render, populate the state resultwith entries // use reactQuery OR useEffect

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Pizza Manager</h1>

      {status === 'error' && <h1>Error</h1>}

      {status === 'loading' && <h1>Loading</h1>}
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
