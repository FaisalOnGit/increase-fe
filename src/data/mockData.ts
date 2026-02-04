import { StatCard, RecentOrder, QuickStat, NavItem, User, Role } from "../types";

export const statCards: StatCard[] = [
  {
    title: "Total Pengajuan",
    value: 125,
    change: "+23% dari bulan lalu",
    changeType: "positive",
    icon: "FileText",
    color: "blue",
  },
  {
    title: "Sedang Penilaian",
    value: 38,
    change: "+8 dari minggu lalu",
    changeType: "positive",
    icon: "Clock",
    color: "orange",
  },
  {
    title: "Disetujui",
    value: 82,
    change: "+15 dari bulan lalu",
    changeType: "positive",
    icon: "CheckCircle",
    color: "green",
  },
  {
    title: "Ditolak",
    value: 5,
    change: "-3 dari bulan lalu",
    changeType: "negative",
    icon: "Target",
    color: "red",
  },
];

export const recentOrders: RecentOrder[] = [
  {
    id: "1",
    customerName: "PKM-K - Ahmad Rizki",
    service: "Program Kreativitas Mahasiswa - Kewirausahaan",
    weight: 0,
    price: 85,
    status: "proses",
  },
  {
    id: "2",
    customerName: "PKM-PM - Siti Nurhaliza",
    service: "Program Kreativitas Mahasiswa - Pengabdian Masyarakat",
    weight: 0,
    price: 92,
    status: "selesai",
  },
  {
    id: "3",
    customerName: "PKM-T - Budi Santoso",
    service: "Program Kreativitas Mahasiswa - Teknologi",
    weight: 0,
    price: 0,
    status: "baru",
  },
  {
    id: "4",
    customerName: "PKM-KC - Andi Wijaya",
    service: "Program Kreativitas Mahasiswa - Karsa Cipta",
    weight: 0,
    price: 78,
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
    id: "beranda",
    label: "Beranda",
    icon: "LayoutDashboard",
    path: "/dashboard",
  },
  {
    id: "master",
    label: "Master",
    icon: "Database",
    children: [
      {
        id: "manajemen-pengguna",
        label: "Manajemen Pengguna",
        icon: "UserCog",
        path: "/dashboard/master/pengguna",
      },
      {
        id: "manajemen-role",
        label: "Manajemen Role",
        icon: "Shield",
        path: "/dashboard/master/role",
      },
      {
        id: "fakultas-prodi",
        label: "Fakultas dan Prodi",
        icon: "Building",
        path: "/dashboard/master/fakultas-prodi",
      },
      {
        id: "jenis-pkm",
        label: "Jenis PKM",
        icon: "Award",
        path: "/dashboard/master/jenis-pkm",
      },
      {
        id: "kalender",
        label: "Kalender",
        icon: "Calendar",
        path: "/dashboard/master/kalender",
      },
    ],
  },
  {
    id: "manajemen",
    label: "Manajemen",
    icon: "Settings",
    children: [
      {
        id: "manajemen-pembimbing",
        label: "Manajemen Pembimbing",
        icon: "UserCog",
        path: "/dashboard/manajemen/pembimbing",
      },
      {
        id: "manajemen-proposal",
        label: "Manajemen Proposal",
        icon: "FileText",
        path: "/dashboard/manajemen/proposal",
      },
      {
        id: "review-proposal",
        label: "Review Proposal",
        icon: "Eye",
        path: "/dashboard/manajemen/review",
      },
    ],
  },
  {
    id: "mahasiswa",
    label: "Mahasiswa",
    icon: "Users",
    children: [
      {
        id: "pengajuan-proposal",
        label: "Pengajuan Proposal",
        icon: "FileText",
        path: "/dashboard/mahasiswa/pengajuan-proposal",
      },
      {
        id: "rekap-mhs",
        label: "Rekap",
        icon: "BarChart3",
        path: "/dashboard/mahasiswa/rekap",
      },
    ],
  },
  {
    id: "rekap",
    label: "Rekap",
    icon: "BarChart3",
    children: [
      {
        id: "rekap-proposal",
        label: "Rekap Proposal",
        icon: "FileText",
        path: "/dashboard/rekap/proposal",
      },
      {
        id: "rekap-kip",
        label: "Rekap KIP",
        icon: "Award",
        path: "/dashboard/rekap/kip",
      },
    ],
  },
];

