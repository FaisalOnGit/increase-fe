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
        id: "master-dosen",
        label: "Master Dosen",
        icon: "GraduationCap",
        path: "/dashboard/master/dosen",
      },
      {
        id: "master-mahasiswa",
        label: "Master Mahasiswa",
        icon: "Users",
        path: "/dashboard/master/mahasiswa",
      },
      {
        id: "master-prodi",
        label: "Master Prodi",
        icon: "BookOpen",
        path: "/dashboard/master/prodi",
      },
      {
        id: "master-fakultas",
        label: "Master Fakultas",
        icon: "Building",
        path: "/dashboard/master/fakultas",
      },
      {
        id: "jenis-pkm",
        label: "Jenis PKM",
        icon: "Award",
        path: "/dashboard/master/jenis-pkm",
      },
      {
        id: "kriteria-pkm",
        label: "Kriteria PKM",
        icon: "List",
        path: "/dashboard/master/kriteria-pkm",
      },
      {
        id: "master-periode",
        label: "Master Periode",
        icon: "Calendar",
        path: "/dashboard/master/periode",
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
  status: "active" | "inactive";
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
  status: "active" | "inactive" | "lulus";
}

export interface Prodi {
  id: string;
  kode: string;
  nama: string;
  fakultas: string;
  jenjang: "D3" | "D4" | "S1" | "S2" | "S3";
  akreditasi: "A" | "B" | "C" | "Unggul";
  kaprodi: string;
  jumlahMahasiswa: number;
  jumlahDosen: number;
  status: "active" | "inactive";
}

export interface Fakultas {
  id: string;
  kode: string;
  nama: string;
  dekan: string;
  jumlahProdi: number;
  jumlahMahasiswa: number;
  jumlahDosen: number;
  status: "active" | "inactive";
}

export interface JenisPKM {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string;
  singkatan: string;
  kuota: number;
  jumlahPendaftar: number;
  status: "active" | "inactive";
}

export interface Periode {
  id: string;
  nama: string;
  tahun: number;
  semester: "Ganjil" | "Genap";
  tanggalMulai: string;
  tanggalSelesai: string;
  status: "draft" | "buka" | "tutup" | "selesai";
  jumlahProposal: number;
}

// Mock Data
export const dosen: Dosen[] = [
  {
    id: "1",
    nip: "198001012005011001",
    nama: "Dr. Ahmad Rizki, M.Kom",
    email: "ahmad.rizki@unsil.ac.id",
    telepon: "081234567890",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    isReviewer: true,
    isPembimbing: true,
    jumlahBimbingan: 5,
    status: "active",
  },
  {
    id: "2",
    nip: "198205152008012005",
    nama: "Prof. Siti Nurhaliza, M.Sc",
    email: "siti.nurhaliza@unsil.ac.id",
    telepon: "082345678901",
    prodi: "Sistem Informasi",
    fakultas: "Fakultas Teknik",
    isReviewer: true,
    isPembimbing: true,
    jumlahBimbingan: 3,
    status: "active",
  },
  {
    id: "3",
    nip: "198503202010011003",
    nama: "Dr. Budi Santoso, M.T",
    email: "budi.santoso@unsil.ac.id",
    telepon: "083456789012",
    prodi: "Teknik Elektro",
    fakultas: "Fakultas Teknik",
    isReviewer: false,
    isPembimbing: true,
    jumlahBimbingan: 4,
    status: "active",
  },
  {
    id: "4",
    nip: "198707152012011004",
    nama: "Andi Wijaya, S.Kom, M.Kom",
    email: "andi.wijaya@unsil.ac.id",
    telepon: "084567890123",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    isReviewer: true,
    isPembimbing: true,
    jumlahBimbingan: 6,
    status: "active",
  },
  {
    id: "5",
    nip: "198901012019031002",
    nama: "Rina Amelia, S.Pd, M.Pd",
    email: "rina.amelia@unsil.ac.id",
    telepon: "085678901234",
    prodi: "Pendidikan Matematika",
    fakultas: "Fakultas Keguruan",
    isReviewer: false,
    isPembimbing: true,
    jumlahBimbingan: 2,
    status: "active",
  },
  {
    id: "6",
    nip: "199011122016012005",
    nama: "Dedi Kurniawan, M.Cs",
    email: "dedi.kurniawan@unsil.ac.id",
    telepon: "086789012345",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    isReviewer: false,
    isPembimbing: false,
    jumlahBimbingan: 0,
    status: "inactive",
  },
  {
    id: "7",
    nip: "198804042013011006",
    nama: "Maya Sari, S.T, M.T",
    email: "maya.sari@unsil.ac.id",
    telepon: "087890123456",
    prodi: "Teknik Sipil",
    fakultas: "Fakultas Teknik",
    isReviewer: true,
    isPembimbing: true,
    jumlahBimbingan: 4,
    status: "active",
  },
  {
    id: "8",
    nip: "199205202017011007",
    nama: "Eko Prasetyo, M.Si",
    email: "eko.prasetyo@unsil.ac.id",
    telepon: "088901234567",
    prodi: "Biologi",
    fakultas: "Fakultas MIPA",
    isReviewer: true,
    isPembimbing: true,
    jumlahBimbingan: 3,
    status: "active",
  },
];

