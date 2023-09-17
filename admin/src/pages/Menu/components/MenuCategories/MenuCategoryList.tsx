import { Category } from "@shared/services";
import { IAction } from "@shared/components/atoms/ActionMenu"
import { MenuCategoryItem } from "./MenuCategoryItem";


export interface MenuCategoryListProps {
  categoryItems: Category[]
  actions: IAction<Category>[];
}

export const MenuCategoryList = (props: MenuCategoryListProps) => {
  const { categoryItems, actions } = props;

  return (
    <ul className="menu-category-list p-0">
      {categoryItems.map((item: Category) => {
        return (<MenuCategoryItem actions={actions} key={item.category_id} categoryItem={item}/>)
      })}
    </ul>
  )
}