export interface EnrollmentData {
  month: string;
  students: number;
}

export const users: User[] = [
  {
    id: "1",
    name: "Dr. Ahmad Rizki, M.Kom",
    username: "ahmad.rizki",
    role: "Dosen",
    isReviewer: true,
    email: "ahmad.rizki@unsil.ac.id",
    phone: "08123456789",
    status: "active",
  },
  {
    id: "2",
    name: "Prof. Siti Nurhaliza, M.Sc",
    username: "siti.nurhaliza",
    role: "Dosen",
    isReviewer: true,
    email: "siti.nurhaliza@unsil.ac.id",
    phone: "08234567890",
    status: "active",
  },
  {
    id: "3",
    name: "Budi Santoso, S.Kom",
    username: "budi.santoso",
    role: "Dosen",
    isReviewer: false,
    email: "budi.santoso@unsil.ac.id",
    phone: "08345678901",
    status: "active",
  },
  {
    id: "4",
    name: "Andi Wijaya, M.T",
    username: "andi.wijaya",
    role: "Dosen",
    isReviewer: true,
    email: "andi.wijaya@unsil.ac.id",
    phone: "08456789012",
    status: "active",
  },
  {
    id: "5",
    name: "Rina Amelia, S.Pd",
    username: "rina.amelia",
    role: "Admin",
    isReviewer: false,
    email: "rina.amelia@unsil.ac.id",
    phone: "08567890123",
    status: "active",
  },
  {
    id: "6",
    name: "Dedi Kurniawan, M.Kom",
    username: "dedi.kurniawan",
    role: "Dosen",
    isReviewer: false,
    email: "dedi.kurniawan@unsil.ac.id",
    phone: "08678901234",
    status: "inactive",
  },
  {
    id: "7",
    name: "Maya Sari, S.T",
    username: "maya.sari",
    role: "Dosen",
    isReviewer: true,
    email: "maya.sari@unsil.ac.id",
    phone: "08789012345",
    status: "active",
  },
  {
    id: "8",
    name: "Reza Pratama, S.Kom",
    username: "reza.pratama",
    role: "Mahasiswa",
    isReviewer: false,
    email: "reza.pratama@students.unsil.ac.id",
    phone: "08890123456",
    status: "active",
  },
];

export const enrollmentData: EnrollmentData[] = [
  { month: "Januari", students: 180 },
  { month: "Februari", students: 195 },
  { month: "Maret", students: 210 },
  { month: "April", students: 225 },
  { month: "Mei", students: 238 },
  { month: "Juni", students: 247 },
  { month: "Juli", students: 260 },
];

export const roles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Akses penuh ke semua fitur dan pengaturan sistem",
    accessLevel: "full",
    userCount: 5,
    status: "active",
    permissions: ["manage_users", "manage_roles", "manage_proposals", "review_proposals", "system_settings", "master_data"],
  },
  {
    id: "2",
    name: "Dosen",
    description: "Dosen pembimbing dengan akses review proposal",
    accessLevel: "limited",
    userCount: 42,
    status: "active",
    permissions: ["view_proposals", "review_proposals", "manage_students", "view_reports"],
  },
  {
    id: "3",
    name: "Mahasiswa",
    description: "Mahasiswa pengusul proposal PKM",
    accessLevel: "limited",
    userCount: 85,
    status: "active",
    permissions: ["submit_proposal", "view_own_proposals", "edit_own_proposals", "view_review_results"],
  },
  {
    id: "4",
    name: "Reviewer",
    description: "Reviewer khusus untuk menilai proposal PKM",
    accessLevel: "limited",
    userCount: 12,
    status: "active",
    permissions: ["view_proposals", "review_proposals", "submit_review", "view_review_history"],
  },
  {
    id: "5",
    name: "Kaprodi",
    description: "Ketua Program Studi dengan akses approval",
    accessLevel: "limited",
    userCount: 8,
    status: "active",
    permissions: ["view_proposals", "approve_proposals", "view_reports", "manage_department_data"],
  },
  {
    id: "6",
    name: "Operator",
    description: "Operator fakultas untuk administrasi",
    accessLevel: "readonly",
    userCount: 3,
    status: "active",
    permissions: ["view_proposals", "view_reports", "export_data", "manage_announcements"],
  },
];
