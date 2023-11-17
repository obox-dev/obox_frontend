import { Category, CategoryResponse } from '@shared/services';
import { IAction } from '@shared/components/atoms/ActionMenu';
import { MenuCategoryItem } from './MenuCategoryItem';

export interface MenuCategoryListProps {
  categoryItems: CategoryResponse[];
  actions: IAction<Category>[];
  currentLanguage: string;
}

export const MenuCategoryList = (props: MenuCategoryListProps) => {
  const { categoryItems, actions, currentLanguage } = props;

  const mapCategoryContent = (categoryItem: CategoryResponse): Category => {
    const { content, ...category } = categoryItem;

    return {
      ...content[currentLanguage],
      ...category,
    };
  };

  return (
    <ul className="menu-category-list">
      {categoryItems.map((item: CategoryResponse) => {
        const categoryItem = mapCategoryContent(item);
        return (
          <MenuCategoryItem
            actions={actions}
            key={item.category_id}
            categoryItem={categoryItem}
          />
        );
      })}
    </ul>
  );
};
