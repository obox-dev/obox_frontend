import { API } from './ApiService';
import { Dish } from './DishService';

export enum CategoryState {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}
export interface Category {
  menu_id: string;
  name: string;
  category_id: string;
  state: CategoryState;
}
export interface CreateCategoryRequest {
  menu_id: string;
  name: string;
  state: CategoryState;
}

export interface UpdateCategoryRequest {
  name: string;
  state: CategoryState;
}

export interface CreateCategoryResponse {
  category_id: string;
}

export class CategoriesService {
  static async getById(id: string): Promise<Category> {
    return API.get<void, Category>(`/categories/${id}`);
  }
  static async create(params: CreateCategoryRequest) {
    return API.post<CreateCategoryRequest, CreateCategoryResponse>('/categories/', params);
  }
  static async update(id: string, params: UpdateCategoryRequest) {
    return API.patch<UpdateCategoryRequest, CreateCategoryResponse>(`/categories/${id}`, params);
  }
  static async delete(id: string) {
    return API.delete<void, void>(`/categories/${id}`);
  }
  static async getDishesByCategoryId(categoryId: string): Promise<Dish[]> {
    return API.get<null, Dish[]>(`/categories/${categoryId}/dishes`);
  }
}


