import { PizzaType } from '../redux/slices/pizzasSlice';
import { ToppingType } from '../redux/slices/toppingsSlice';

export const capFirstChar = (s: string) => {
  if (s === '') return '';
  let result = s.slice(1, s.length);
  result = s[0].toLocaleUpperCase() + result;
  return result;
};

export const joinToppings = (tops: string[]) => {
  return tops.sort().join(',').toLowerCase();
};

export const joinAllToppingsFromToppingType = (tops: ToppingType[]) => {
  const topArray: string[] = [];
  tops.forEach((t) => {
    topArray.push(t.name);
  });
  return topArray.sort().join(',').toLowerCase();
};

export const splitToppings = (topString: string) => {
  console.log('topString:', topString);
  const toppingList = topString.split(',');
  return toppingList.map((t) => capFirstChar(t));
};

export const toppingsAreUnique = (list1: string[], list2: string[]) => {
  let isACopy = true;
  console.log('toppingsAreUnq1:', list1);
  console.log('toppingsAreUnq2:', list2);
  if (list1.length !== list2.length) console.log('');
  if (list1.length !== list2.length) return true;
  list1.forEach((top1, i) => {
    if (top1 !== list2[i]) isACopy = false;
  });
  console.log('toppingsAreUnq 1!==2: ', String(!isACopy));
  return !isACopy;
};
// [1, 2, 3]
// [1, 5, 3]
export const toppingsAreUniqueFromPizzaType = (list1: string, list2: string) => {
  let isACopy = true;
  console.log('1', list1);
  console.log('2', list2);
  const tList1 = splitToppings(list1);
  const tList2 = splitToppings(list2);
  // If ea list is a different length, its isACopy
  if (tList1.length !== tList2.length) return true;
  tList1.forEach((top1, i) => {
    // If current topping isnt a found for every iteration
    if (top1 !== tList2[i]) isACopy = false;
  });
  return !isACopy;
};

// AddPizza
export const toppingsAreUniqueFromPizzaList = (list: string[], pizzaList: PizzaType[]) => {
  if (pizzaList.length === 0 && list.length === 0) return false;
  if (pizzaList.length === 0 || list.length === 0) return true;
  let isACopy = true;
  pizzaList.forEach((pizza) => {
    console.log('list', list);
    console.log('pizzaList', pizzaList);
    const pizzaToppings = splitToppings(pizza.toppings);
    console.log('pizzaListToppings using toppingsAreUniq', pizzaToppings);
    if (toppingsAreUnique(list, pizzaToppings)) isACopy = false;
  });
  console.log('returning:', String(!isACopy));
  return !isACopy;
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
