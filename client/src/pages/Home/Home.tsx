import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../components/Loading';
import Carousel from './Carousel';
import List from './List';

const fetchPizzas = async () => {
  const res = await fetch('/pizza');
  return res.json();
};

export default function Home() {
  const { data, status, refetch } = useQuery('pizzas', fetchPizzas);
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
        {status === 'loading' && <Loading />}
        {status === 'error' && <p>Error Loading Pizzas!</p>}
        {data && <List entries={data} refetch={refetch} />}
      </div>
    </div>
  );
}
