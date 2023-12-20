import { DishResponse } from '@shared/services/DishService';
import { useDish } from '@admin/pages/Menu/components/MenuDish/useDish';
import { mapCategoryContent } from '@admin/pages/Menu/components/MenuCategories/mappers/mapCategoryContent';
import { ICategoryItem } from './types';
import { DishCard } from '../DishCard';
import './CategoryWithDishes.scss';

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
    <div>
      <p className="allergens-categories-dish-title">{categoryContent.name}</p>
      <div className="allergens-categories-dish-list">
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
    </div>
  );
};