import { API } from "./ApiService";

export enum DishState {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export interface Dish {
  dish_id: string;
  category_id: string;
  name: string;
  price: number;
  description?: string;
  associated_id?: string;
  weight?: number;
  calories?: number;
  allergens?: string[];
  tags?: string[];
  state?: DishState;
}

export interface CreateDishRequest extends Omit<Dish, 'dish_id'> {}

export interface UpdateDishRequest {
  name?: string;
  price?: number;
  description?: string;
  associated_id?: string;
  weight?: number;
  calories?: number;
  allergens?: string;
  tags?: string;
  state?: DishState;
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
  static async getDishById(id: string): Promise<Dish> {
    return API.get<null, Dish>(`/dishes/${id}`);
  }
}
