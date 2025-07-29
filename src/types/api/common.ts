// Common API response structure used across all endpoints
export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string | null;
  error_code: number;
  data: T;
}

// Common pagination structure
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta?: PaginationMeta;
}

// Common error response
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
