import { Dish, DishResponse } from '@shared/services/DishService';

export const mapDishContent = (
  dishItem: DishResponse,
  currentLanguage: string
): Dish => {
  const { content, ...dish } = dishItem;

  return {
    ...content[currentLanguage],
    ...dish,
  };
};