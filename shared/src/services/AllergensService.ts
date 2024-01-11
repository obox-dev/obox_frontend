import { EntityState } from '@shared/utils/types';
import { API } from './ApiService';

export interface AllergensContent {
  name: string;
}

export interface AllergensResponse {
  allergen_id: string;
  translation_id: string;
  original_language: string;
  content: Record<string, AllergensContent>;
  state: EntityState,
}

export type Allergens = AllergensContent & Omit<AllergensResponse, 'content'>;

export interface CreateAllergenRequest {
  reference_type: string,
  reference_id: string,
  name: string;
  language: string;
}

export interface UpdateAllergensRequest {
  name: string;
  language: string;
}

export interface CreateAllergensResponse {
  allergen_id: string;
}

export class AllergensService {
  static async getAllergensByRestaurantId(restaurantId: string): Promise<AllergensResponse[]> {
    return API.get<null, AllergensResponse[]>(
      `/allergens/${restaurantId}/restaurant-allergens`
    );
  }

  static async getById(id: string): Promise<AllergensResponse> {
    return API.get<void, AllergensResponse>(`allergens/${id}`);
  }

  static async create(params: CreateAllergenRequest) {
    return API.post<CreateAllergenRequest, CreateAllergensResponse>('/allergens/', params);
  }

  static async update(id: string, params: UpdateAllergensRequest) {
    return API.patch<UpdateAllergensRequest,CreateAllergenRequest>(`/allergens/${id}`, params);
  }
  
  static async delete(id: string) {
    return API.delete<void, void>(`/allergens/${id}`);
  }
}
