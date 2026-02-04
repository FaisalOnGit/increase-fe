export interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
  color: string;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  service: string;
  weight: number; // ini bisa diubah jadi attendance atau progress
  price: number; // ini bisa diubah jadi grade atau score
  status: 'proses' | 'selesai' | 'baru';
}

// Tipe data baru untuk LMS
export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  teacher: string;
  students: number;
  schedule: string;
  status: 'active' | 'inactive';
}

export interface Student {
  id: string;
  name: string;
  nis: string;
  email: string;
  grade: string;
  class: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  type: 'assignment' | 'quiz' | 'exam';
  status: 'draft' | 'published' | 'closed';
  submissions: number;
  maxScore: number;
}

export interface QuickStat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  isActive?: boolean;
  children?: NavItem[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: string;
  isReviewer: boolean;
  email?: string;
  phone?: string;
  status?: 'active' | 'inactive';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  accessLevel: 'full' | 'limited' | 'readonly';
  userCount: number;
  status: 'active' | 'inactive';
  permissions: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: 'active' | 'inactive';
}

// Master Data Types
export interface Dosen {
  id: string;
  nip: string;
  nama: string;
  email: string;
  telepon: string;
  prodi: string;
  fakultas: string;
  isReviewer: boolean;
  isPembimbing: boolean;
  jumlahBimbingan: number;
  status: 'active' | 'inactive';
}

export interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  email: string;
  telepon: string;
  prodi: string;
  fakultas: string;
  angkatan: number;
  status: 'active' | 'inactive' | 'lulus';
}

export interface Prodi {
  id: string;
  kode: string;
  nama: string;
  fakultas: string;
  jenjang: 'D3' | 'D4' | 'S1' | 'S2' | 'S3';
  akreditasi: 'A' | 'B' | 'C' | 'Unggul';
  kaprodi: string;
  jumlahMahasiswa: number;
  jumlahDosen: number;
  status: 'active' | 'inactive';
}

export interface Fakultas {
  id: string;
  kode: string;
  nama: string;
  dekan: string;
  jumlahProdi: number;
  jumlahMahasiswa: number;
  jumlahDosen: number;
  status: 'active' | 'inactive';
}

export interface JenisPKM {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string;
  singkatan: string;
  kuota: number;
  jumlahPendaftar: number;
  status: 'active' | 'inactive';
}

export interface Periode {
  id: string;
  nama: string;
  tahun: number;
  semester: 'Ganjil' | 'Genap';
  tanggalMulai: string;
  tanggalSelesai: string;
  status: 'draft' | 'buka' | 'tutup' | 'selesai';
  jumlahProposal: number;
}