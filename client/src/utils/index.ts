import { PizzaType } from '../redux/slices/pizzasSlice';
import { ToppingType } from '../redux/slices/toppingsSlice';

export const capFirstChar = (s: string) => {
  if (s === '') return '';
  let result = s.slice(1, s.length);
  result = s[0].toLocaleUpperCase() + result;
  return result;
};

export const stringifyToppings = (tops: string[]) => JSON.stringify(tops);

export const parseToppings = (topString: string): string[] => {
  return JSON.parse(topString).map((t: string) => capFirstChar(t));
};

export const toppingsAreUnique = (list1: string[], list2: string[]) => {
  if (list1.length !== list2.length) return true;
  if (list1.length === 0 && list2.length === 0) return false;
  let isACopy = true;
  list1.forEach((top1, i) => {
    if (top1 !== list2[i]) isACopy = false;
  });
  return !isACopy;
};

export const toppingsAreUniqueFromPizzaList = (
  list: string[],
  pizzaList: PizzaType[],
  currentName: string
) => {
  if (pizzaList.length === 0 && list.length === 0) return true;
  let copyFound = false;
  pizzaList.forEach((pizza) => {
    const pizzaToppings = parseToppings(pizza.toppings);
    if (currentName !== pizza.name) {
      if (!toppingsAreUnique(list, pizzaToppings)) {
        copyFound = true;
      }
    }
  });
  return !copyFound;
};

export const toppingIsUniqueFromToppingList = (topping: string, toppingList: ToppingType[]) => {
  const topArray: string[] = [];
  toppingList.forEach((t) => {
    topArray.push(t.name);
  });
  return !topArray.includes(topping);
};

export const pizzaNameIsValid = (name: string, pizzaList: PizzaType[]) => {
  return pizzaList.filter((p) => p.name === name).length === 0;
};

export const convertPrice = (value: string) => {
  let v = value;
  if (v.slice(0, 1) === '$') v = v.slice(1);
  return Number(v).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
