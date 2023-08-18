import { API } from "./ApiService";

export interface Category {
  menu_id: string;
  name: string;
  category_id: string;
}
export interface CreateCategoryRequest {
  menu_id: string;
  name: string;
}

export interface UpdateCategoryRequest {
  name: string;
}

export interface CreateCategoryResponse {
  category_id: string;
}

export class CategoriesService {
  static async create(params: CreateCategoryRequest) {
    return API.post<CreateCategoryRequest, CreateCategoryResponse>("/categories/", params);
  }
  static async patch(id: string, params: UpdateCategoryRequest) {
    return API.patch<UpdateCategoryRequest, CreateCategoryResponse>(`/categories/${id}`, params);
  }
  static async delete(id: string) {
    return API.delete<null, CreateCategoryResponse>(`/categories/${id}`);
  }
}


