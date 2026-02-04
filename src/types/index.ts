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