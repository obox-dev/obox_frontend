import { GetCategoriesByMenuIdResponseItem } from "@shared/services";
import { MenuCategoryItem } from "./MenuCategoryItem";
import { IAction } from "@shared/components/atoms/ActionMenu"


export interface MenuCategoryListProps {
  categoryItems: GetCategoriesByMenuIdResponseItem[]
  actions: IAction<GetCategoriesByMenuIdResponseItem>[];
}

export const MenuCategoryList = (props: MenuCategoryListProps) => {
  const { categoryItems, actions } = props;

  return (
    <ul className="menu-category-list">
      {categoryItems.map((item: GetCategoriesByMenuIdResponseItem) => {
        return (<MenuCategoryItem actions={actions} key={item.category_id} categoryItem={item}/>)
      })}
    </ul>
  )
}
