import { API } from './ApiService';

export interface MarksContent {
  name: string;
}

export interface MarksResponse {
  marks_id: string;
  content: Record<string, MarksContent>;
}

export interface CreateMarksRequest {
  name: string;
  language: string;
}

export interface UpdateMarksRequest {
  name: string;
  language: string;
}

export interface CreateMarksResponse {
  mark_id: string;
}

export class MarksService {
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