import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import List from './List';
import ListHeader from './ListHeader';
import { storePizzas } from '../../redux/slices/pizzasSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { EntriesT } from '../../../../@types';

const fetchEntries = async ({ queryKey }: any) => {
  const { type } = queryKey[1];
  const res = await fetch(type ? `/${type}` : '/pizza');
  return res.json();
};

export default function AdminManage() {
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.site.listType);
  const { data, status, refetch } = useQuery({
    queryKey: ['entryData', { type }],
    queryFn: fetchEntries,
  });
  const [entries, setEntries] = useState<EntriesT>(data);
  const [sortedEntries, setSortedEntries] = useState<EntriesT>(data);
  console.log('type / data:', type, data);
  const sortEntries = (method: 'popular' | 'price' | 'alphabet', reverse?: boolean) => {
    if (method === 'popular') {
      const e = [...entries];
      setEntries(() =>
        e.sort((a, b) => {
          /* @ts-ignore: Unreachable code error */
          if (reverse) return a.popularity - b.popularity;
          /* @ts-ignore: Unreachable code error */
          if (!reverse) return b.popularity - a.popularity;
          return 1;
        })
      );
    }
    if (method === 'price') {
      const e = [...entries];
      setEntries(() =>
        e.sort((a, b) => {
          if (!reverse) return a.price.toLowerCase().localeCompare(b.price.toLowerCase());
          if (reverse) return b.price.toLowerCase().localeCompare(a.price.toLowerCase());
          return 1;
        })
      );
    }
    if (method === 'alphabet') {
      const e = [...entries];
      setEntries(() =>
        e.sort((a, b) => {
          if (!reverse) return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
          if (reverse) return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
          return 1;
        })
      );
    }
  };

  const filterEntries = (query: string) => {
    if (entries) {
      const result = entries.filter((e) => {
        if (e.name.toLowerCase().includes(query.toLowerCase())) return true;
        return false;
      });
      setSortedEntries([...result]);
    }
  };

  useEffect(() => {
    if (data) {
      if (type === 'pizza') dispatch(storePizzas(data));
      setEntries(data);
      setSortedEntries(data);
    }
  }, [data]);

  useEffect(() => {
    setSortedEntries(entries);
  }, [entries]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Pizza Manager</h1>

      {status === 'error' && <h1>Error</h1>}

      {status === 'loading' && <h1>Loading..</h1>}

      <br />

      <ListHeader
        sortFn={sortEntries}
        filterFn={filterEntries}
        refetch={refetch}
        dumpEntries={setSortedEntries}
      />

      {/* @ts-ignore: Unreachable code error */}
      {status === 'success' && <List entries={sortedEntries} type={type} refetch={refetch} />}
    </div>
  );
}
