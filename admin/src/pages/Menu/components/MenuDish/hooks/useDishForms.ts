import {
  CreateDishRequest,
  Dish,
  DishInStock,
  DishResponse,
  DishState,
} from '@shared/services/DishService';
import { useDishFormValidation } from '../validation/useDishFormValidation';
import { mapDishContent } from '@shared/mappers/DishMapper';


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
  in_stock: dish.in_stock,
  language: dish.language,
});

export const useDishForms = (categoryId: string, currentLanguage: string) => {
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
    in_stock: DishInStock.ENABLED,
    language: currentLanguage,
  };

  const getDefaultValues = (dish?: DishResponse): DishDefaultValues => {
    if (dish) {
      const dishItem = mapDishContent(dish, currentLanguage);
      return mapDishToDefaultValues(dishItem);
    }
    return createDishDefaultValues;
  };

  return {
    getDefaultValues,
    createDishSchema,
    createDishDefaultValues,
  };
};
