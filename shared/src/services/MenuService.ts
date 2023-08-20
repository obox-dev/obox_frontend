import { API } from "./ApiService";
import { Category } from "./CategoriesService";
export interface CreateMenuRequest {
  name: string;
}
export interface CreateMenuResponse {
  menu_id: string;
}

export class MenuService {
  static async create(params: CreateMenuRequest): Promise<CreateMenuResponse> {
    return API.post<CreateMenuRequest, CreateMenuResponse>(`/menus/`, params);
  }
  static async getCategoriesByMenuId(menuId: string): Promise<Category[]> {
    return API.get<null, Category[]>(`/menus/${menuId}/categories/`);
  }
}
