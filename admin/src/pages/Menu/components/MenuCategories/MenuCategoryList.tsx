import { Category } from "@shared/services";
import { MenuCategoryItem } from "./MenuCategoryItem";
import { IAction } from "@shared/components/atoms/ActionMenu"


export interface MenuCategoryListProps {
  categoryItems: Category[]
  actions: IAction<Category>[];
}

export const MenuCategoryList = (props: MenuCategoryListProps) => {
  const { categoryItems, actions } = props;

  return (
    <ul className="menu-category-list">
      {categoryItems.map((item: Category) => {
        return (<MenuCategoryItem actions={actions} key={item.category_id} categoryItem={item}/>)
      })}
    </ul>
  )
}
