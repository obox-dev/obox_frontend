import { API } from "./ApiService";
import { Category } from "./CategoriesService";
export interface CreateMenuRequest {
  name: string;
  language_code: string;
  restaurant_id: string;
}
export interface CreateMenuResponse {
  menu_id: string;
}

export interface UpdateMenuRequest {
  name: string;
}

export class MenuService {
  static async create(params: CreateMenuRequest): Promise<CreateMenuResponse> {
    return API.post<CreateMenuRequest, CreateMenuResponse>(`/menus/`, params);
  }

  static async update(id: string, params: UpdateMenuRequest): Promise<void> {
    return API.patch<UpdateMenuRequest, void>(`/menus/${id}`, params);
  }

  static async delete(id: string): Promise<void> {
    return API.delete<void, void>(`/menus/${id}`);
  }

  static async getCategoriesByMenuId(menuId: string): Promise<Category[]> {
    return API.get<null, Category[]>(`/menus/${menuId}/categories/`);
  }
}
