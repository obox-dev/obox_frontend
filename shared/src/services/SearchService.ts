import { CategoryResponse } from './CategoriesService';
import { DishResponse } from './DishService';
import { API } from './ApiService';

export interface EntitySearchItem extends CategoryResponse { dishes: DishResponse[] }
export type EntitySearchResponse = EntitySearchItem;

export class SearchService {
  
  static async searchByMarkId(markId: string): Promise<EntitySearchResponse[]> {
    return API.get<null, EntitySearchResponse[]>(`/search/${markId}/marks`);
  }
  static async searchByAllergenId(allergenId: string): Promise<EntitySearchResponse[]> {
    return API.get<null, EntitySearchResponse[]>(`/search/${allergenId}/allergens`);
  }
}
