import { StatCard, RecentOrder, QuickStat, NavItem } from "../types";

export const statCards: StatCard[] = [
  {
    title: "Siswa Aktif",
    value: 247,
    change: "+12% dari bulan lalu",
    changeType: "positive",
    icon: "Users",
    color: "blue",
  },
  {
    title: "Mata Pelajaran",
    value: 18,
    change: "+2 dari semester lalu",
    changeType: "positive",
    icon: "BookOpen",
    color: "green",
  },
  {
    title: "Tugas Diselesaikan",
    value: 1234,
    change: "+156 dari minggu lalu",
    changeType: "positive",
    icon: "CheckCircle",
    color: "purple",
  },
  {
    title: "Nilai Rata-rata",
    value: "85.4",
    change: "+3.2 dari semester lalu",
    changeType: "positive",
    icon: "TrendingUp",
    color: "orange",
  },
];

export const recentOrders: RecentOrder[] = [
  {
    id: "1",
    customerName: "Matematika - Ahmad Rizki",
    service: "Matematika",
    weight: 90,
    price: 85,
    status: "proses",
  },
  {
    id: "2",
    customerName: "Bahasa Indonesia - Siti Nurhaliza",
    service: "Bahasa Indonesia",
    weight: 88,
    price: 92,
    status: "selesai",
  },
  {
    id: "3",
    customerName: "IPA - Budi Santoso",
    service: "IPA",
    weight: 0,
    price: 0,
    status: "baru",
  },
];

export const quickStats: QuickStat[] = [
  {
    label: "Tingkat Kehadiran",
    value: "94%",
    icon: "Users",
    color: "emerald",
  },
  {
    label: "Tugas Tertunda",
    value: "23",
    icon: "Clock",
    color: "orange",
  },
  {
    label: "Quiz Rata-rata",
    value: "82/100",
    icon: "Target",
    color: "blue",
  },
  {
    label: "Siswa Berprestasi",
    value: "45%",
    icon: "Star",
    color: "purple",
  },
];

export const navItems: NavItem[] = [
  {
    id: "overview",
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/dashboard",
  },
  {
    id: "courses",
    label: "Mata Pelajaran",
    icon: "BookOpen",
    path: "/dashboard/courses",
  },
  {
    id: "students",
    label: "Siswa",
    icon: "Users",
    path: "/dashboard/students",
  },
  {
    id: "assignments",
    label: "Tugas & Quiz",
    icon: "FileText",
    path: "/dashboard/assignments",
  },
  {
    id: "grades",
    label: "Nilai",
    icon: "BarChart3",
    path: "/dashboard/grades",
  },
  {
    id: "reports",
    label: "Laporan",
    icon: "Settings",
    path: "/dashboard/reports",
  },
  {
    id: "settings",
    label: "Pengaturan",
    icon: "Settings",
    path: "/dashboard/settings",
  },
];

export interface EnrollmentData {
  month: string;
  students: number;
}

export const enrollmentData: EnrollmentData[] = [
  { month: "Januari", students: 180 },
  { month: "Februari", students: 195 },
  { month: "Maret", students: 210 },
  { month: "April", students: 225 },
  { month: "Mei", students: 238 },
  { month: "Juni", students: 247 },
  { month: "Juli", students: 260 },
];
