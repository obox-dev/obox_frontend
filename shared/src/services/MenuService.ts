import { API } from "./ApiService";

export interface GetCategoriesByMenuIdResponseItem {
  category_id: string,
  name: string,
  menu_id: string
}

export class MenuService {
  static async getCategoriesByMenuId(menuId: string) {
    return API.get<null, GetCategoriesByMenuIdResponseItem[]>(`/menus/${menuId}/categories/`);
  }
}
