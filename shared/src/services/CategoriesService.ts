import { API } from "./ApiService";

export interface CreateCategoryRequest {
  menu_id: string;
  name: string;
}

export interface CreateCategoryResponse {
  category_id: string;
}

export class CategoriesService {
  static async create(params: CreateCategoryRequest) {
    return API.post<CreateCategoryRequest, CreateCategoryResponse>("/categories/", params);
  }
}
