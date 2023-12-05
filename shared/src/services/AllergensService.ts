import { API } from './ApiService';

export interface AllergensContent {
  name: string;
}

export type Allergens = AllergensContent & Omit<AllergensResponse, 'content'>;

export interface AllergensResponse {
  allergen_id: string;
  translation_id: string;
  content: Record<string, AllergensContent>;
}

export class AllergensService {
  static async getAllergensByRestaurantId(restaurantId : string): Promise<AllergensResponse[]> {
    return API.get<null, AllergensResponse[]>(
      `/allergens/${restaurantId}/restaurant-allergens`
    );
  }
}
