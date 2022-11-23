import { PizzaType } from '../redux/slices/pizzasSlice';
import { ToppingType } from '../redux/slices/toppingsSlice';

export const capFirstChar = (s: string) => {
  if (s === '') return '';
  let result = s.slice(1, s.length);
  result = s[0].toLocaleUpperCase() + result;
  return result;
};

// export const joinToppings = (tops: string[]) => {
//   return tops.sort().join(',').toLowerCase();
// };
export const stringifyToppings = (tops: string[]) => {
  // return tops.sort().join(',').toLowerCase();
  return JSON.stringify(tops);
};

// export const joinAllToppingsFromToppingType = (tops: ToppingType[]) => {
//   const topArray: string[] = [];
//   tops.forEach((t) => {
//     topArray.push(t.name);
//   });
//   return topArray.sort().join(',').toLowerCase();
// };
// export const splitToppings = (topString: string) => {
//   console.log('topString:', topString);
//   const toppingList = topString.split(',');
//   return toppingList.map((t) => capFirstChar(t));
// };

export const parseToppings = (topString: string): string[] => {
  // console.log('topString:', topString);
  // const toppingList = topString.split(',');
  return JSON.parse(topString).map((t: string) => capFirstChar(t));
};

export const toppingsAreUnique = (list1: string[], list2: string[]) => {
  if (list1.length !== list2.length) return true;
  if (list1.length === 0 && list2.length === 0) return false;
  let isACopy = true;
  list1.forEach((top1, i) => {
    if (top1 !== list2[i]) isACopy = false;
  });
  // console.log('toppingsAreUnq 1!==2: ', String(!isACopy));
  // console.log('toppings Are Unq:', String(!isACopy), list1, list2);
  // console.log('Is A Copy: ', String(isACopy));
  return !isACopy;
};
// [1, 2, 3]
// [1, 5, 3]

// AddPizza
export const toppingsAreUniqueFromPizzaList = (
  list: string[],
  pizzaList: PizzaType[],
  currentName: string
) => {
  if (pizzaList.length === 0 && list.length === 0) return true;
  // if (pizzaList.length === 0 || list.length === 0) return true;
  let copyFound = false;
  pizzaList.forEach((pizza) => {
    // console.log('list', list);
    // console.log('pizzaList', pizzaList);
    const pizzaToppings = parseToppings(pizza.toppings);
    if (currentName !== pizza.name) {
      // console.log('comparing', pizza.name, list, pizzaToppings);
      if (!toppingsAreUnique(list, pizzaToppings)) {
        // console.log('Topings ARE  unique:', list, pizzaToppings);
        copyFound = true;
        // console.log('Toppings are unique appaently:', String(copyFound));
      }
    }
  });
  // console.log(
  //   'Is a copy =',
  //   String(copyFound),
  //   'Toppings Are Unique:',
  //   String(!copyFound),
  //   list,
  //   pizzaList
  // );
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
