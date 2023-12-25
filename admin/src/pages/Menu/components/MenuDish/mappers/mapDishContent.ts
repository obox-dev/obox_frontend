import { Dish, DishResponse } from '@shared/services/DishService';

export const mapDishContent = (
  dishItem: DishResponse,
  language: string
): Dish => {
  const { content, ...dish } = dishItem;

  return {
    ...content[language],
    ...dish,
  };
};