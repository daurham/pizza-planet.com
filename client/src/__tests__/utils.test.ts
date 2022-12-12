import {
  capFirstChar,
  parseToppings,
  toppingsAreUnique,
  toppingsAreUniqueFromPizzaList,
} from '../utils';
import { PizzaType } from '../redux/slices/pizzasSlice';

describe('Utility Functions', () => {
  test('Capitalize the first letter in a string', () => {
    const input = 'apple';
    const expected = 'Apple';
    const output = capFirstChar(input);

    expect(expected).toBe(output);
  });

  test('parseToppings should take a string of toppings and convert it into an array', () => {
    const input = '["Cheese","Pepperoni","Pinapple"]';
    const output = parseToppings(input);
    const expected = ['Cheese', 'Pepperoni', 'Pinapple'];

    expect(output.length).toBe(3);
    expect(Array.isArray(output)).toBe(true);
    expected.forEach((topping, i) => {
      expect(topping).toBe(output[i]);
    });
  });

  test('toppingsAreUnique should return true', () => {
    const input1 = ['Cheese', 'Pepperoni'];
    const input2 = ['Queso', 'Pepper'];
    const expected = true;

    expect(toppingsAreUnique(input1, input2)).toBe(expected);
  });

  test('toppingsAreUnique should return false', () => {
    const input1 = ['Cheese', 'Pepperoni'];
    const input2 = ['Cheese', 'Pepperoni'];
    const expected = false;

    expect(toppingsAreUnique(input1, input2)).toBe(expected);
  });

  const makePizza = (id: number) => ({
    id: id,
    name: `pizzaName-${id}`,
    popularity: 3,
    price: '$20.00',
    calories: 500,
    instructions: '',
    notes: '',
    img: '',
    toppings: `["Cheese","${id}"]`,
  });

  const PizzaList = [1, 2, 3, 4, 5].map((e, i) => makePizza(i));

  test('toppingsAreUniqueFromPizzaList should return false', () => {
    const input1 = ['Cheese', '3'];
    const input2 = PizzaList;
    const expected = false;

    expect(toppingsAreUniqueFromPizzaList(input1, input2, 'pizzaName-2')).toBe(expected);
  });
});
