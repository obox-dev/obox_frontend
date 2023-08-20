import { Category } from "@shared/services";
import { ActionMenu, IAction } from "@shared/components/atoms/ActionMenu"

export interface MenuCategoryItem {
  categoryItem: Category;
  actions: IAction<Category>[];
}

export const MenuCategoryItem = (props: MenuCategoryItem) => {
  const { categoryItem, actions } = props;

  return (
  <li className="d-flex justify-content-between align-items-center my-2">
    {categoryItem.name}
    <ActionMenu entity={categoryItem} actions={actions}/>
  </li>
  );
};
