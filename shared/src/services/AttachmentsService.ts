import { API } from "./ApiService";

export enum AttachmentReferenceType {
  DISH = "DISH"
}

export interface Attachment {
  attachment: string,
  reference_type: AttachmentReferenceType,
  reference_id: string,
}

export interface CreateAttachmentRequest extends Attachment {}

export interface CreateAttachmentResponse {
  attachment_url: string;
}

export class AttachmentService {
  static async create(params: CreateAttachmentRequest) {
    return API.post<CreateAttachmentRequest, CreateAttachmentResponse>("/attachments/", params);
  }
  static async delete(id: string) {
    return API.delete<void, void>(`/attachments/${id}`);
  }
  static async getAttachmentById(id: string): Promise<Attachment> {
    return API.get<null, Attachment>(`/attachments/${id}`);
  }
  static async getAllAttachments(reference_id: string): Promise<Attachment> {
    return API.get<null, Attachment>(`/attachments/${reference_id}/attachments`);
  }
}
