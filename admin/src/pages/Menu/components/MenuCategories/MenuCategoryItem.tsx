import { Category } from "@shared/services";
import { ActionMenu, IAction } from "@shared/components/atoms/ActionMenu"

export interface MenuCategoryItem {
  categoryItem: Category;
  actions: IAction<Category>[];
}

export const MenuCategoryItem = (props: MenuCategoryItem) => {
  const { categoryItem, actions } = props;

  return (
  <li className="d-flex justify-content-between my-2">
    {categoryItem.name}
    <ActionMenu category={categoryItem} actions={actions}/>
  </li>
  );
};
