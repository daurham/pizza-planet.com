import React from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from './Carousel';

type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      <br />
      <h3 style={{ 'textAlign': 'center' }}>We Come In Piece</h3>
      <h4 style={{ 'textAlign': 'center' }}>8 to be exact..</h4>
      <Carousel />
    </div>
  );
}
