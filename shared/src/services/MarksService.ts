import { EntityState } from '@shared/utils/types';
import { API } from './ApiService';

export interface MarksContent {
  name: string;
}

export interface MarksResponse {
  mark_id: string;
  translation_id: string;
  color_background: string;
  color_text: string;
  emoji: string;
  content: Record<string, MarksContent>;
  state: EntityState,
}

export type Marks = MarksContent & Omit<MarksResponse, 'content'>;

export interface CreateMarksRequest {
  reference_type: string,
  reference_id: string,
  name: string;
  language: string;
  color_background: string;
  color_text: string;
  // emoji: string;
}

export interface UpdateMarksRequest {
  name: string;
  // emoji: string;
  color_background: string;
  color_text: string;
  language: string;
}

export interface CreateMarksResponse {
  mark_id: string;
}

export class MarksService {
  static async getMarksByRestaurantId(restaurantId: string): Promise<MarksResponse[]> {
    return API.get<void, MarksResponse[]>(
      `/marks/${restaurantId}/restaurant-marks`
    );
  }

  static async getById(id: string): Promise<MarksResponse> {
    return API.get<void, MarksResponse>(`marks/${id}`);
  }

  static async create(params: CreateMarksRequest) {
    return API.post<CreateMarksRequest, CreateMarksResponse>('/marks/', params);
  }

  static async update(id: string, params: UpdateMarksRequest) {
    return API.patch<UpdateMarksRequest,CreateMarksRequest>(`/marks/${id}`, params);
  }
  
  static async delete(id: string) {
    return API.delete<void, void>(`/marks/${id}`);
  }
}