export const mahasiswa: Mahasiswa[] = [
  {
    id: "1",
    nim: "202151001",
    nama: "Reza Pratama",
    email: "reza.pratama@students.unsil.ac.id",
    telepon: "089123456789",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    angkatan: 2021,
    status: "active",
  },
  {
    id: "2",
    nim: "202151002",
    nama: "Dina Wulandari",
    email: "dina.wulandari@students.unsil.ac.id",
    telepon: "089234567890",
    prodi: "Sistem Informasi",
    fakultas: "Fakultas Teknik",
    angkatan: 2021,
    status: "active",
  },
  {
    id: "3",
    nim: "202151003",
    nama: "Fajar Nugraha",
    email: "fajar.nugraha@students.unsil.ac.id",
    telepon: "089345678901",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    angkatan: 2021,
    status: "active",
  },
  {
    id: "4",
    nim: "202051001",
    nama: "Sarah Putri",
    email: "sarah.putri@students.unsil.ac.id",
    telepon: "089456789012",
    prodi: "Teknik Elektro",
    fakultas: "Fakultas Teknik",
    angkatan: 2020,
    status: "active",
  },
  {
    id: "5",
    nim: "201951001",
    nama: "Rizky Hidayat",
    email: "rizky.hidayat@students.unsil.ac.id",
    telepon: "089567890123",
    prodi: "Pendidikan Matematika",
    fakultas: "Fakultas Keguruan",
    angkatan: 2019,
    status: "lulus",
  },
  {
    id: "6",
    nim: "202151004",
    nama: "Anisa Rahma",
    email: "anisa.rahma@students.unsil.ac.id",
    telepon: "089678901234",
    prodi: "Biologi",
    fakultas: "Fakultas MIPA",
    angkatan: 2021,
    status: "active",
  },
  {
    id: "7",
    nim: "202151005",
    nama: "Bambang Sutrisno",
    email: "bambang.sutrisno@students.unsil.ac.id",
    telepon: "089789012345",
    prodi: "Teknik Sipil",
    fakultas: "Fakultas Teknik",
    angkatan: 2021,
    status: "active",
  },
  {
    id: "8",
    nim: "202051002",
    nama: "Citra Dewi",
    email: "citra.dewi@students.unsil.ac.id",
    telepon: "089890123456",
    prodi: "Sistem Informasi",
    fakultas: "Fakultas Teknik",
    angkatan: 2020,
    status: "active",
  },
];

export const prodi: Prodi[] = [
  {
    id: "1",
    kode: "TI-001",
    nama: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    jenjang: "S1",
    akreditasi: "Unggul",
    kaprodi: "Dr. Ahmad Rizki, M.Kom",
    jumlahMahasiswa: 450,
    jumlahDosen: 25,
    status: "active",
  },
  {
    id: "2",
    kode: "SI-001",
    nama: "Sistem Informasi",
    fakultas: "Fakultas Teknik",
    jenjang: "S1",
    akreditasi: "A",
    kaprodi: "Prof. Siti Nurhaliza, M.Sc",
    jumlahMahasiswa: 380,
    jumlahDosen: 20,
    status: "active",
  },
  {
    id: "3",
    kode: "TE-001",
    nama: "Teknik Elektro",
    fakultas: "Fakultas Teknik",
    jenjang: "S1",
    akreditasi: "A",
    kaprodi: "Dr. Budi Santoso, M.T",
    jumlahMahasiswa: 320,
    jumlahDosen: 18,
    status: "active",
  },
  {
    id: "4",
    kode: "TS-001",
    nama: "Teknik Sipil",
    fakultas: "Fakultas Teknik",
    jenjang: "S1",
    akreditasi: "B",
    kaprodi: "Maya Sari, S.T, M.T",
    jumlahMahasiswa: 290,
    jumlahDosen: 16,
    status: "active",
  },
  {
    id: "5",
    kode: "PM-001",
    nama: "Pendidikan Matematika",
    fakultas: "Fakultas Keguruan",
    jenjang: "S1",
    akreditasi: "A",
    kaprodi: "Rina Amelia, S.Pd, M.Pd",
    jumlahMahasiswa: 410,
    jumlahDosen: 22,
    status: "active",
  },
  {
    id: "6",
    kode: "BI-001",
    nama: "Biologi",
    fakultas: "Fakultas MIPA",
    jenjang: "S1",
    akreditasi: "A",
    kaprodi: "Eko Prasetyo, M.Si",
    jumlahMahasiswa: 350,
    jumlahDosen: 19,
    status: "active",
  },
];

