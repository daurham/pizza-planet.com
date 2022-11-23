import { PizzaType } from '../client/src/redux/slices/pizzasSlice';
import { ToppingType } from '../client/src/redux/slices/toppingsSlice';

export interface CommonEntry {
  id: number;
  name: string;
  img?: string;
  price?: string;
}

export type EntriesT = (PizzaType[] | ToppingType[]) | (PizzaType | ToppingType)[];
