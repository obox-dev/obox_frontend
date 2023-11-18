import { EntityState } from '@shared/utils/types';
import { API } from './ApiService';
import { CategoryResponse } from './CategoriesService';
import { MenuResponse } from './RestaurantsService';
export interface CreateMenuRequest {
  name: string;
  language: string;
  restaurant_id: string;
  state: EntityState;
}
export interface CreateMenuResponse {
  menu_id: string;
}

export interface UpdateMenuRequest {
  name?: string;
  state?: EntityState;
  language: string;
}

export class MenuService {
  static async getById(id: string): Promise<MenuResponse> {
    return API.get<void, MenuResponse>(`/menus/${id}`);
  }

  static async create(params: CreateMenuRequest): Promise<CreateMenuResponse> {
    return API.post<CreateMenuRequest, CreateMenuResponse>('/menus/', params);
  }

  static async update(id: string, params: UpdateMenuRequest): Promise<void> {
    return API.patch<UpdateMenuRequest, void>(`/menus/${id}`, params);
  }

  static async delete(id: string): Promise<void> {
    return API.delete<void, void>(`/menus/${id}`);
  }

  static async getCategoriesByMenuId(menuId: string): Promise<CategoryResponse[]> {
    return API.get<null, CategoryResponse[]>(`/menus/${menuId}/categories/`);
  }
}
