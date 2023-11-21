import { EntityState } from '@shared/utils/types';
import { API } from './ApiService';
import { DishResponse } from './DishService';
export interface CategoryContent {
  name: string;
  description?: string;
}
export interface CategoryResponse {
  menu_id: string;
  category_id: string;
  state: EntityState;
  content: Record<string, CategoryContent>;
}
export type Category = CategoryContent & Omit<CategoryResponse, 'content'>;
export interface CreateCategoryRequest {
  menu_id: string;
  name: string;
  state: EntityState;
  language: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  state?: EntityState;
  language: string;
  description?: string;
}

export interface CreateCategoryResponse {
  category_id: string;
}

export class CategoriesService {
  static async getById(id: string): Promise<CategoryResponse> {
    return API.get<void, CategoryResponse>(`/categories/${id}`);
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
  static async getDishesByCategoryId(categoryId: string): Promise<DishResponse[]> {
    return API.get<null, DishResponse[]>(`/categories/${categoryId}/dishes`);
  }
}


