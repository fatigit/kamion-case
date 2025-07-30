import { ApiResponse } from "./common";

// User entity for auth
export interface AuthUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  type: number;
  type_value: string;
  status: number;
  phone_verified_at: string | null;
  email_verified_at: string | null;
  created_at: number;
  updated_at: number;
}

// Login request payload
export interface LoginCredentials {
  email: string;
  password: string;
}

// Login response data structure
export interface LoginResponseData extends AuthUser {
  token: string;
}

// Complete login API response
export interface LoginApiResponse extends ApiResponse<LoginResponseData> {}

// Processed login response for Redux
export interface LoginResponse {
  user: AuthUser;
  token: string;
}