export const fakultas: Fakultas[] = [
  {
    id: "1",
    kode: "FT",
    nama: "Fakultas Teknik",
    dekan: "Prof. Dr. Ir. H. Bambang Suharto, M.T",
    jumlahProdi: 4,
    jumlahMahasiswa: 1440,
    jumlahDosen: 79,
    status: "active",
  },
  {
    id: "2",
    kode: "FKIP",
    nama: "Fakultas Keguruan",
    dekan: "Dr. Hj. Dewi Sartika, M.Pd",
    jumlahProdi: 6,
    jumlahMahasiswa: 2100,
    jumlahDosen: 98,
    status: "active",
  },
  {
    id: "3",
    kode: "FMIPA",
    nama: "Fakultas MIPA",
    dekan: "Prof. Dr. Cecep Sumarna, M.Si",
    jumlahProdi: 5,
    jumlahMahasiswa: 1650,
    jumlahDosen: 85,
    status: "active",
  },
  {
    id: "4",
    kode: "FEB",
    nama: "Fakultas Ekonomi",
    dekan: "Dr. H. Ahmad Subandi, SE, M.Si",
    jumlahProdi: 3,
    jumlahMahasiswa: 1200,
    jumlahDosen: 56,
    status: "active",
  },
  {
    id: "5",
    kode: "FH",
    nama: "Fakultas Hukum",
    dekan: "Prof. Dr. Hj. Rina Wijaya, S.H, M.H",
    jumlahProdi: 2,
    jumlahMahasiswa: 890,
    jumlahDosen: 42,
    status: "active",
  },
];

export const jenisPKM: JenisPKM[] = [
  {
    id: "1",
    kode: "PKM-K",
    nama: "PKM Kewirausahaan",
    deskripsi: "Program kreativitas mahasiswa bidang kewirausahaan",
    singkatan: "PKM-K",
    kuota: 150,
    jumlahPendaftar: 125,
    status: "active",
  },
  {
    id: "2",
    kode: "PKM-PM",
    nama: "PKM Pengabdian Masyarakat",
    deskripsi: "Program kreativitas mahasiswa bidang pengabdian masyarakat",
    singkatan: "PKM-PM",
    kuota: 100,
    jumlahPendaftar: 88,
    status: "active",
  },
  {
    id: "3",
    kode: "PKM-T",
    nama: "PKM Teknologi",
    deskripsi: "Program kreativitas mahasiswa bidang teknologi",
    singkatan: "PKM-T",
    kuota: 120,
    jumlahPendaftar: 102,
    status: "active",
  },
  {
    id: "4",
    kode: "PKM-KC",
    nama: "PKM Karsa Cipta",
    deskripsi: "Program kreativitas mahasiswa bidang karsa cipta",
    singkatan: "PKM-KC",
    kuota: 80,
    jumlahPendaftar: 65,
    status: "active",
  },
  {
    id: "5",
    kode: "PKM-PE",
    nama: "PKM Penelitian Eksakta",
    deskripsi: "Program kreativitas mahasiswa bidang penelitian eksakta",
    singkatan: "PKM-PE",
    kuota: 90,
    jumlahPendaftar: 78,
    status: "active",
  },
  {
    id: "6",
    kode: "PKM-PSH",
    nama: "PKM Penelitian Sosial Humaniora",
    deskripsi: "Program kreativitas mahasiswa bidang penelitian sosial humaniora",
    singkatan: "PKM-PSH",
    kuota: 85,
    jumlahPendaftar: 72,
    status: "active",
  },
  {
    id: "7",
    kode: "PKM-P",
    nama: "PKM Pembaruan Energi",
    deskripsi: "Program kreativitas mahasiswa bidang pembaruan energi",
    singkatan: "PKM-P",
    kuota: 60,
    jumlahPendaftar: 45,
    status: "active",
  },
  {
    id: "8",
    kode: "PKM-AI",
    nama: "PKM Artikel Ilmiah",
    deskripsi: "Program kreativitas mahasiswa bidang artikel ilmiah",
    singkatan: "PKM-AI",
    kuota: 70,
    jumlahPendaftar: 58,
    status: "active",
  },
];

export const periode: Periode[] = [
  {
    id: "1",
    nama: "PKM 2024/2025 - Ganjil",
    tahun: 2024,
    semester: "Ganjil",
    tanggalMulai: "2024-02-01",
    tanggalSelesai: "2024-08-31",
    status: "buka",
    jumlahProposal: 234,
  },
  {
    id: "2",
    nama: "PKM 2023/2024 - Genap",
    tahun: 2023,
    semester: "Genap",
    tanggalMulai: "2023-09-01",
    tanggalSelesai: "2024-01-31",
    status: "selesai",
    jumlahProposal: 189,
  },
  {
    id: "3",
    nama: "PKM 2023/2024 - Ganjil",
    tahun: 2023,
    semester: "Ganjil",
    tanggalMulai: "2023-02-01",
    tanggalSelesai: "2023-08-31",
    status: "selesai",
    jumlahProposal: 156,
  },
  {
    id: "4",
    nama: "PKM 2025/2026 - Ganjil",
    tahun: 2025,
    semester: "Ganjil",
    tanggalMulai: "2025-02-01",
    tanggalSelesai: "2025-08-31",
    status: "draft",
    jumlahProposal: 0,
  },
];
