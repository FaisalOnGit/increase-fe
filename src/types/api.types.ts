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
  nidn_npm?: string | null;
  is_verified?: boolean;
  role?: string;
  roles?: Array<{
    name: string;
    display_name: string;
  }>;
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
  sort_order?: "asc" | "desc";
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
  token: string;
  user: User;
}> {}

export interface RegisterResponse extends ApiResponse<{
  token: string;
  user: User;
}> {}

export interface UserResponse extends ApiResponse<{
  user: User;
}> {}

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

// PKM Kalender Types
export interface PKMKalender {
  id: number;
  tahun: number;
  tanggal_mulai_pengajuan: string;
  tanggal_selesai_pengajuan: string;
  tanggal_mulai_penilaian: string;
  tanggal_selesai_penilaian: string;
  tanggal_pengumuman: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePKMKalender {
  tahun: number;
  pkm_ids: number[];
  tanggal_mulai_pengajuan: string;
  tanggal_selesai_pengajuan: string;
  tanggal_mulai_penilaian: string;
  tanggal_selesai_penilaian: string;
  tanggal_pengumuman: string;
  is_active?: boolean;
}

export interface UpdatePKMKalender {
  tahun?: number;
  pkm_ids?: number[];
  tanggal_mulai_pengajuan?: string;
  tanggal_selesai_pengajuan?: string;
  tanggal_mulai_penilaian?: string;
  tanggal_selesai_penilaian?: string;
  tanggal_pengumuman?: string;
  is_active?: boolean;
}

export interface PKMKalenderListParams {
  tahun?: number;
  is_active?: boolean;
  per_page?: number;
  page?: number;
}

export interface PKMKalenderListResponse extends ApiResponse<PKMKalender[]> {
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface SinglePKMKalenderResponse extends ApiResponse<PKMKalender> {}

// Pembimbing/Proposal Types
export interface Proposal {
  id: number;
  judul: string;
  ketua: {
    id: number;
    name: string;
    email: string;
  };
  pkm: {
    id: number;
    singkatan: string;
    nama: string;
  };
  pembimbing: {
    id: number;
    name: string;
    email: string;
  };
  anggota: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  kalender: {
    id: number;
    tahun: number;
  };
  status_pembimbing: 'pending' | 'ditolak' | 'disetujui';
  status: 'pending' | 'ditolak' | 'disetujui' | 'revisi';
  nilai_akhir: number;
  file_proposal_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProposalDetail {
  informasi_usulan: {
    id: number;
    judul: string;
    jenis_pkm: {
      id: number;
      singkatan: string;
      nama: string;
    };
    tanggal: string;
    tanggal_formatted: string;
    pembimbing: {
      id: number;
      name: string;
      email: string;
    };
    status_pembimbing: 'pending' | 'ditolak' | 'disetujui';
    status: 'pending' | 'ditolak' | 'disetujui' | 'revisi';
    file_url: string;
    file_name: string;
    tim: {
      ketua: {
        id: number;
        name: string;
        email: string;
        role: string;
      };
      anggota: Array<{
        id: number;
        name: string;
        email: string;
        role: string;
      }>;
      total_anggota: number;
    };
  };
  persetujuan_pembimbing: {
    status: 'pending' | 'ditolak' | 'disetujui';
    catatan: string;
    is_approved: boolean;
    is_rejected: boolean;
    is_pending: boolean;
  };
  reviewer_penilaian: {
    has_reviewer: boolean;
    message: string;
    reviewers: Array<{
      id: number;
      name: string;
      email: string;
    }>;
    total_reviewer: number;
    penilaian_per_reviewer: any[];
    rubrik_penilaian_combined: any[];
    nilai_akhir: number;
    status_penilaian: string;
    is_approved: boolean;
    is_rejected: boolean;
  };
  kalender: {
    id: number;
    tahun: number;
    current_period: string;
  };
  catatan_penolakan: string;
  created_at: string;
  updated_at: string;
}

export interface ProposalListParams {
  status_pembimbing?: 'pending' | 'ditolak' | 'disetujui';
  status?: 'pending' | 'ditolak' | 'disetujui' | 'revisi';
  tahun?: number;
  search?: string;
  per_page?: number;
  page?: number;
}

export interface ProposalListResponse extends ApiResponse<Proposal[]> {
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface SingleProposalResponse extends ApiResponse<ProposalDetail> {}

export interface ApproveRejectData {
  catatan?: string;
}

// Rekap Proposal Types
export interface RekapProposalProdi {
  prodi_id: number;
  prodi_name: string;
  prodi_code: string;
  jumlah_proposal: number;
  jumlah_mahasiswa: number;
}

export interface RekapProposalFakultas {
  fakultas_id: number;
  fakultas_name: string;
  prodi: RekapProposalProdi[];
}

export interface RekapProposalParams {
  tahun?: number;
  fakultas_id?: number;
  prodi_id?: number;
}

export interface RekapProposalResponse extends ApiResponse<RekapProposalFakultas[]> {}

export interface RekapDetailParams {
  tahun?: number;
  fakultas_id?: number;
  prodi_id?: number;
  status?: "pending" | "ditolak" | "disetujui" | "revisi";
  per_page?: number;
  page?: number;
}

export interface RekapDetailResponse extends ApiResponse<Proposal[]> {
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
  };
}

// Dosen/Pembimbing Management Types
export interface Dosen {
  id: number;
  nama: string;
  nidn: string;
  email: string;
  prodi?: string;
  fakultas?: string;
  kuota: number;
  terpakai: number;
  status: 'available' | 'full';
}

export interface DosenListParams {
  search?: string;
  per_page?: number;
  page?: number;
}

export interface DosenListResponse extends ApiResponse<Dosen[]> {
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface UpdateDosenQuotaData {
  kuota: number;
}

export interface SingleDosenResponse extends ApiResponse<Dosen> {}

// Reviewer Management Types
export interface ReviewerProposal {
  id: number;
  judul: string;
  tahun: number;
  ketua: {
    id: number;
    name: string;
    email: string;
  };
  anggota: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  pembimbing: {
    id: number;
    name: string;
    email: string;
  };
  status: string;
  status_pembimbing: 'pending' | 'ditolak' | 'disetujui';
  status_reviewer: string;
  status_admin: string;
  catatan_admin: string;
  reviewers: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  total_reviewer: number;
  batas_max_reviewer: number;
}

export interface ReviewerListParams {
  search?: string;
  status?: string;
  tahun?: number;
  has_reviewer?: boolean;
  per_page?: number;
  page?: number;
}

export interface ReviewerListResponse extends ApiResponse<ReviewerProposal[]> {
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
  };
}

export interface AvailableReviewer {
  id: number;
  name: string;
  email: string;
}

export interface AvailableReviewerResponse extends ApiResponse<AvailableReviewer[]> {
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
  };
}

export interface SetReviewersData {
  reviewer_ids: number[];
}

export interface AdminActionData {
  catatan?: string;
}

export interface AdminActionResponse extends ApiResponse {
  data?: {};
}

// Mahasiswa Proposal Types
export interface MahasiswaProposal {
  id: number;
  judul: string;
  ketua: {
    id: number;
    name: string;
    email: string;
  };
  pkm: {
    id: number;
    singkatan: string;
    nama: string;
  };
  pembimbing: {
    id: number;
    name: string;
    email: string;
  };
  anggota: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  kalender: {
    id: number;
    tahun: number;
  };
  status_pembimbing: 'pending' | 'ditolak' | 'disetujui';
  status: 'pending' | 'ditolak' | 'disetujui' | 'revisi';
  nilai_akhir: number;
  file_proposal_url: string;
  created_at: string;
  updated_at: string;
}

export interface MahasiswaProposalListParams {
  status?: 'pending' | 'ditolak' | 'disetujui' | 'revisi';
  role?: 'ketua' | 'anggota';
  tahun?: number;
  per_page?: number;
}

export interface MahasiswaProposalListResponse extends ApiResponse<MahasiswaProposal[]> {}

export interface SingleMahasiswaProposalResponse extends ApiResponse<MahasiswaProposal> {}

export interface CreateProposalData {
  judul: string;
  pkm_id: number;
  anggota_ids: number[];
  pembimbing_id: number;
  file_proposal: File;
}

export interface UpdateProposalData {
  judul: string;
  file_proposal?: File;
}

export interface EligibilityCheck {
  has_active_kalender: boolean;
  is_pengajuan_open: boolean;
  already_ketua: boolean;
  already_anggota: boolean;
  current_period: string;
  eligible_as_ketua: boolean;
  eligible_as_anggota: boolean;
}

export interface EligibilityCheckResponse extends ApiResponse<EligibilityCheck> {
  eligible?: boolean;
  message?: string;
}

export interface AvailablePKM {
  id: number;
  singkatan: string;
  nama: string;
  batas_min_anggota: number;
  batas_max_anggota: number;
}

export interface AvailablePKMResponse extends ApiResponse<AvailablePKM[]> {
  total?: number;
}

export interface AvailableAnggota {
  id: number;
  name: string;
  email: string;
  prodi?: {
    id: number;
    name: string;
  };
}

export interface AvailableAnggotaResponse extends ApiResponse<AvailableAnggota[]> {}

export interface AvailablePembimbing {
  id: number;
  name: string;
  email: string;
  prodi?: {
    id: number;
    name: string;
  };
}

export interface AvailablePembimbingResponse extends ApiResponse<AvailablePembimbing[]> {}
