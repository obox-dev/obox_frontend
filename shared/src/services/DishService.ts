import { EntityState } from '@shared/utils/types';
import { API } from './ApiService';

export enum DishInStock {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export enum WeightUnit {
  GRAMMS = 'GR',
  MILLILITERS = 'ML',
  PIECES = 'PC',
}

export interface DishContent {
  name: string;
  description?: string;
}

export interface UpdateInStockRequest {
  in_stock: DishInStock;
  language: string;
}

export interface SetPrimaryImageRequest {
  image: string;
}

export interface DishResponse {
  dish_id: string;
  category_id: string;
  price: number;
  state: EntityState;
  language: string;
  content: Record<string, DishContent>;
  in_stock: DishInStock;
  image: string | null;
  special_price?: number;
  weight?: number;
  weight_unit?: WeightUnit;
  calories?: number;
  allergens?: string[];
  marks?: string[];
  cooking_time?: number;
}
export type Dish = Omit<DishResponse, 'content'> & DishContent;

export interface CreateDishRequest extends Omit<Dish, 'dish_id'> {}

export interface UpdateDishRequest {
  category_id?: string;
  name?: string;
  price?: number;
  special_price?: number;
  description?: string;
  weight?: number;
  weight_unit?: WeightUnit;
  calories?: number;
  allergens?: string;
  marks?: string;
  state?: EntityState;
  in_stock?: DishInStock;
  language: string;
  cooking_time?: number;
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
  static async setPrimaryImage(id: string, params: SetPrimaryImageRequest) {
    return API.post<SetPrimaryImageRequest, void>(`/dishes/${id}/set-primary-image`, params);
  }
}
