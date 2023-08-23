import { API } from "./ApiService";
import { Category } from "./CategoriesService";

export enum DishState {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export interface Dish {
  dish_id: string;
  category_id: string;
  associated_id: string;
  name: string;
  description: string;
  price: 0;
  weight: 0;
  calories: 0;
  allergens: string;
  tags: string;
  image_url: string;
  state: DishState;
}

export interface CreateDishRequest {
  category_id: string;
  associated_id: string;
  name: string;
  description: string;
  price: 0;
  weight: 0;
  calories: 0;
  allergens: string;
  tags: string;
  image_url: string;
}

export interface UpdateDishRequest {
  associated_id: string;
  name: string;
  description: string;
  price: 0;
  weight: 0;
  calories: 0;
  allergens: string;
  tags: string;
  image_url: string;
}

export interface CreateDishResponse {
  dish_id: string;
}

export class DishesService {
  static async create(params: CreateDishRequest) {
    return API.post<CreateDishRequest, CreateDishResponse>("/dishes/", params);
  }
  static async update(id: string, params: UpdateDishRequest) {
    return API.patch<UpdateDishRequest, CreateDishResponse>(`/dishes/${id}`, params);
  }
  static async delete(id: string) {
    return API.delete<void, void>(`/dishes/${id}`);
  }
}
