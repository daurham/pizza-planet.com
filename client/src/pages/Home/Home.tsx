import React from 'react';
import { useQuery } from 'react-query';
import Carousel from './Carousel';
import List from './List';

interface TestingProps {
  onDataFetch?: (data: any[]) => void;
}

export interface Props extends TestingProps {}

const fetchPizzas = async () => {
  const res = await fetch('/pizza');
  return res.json();
};

export default function Home({ onDataFetch }: Props) {
  const { data, status, refetch } = useQuery('pizzas', fetchPizzas);
  if (data) onDataFetch!(data);
  return (
    <div>
      <br />
      <h3 style={{ textAlign: 'center' }}>We Come In Piece</h3>
      <h4 style={{ textAlign: 'center' }}>8 to be exact..</h4>
      <div className="carousel-container">
        <Carousel />
      </div>
      <h1 style={{ textAlign: 'center' }}>Our Pizzas</h1>
      <div className="list-container">
        {status === 'loading' && <h2>Loading...</h2>}
        {status === 'error' && <p>Error Loading Pizzas!</p>}
        {data && <List entries={data} refetch={refetch} />}
      </div>
    </div>
  );
}

Home.defaultProps = {
  onDataFetch: (data: any[]) => data,
};
