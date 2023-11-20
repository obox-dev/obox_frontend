import { EntityState } from '@shared/utils/types';
import { API } from './ApiService';

export enum DishInStock {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export interface DishContent {
  name: string;
  description?: string;
}

export interface DishResponse {
  dish_id: string;
  category_id: string;
  price: number;
  state: EntityState;
  language: string;
  content: Record<string, DishContent>;
  associated_id?: string;
  weight?: number;
  calories?: number;
  allergens?: string[];
  tags?: string[];
  in_stock?: DishInStock;
}
export type Dish = Omit<DishResponse, 'content'> & DishContent;

export interface CreateDishRequest extends Omit<Dish, 'dish_id' | 'content'> {}

export interface UpdateDishRequest {
  name?: string;
  price?: number;
  description?: string;
  associated_id?: string;
  weight?: number;
  calories?: number;
  allergens?: string;
  tags?: string;
  state?: EntityState;
  in_stock?: DishInStock;
  language: string;
}
export interface CreateDishResponse {
  dish_id: string;
}

export class DishesService {
  static async create(params: CreateDishRequest) {
    return API.post<CreateDishRequest, CreateDishResponse>('/dishes/', params);
  }
  static async update(id: string, params: UpdateDishRequest) {
    return API.patch<UpdateDishRequest, CreateDishResponse>(
      `/dishes/${id}`,
      params
    );
  }
  static async delete(id: string) {
    return API.delete<void, void>(`/dishes/${id}`);
  }
  static async getDishById(id: string): Promise<DishResponse> {
    return API.get<null, DishResponse>(`/dishes/${id}`);
  }
}
