import {
  CreateDishRequest,
  Dish,
  DishState,
} from '@shared/services/DishService';
import { useDishFormValidation } from '../validation/useDishFormValidation';

type ExcludeKeys = 'price' | 'weight' | 'calories';
type ExcludedAsOptionalString = Record<ExcludeKeys, string | null>;
export type DishDefaultValues = Omit<CreateDishRequest, ExcludeKeys> &
  ExcludedAsOptionalString;

const mapDishToDefaultValues = (dish: Dish): DishDefaultValues => ({
  category_id: dish.category_id,
  name: dish.name,
  description: dish.description || '',
  price: dish.price.toString() || '',
  weight: dish.weight?.toString() || '',
  calories: dish.calories?.toString() || '',
  allergens: dish.allergens,
  tags: dish.tags,
  state: dish.state,
});

export const useDishForms = (categoryId: string) => {
  const { createDishSchema } = useDishFormValidation();

  const createDishDefaultValues: DishDefaultValues = {
    category_id: categoryId,
    name: '',
    description: '',
    price: '',
    weight: '',
    calories: '',
    allergens: [],
    tags: [],
    state: DishState.ENABLED,
  };

  const getDefaultValues = (dish?: Dish): DishDefaultValues => {
    if (dish) {
      return mapDishToDefaultValues(dish);
    }
    return createDishDefaultValues;
  };

  return {
    getDefaultValues,
    createDishSchema,
    createDishDefaultValues,
  };
};
