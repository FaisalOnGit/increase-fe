// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

// Pagination Types
export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

// User Management Types
export interface CreateUser {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role?: string;
}

export interface UserListParams {
  page?: number;
  per_page?: number;
  search?: string;
  role?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface UserListResponse extends ApiResponse<User[]> {
  pagination?: Pagination;
}

export interface SingleUserResponse extends ApiResponse<User> {}

// Auth Types
export interface AuthResponse extends User {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginResponse extends ApiResponse<{
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  token: string;
}> {}

export interface RegisterResponse extends ApiResponse<{
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  token: string;
}> {}

export interface UserResponse extends ApiResponse<User> {}

export interface LogoutResponse extends ApiResponse {
  data?: undefined;
}

// Role Types
export interface Role {
  id: number;
  name: string;
  display_name: string;
  guard_name: string;
  users_count?: number;
}

export interface RoleListResponse extends ApiResponse<Role[]> {
  meta?: {
    total: number;
  };
}

export interface SingleRoleResponse extends ApiResponse<Role> {}

// Prodi Types
export interface Prodi {
  id: number;
  name: string;
  code: string;
  strata: string;
  fakultas_id: number | null;
  kaprodi_id: number | null;
  fakultas?: {
    id: number;
    name: string;
  };
  kaprodi?: {
    id: number;
    name: string;
    email?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface CreateProdi {
  name: string;
  code?: string;
  strata: string;
  fakultas_id: number;
  kaprodi_id?: number;
}

export interface UpdateProdi {
  name?: string;
  code?: string;
  strata?: string;
  fakultas_id?: number;
  kaprodi_id?: number;
}

export interface ProdiListParams {
  search?: string;
  fakultas_id?: number;
  strata?: string;
  per_page?: number;
  page?: number;
}

export interface ProdiListResponse extends ApiResponse<Prodi[]> {
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface SingleProdiResponse extends ApiResponse<Prodi> {}

export interface AssignKaprodiData {
  kaprodi_id: number;
}

// Faculty Types
export interface Faculty {
  id: number;
  name: string;
  prodis_count?: number;
  prodis?: Array<{
    id: number;
    name: string;
    code: string;
    strata: string;
  }>;
  created_at?: string;
  updated_at?: string;
}

export interface CreateFaculty {
  name: string;
}

export interface UpdateFaculty {
  name?: string;
  prodi_ids?: number[];
}

export interface FacultyListParams {
  search?: string;
  per_page?: number;
  page?: number;
}

export interface FacultyListResponse extends ApiResponse<Faculty[]> {
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface SingleFacultyResponse extends ApiResponse<Faculty> {}

// PKM/JenisPKM Types
export interface JenisPKM {
  id: number;
  singkatan: string;
  nama: string;
  batas_min_anggota: number;
  batas_max_anggota: number;
  batas_max_reviewer: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateJenisPKM {
  singkatan: string;
  nama: string;
  batas_min_anggota: number;
  batas_max_anggota: number;
  batas_max_reviewer: number;
  is_active?: boolean;
}

export interface UpdateJenisPKM {
  singkatan?: string;
  nama?: string;
  batas_min_anggota?: number;
  batas_max_anggota?: number;
  batas_max_reviewer?: number;
  is_active?: boolean;
}

export interface JenisPKMListParams {
  search?: string;
  is_active?: boolean;
  per_page?: number;
  page?: number;
}

export interface JenisPKMListResponse extends ApiResponse<JenisPKM[]> {
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface SingleJenisPKMResponse extends ApiResponse<JenisPKM> {}
export interface ActiveJenisPKMResponse extends ApiResponse<JenisPKM[]> {
  total?: number;
}

// Kriteria PKM Types
export interface KriteriaPKM {
  id: number;
  pkm_id: number;
  urutan: number;
  judul: string;
  kriteria: string;
  bobot: number;
  created_at: string;
  updated_at: string;
}

export interface KriteriaSummary {
  total_kriteria: number;
  total_bobot: number;
  is_complete: boolean;
}

export interface CreateKriteriaPKM {
  pkm_id: number;
  urutan: number;
  judul: string;
  kriteria: string;
  bobot: number;
}

export interface UpdateKriteriaPKM {
  urutan?: number;
  judul?: string;
  kriteria?: string;
  bobot?: number;
}

export interface DuplicateKriteriaPKM {
  target_pkm_id: number;
  overwrite?: boolean;
}

export interface ReorderKriteriaPKM {
  orders: Array<{
    id: number;
    urutan: number;
  }>;
}

export interface KriteriaPKMListResponse extends ApiResponse<KriteriaPKM[]> {
  summary?: KriteriaSummary;
}

export interface SingleKriteriaPKMResponse extends ApiResponse<KriteriaPKM> {}
