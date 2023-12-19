import { DishResponse } from '@shared/services/DishService';
import { ICategoryItem } from './types';
import { mapCategoryContent } from '@admin/pages/Menu/components/MenuCategories/mappers/mapCategoryContent';
import { DishCard } from '../DishCard';
import { useDish } from '@admin/pages/Menu/components/MenuDish/useDish';

export const CategoryWithDishes = (props: ICategoryItem) => {
  const { category, language } = props;
  const { dishes, menu_id} = category;
  const { menuDishesActions } = useDish({
    menuId: menu_id,
    categoryId: category.category_id!,
    language: language,
  });
  const categoryContent = mapCategoryContent(category, language);

  return (
    <div
      className="allergens-categories-dish-list">
      {categoryContent.name}
      {dishes.map((item: DishResponse) => {
        return (
          <DishCard
            actions={menuDishesActions}
            key={item.dish_id}
            dishItem={item}
            language={language}
          />
        );
      })}
    </div>
  );
};