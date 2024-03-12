import { API } from './ApiService';

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  language: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface DeleteRequest {
  email: string;
}

export class AuthService {
  static async signUp(userData: SignUpRequest): Promise<void> {
    return API.post<SignUpRequest, void>(
      '/auth/register',
      userData,
    );
  }
  static async confirm(authKey: string): Promise<TokenResponse> {
    return API.get<void, TokenResponse>(
      `/auth/confirm/${authKey}`,
    );
  }
  static async delete(userData: DeleteRequest): Promise<void> {
    const { email } = userData;
    return API.delete<DeleteRequest, void>(
      `/qa/user/email=${email}`,
    );
  }
}
