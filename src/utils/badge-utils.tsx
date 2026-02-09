import { Badge } from "@/components/ui/badge";

/**
 * Get role badge with appropriate color
 * @param role - Role name or undefined
 * @returns Badge component with role styling
 */
export const getRoleBadge = (role: string | undefined) => {
  if (!role) return <Badge variant="secondary">-</Badge>;

  const normalizedRole = role.toLowerCase();

  switch (normalizedRole) {
    case "admin":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          Admin
        </Badge>
      );
    case "dosen":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Dosen
        </Badge>
      );
    case "mahasiswa":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Mahasiswa
        </Badge>
      );
    case "reviewer":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          Reviewer
        </Badge>
      );
    case "kajur":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Kajur
        </Badge>
      );
    default:
      return <Badge variant="secondary">{role}</Badge>;
  }
};

/**
 * Get strata badge with appropriate color
 * @param strata - Strata level (D2, D3, S1, S2, S3)
 * @returns Badge component with strata styling
 */
export const getStrataBadge = (strata: string | undefined) => {
  if (!strata) return <Badge variant="secondary">-</Badge>;

  const normalizedStrata = strata.toUpperCase();

  switch (normalizedStrata) {
    case "S3":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          S3
        </Badge>
      );
    case "S2":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          S2
        </Badge>
      );
    case "S1":
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          S1
        </Badge>
      );
    case "D3":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          D3
        </Badge>
      );
    case "D2":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
          D2
        </Badge>
      );
    default:
      return <Badge variant="secondary">{strata}</Badge>;
  }
};

/**
 * Get status badge for active/inactive status
 * @param isActive - Active status
 * @param activeLabel - Label for active status (default: "Aktif")
 * @param inactiveLabel - Label for inactive status (default: "Nonaktif")
 * @returns Badge component with status styling
 */
export const getStatusBadge = (
  isActive: boolean | undefined,
  activeLabel: string = "Aktif",
  inactiveLabel: string = "Nonaktif",
) => {
  if (isActive) {
    return (
      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
        {activeLabel}
      </Badge>
    );
  }
  return (
    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
      {inactiveLabel}
    </Badge>
  );
};

/**
 * Get PKM status badge
 * @param status - PKM status (baru, proses, selesai, ditolak, dll)
 * @returns Badge component with PKM status styling
 */
export const getPKMStatusBadge = (status: string | undefined) => {
  if (!status) return <Badge variant="secondary">-</Badge>;

  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case "baru":
    case "draft":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          Baru
        </Badge>
      );
    case "proses":
    case "dalam review":
    case "penilaian":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Proses
        </Badge>
      );
    case "selesai":
    case "disetujui":
    case "diterima":
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          Selesai
        </Badge>
      );
    case "ditolak":
    case "gagal":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Ditolak
        </Badge>
      );
    case "revisi":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          Revisi
        </Badge>
      );
    case "buka":
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          Buka
        </Badge>
      );
    case "tutup":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Tutup
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

/**
 * Get quota status badge
 * @param kuota - Total quota
 * @param terpakai - Used quota
 * @returns Badge component with quota status styling
 */
export const getQuotaBadge = (kuota: number, terpakai: number) => {
  if (terpakai >= kuota) {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Penuh</Badge>
    );
  }
  if (terpakai / kuota >= 0.75) {
    return (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
        Hampir Penuh
      </Badge>
    );
  }
  return (
    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
      Tersedia
    </Badge>
  );
};

/**
 * Get progress bar component for quota
 * @param kuota - Total quota
 * @param terpakai - Used quota
 * @returns Progress bar div with appropriate color
 */
export const getQuotaProgress = (kuota: number, terpakai: number) => {
  const percentage = (terpakai / kuota) * 100;
  const colorClass =
    percentage >= 100
      ? "bg-red-500"
      : percentage >= 75
        ? "bg-orange-500"
        : percentage >= 50
          ? "bg-yellow-500"
          : "bg-emerald-500";

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${colorClass}`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
};

/**
 * Get faculty badge with abbreviation expansion
 * @param faculty - Faculty name or object
 * @returns Badge component with faculty styling
 */
export const getFacultyBadge = (
  faculty: string | { name: string } | undefined,
) => {
  const name = typeof faculty === "object" ? faculty?.name : faculty;
  if (!name) return <Badge variant="secondary">-</Badge>;

  return (
    <Badge variant="outline" className="font-medium">
      {name}
    </Badge>
  );
};
