import { DishResponse } from '@shared/services/DishService';

export enum DishActionTypes {
  UPDATE_STATE = 'updateState',
  CHANGE_IN_STOCK = 'changeInStock',
  EDIT = 'edit',
  DELETE = 'delete',
  TOGGLE_DISCOUNT = 'toggleDiscount',
}

export type DishActions = Record<DishActionTypes, (dish: DishResponse) => Promise<void> | void>;
