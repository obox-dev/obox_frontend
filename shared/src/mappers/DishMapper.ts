import { Dish, DishResponse } from '@shared/services/DishService';

// TODO: Need to create mappers for menus and categories

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
