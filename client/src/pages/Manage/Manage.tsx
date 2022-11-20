import React, { useState } from 'react'
import { useQuery } from 'react-query';
import List from './List';
import ListHeader from './ListHeader';
import { PizzaType } from '../../redux/slices/pizzasSlice';
import { ToppingType } from '../../redux/slices/toppingsSlice';
import { useAppSelector } from '../../redux/hooks';

type Props = {}

type EntriesT = (PizzaType[] | ToppingType[]) | (PizzaType | ToppingType)[]
// type EntriesT = (PizzaType[] | ToppingType[])
// type EntriesT = (PizzaType | ToppingType)[]

const fetchEntries = async (url: string) => {
  const res = await fetch(url); // TODO: Consider using axios to remain consistent
  return res.json();
};

export default function AdminManage({}: Props) {
  // const { users } = useAppSelector(state => state)
  const type = useAppSelector(state => state.site.listType);
  // const [type, setType] = useState('topping');
  const { data, status, refetch } = useQuery('entryData', () => fetchEntries(`/${type}`))
  const [entries, setEntries] = useState<EntriesT>([]);
  const [sortedEntries, setSortedEntries] = useState<EntriesT>(data);
  
  const sortEntries = (method: 'popular' | 'price' | 'alphabet' | 'all', reverse?: boolean | undefined) => {
    if (method === 'popular') {
      const e = entries.sort((a, b) => { return 1}) // TODO 
      if (reverse) setSortedEntries(e.reverse());
      if (!reverse) setSortedEntries(p => e);
    }
    if (method === 'price') {
      const e = entries.sort((a, b) => { return 1}) // TODO
      if (reverse) setSortedEntries(e.reverse());
      if (!reverse) setSortedEntries(p => e);
    }
    if (method === 'alphabet') {
      const e = entries.sort((a, b) => { return 1}) // TODO
      if (reverse) setSortedEntries(e.reverse());
      if (!reverse) setSortedEntries(p => e);
    }
    if (method === 'all') {
      if (reverse) setSortedEntries([...entries.reverse()]);
      if (!reverse) setSortedEntries([...entries]);
    }
  };

  const filterEntries = (query: string) => {
    return sortedEntries.filter((e) => {
      if (e.name.includes(query)) return true;
      return false;
    })
  };

  // TODO On render, populate the state with entries // use reactQuery OR useEffect

  return (
    <div>
      <h1>Pizza Manager</h1>
      <ListHeader sortFn={sortEntries} filterFn={filterEntries} refetch={refetch} />

      {status === 'error' && <h1>Error</h1>}
      
      {status === 'loading' && <h1>Loading</h1>} 
      {/* Adding Loading Spinner? */}
      
      {/* @ts-ignore: Unreachable code error */}
      {status === 'success' && <List entries={sortedEntries} type={type} refetch={refetch} />}
    </div>
  )
}