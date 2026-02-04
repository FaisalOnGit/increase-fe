import { z } from "zod";

// ============================================
// USER MANAGEMENT VALIDATION
// ============================================
export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Nama harus diisi")
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  username: z
    .string()
    .min(1, "Username harus diisi")
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter")
    .regex(/^[a-zA-Z0-9_.]+$/, "Username hanya boleh mengandung huruf, angka, titik, dan underscore"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  phone: z
    .string()
    .min(1, "Nomor telepon harus diisi")
    .regex(/^08[0-9]{8,11}$/, "Format nomor telepon tidak valid (contoh: 08123456789)"),
  role: z
    .string()
    .min(1, "Role harus dipilih")
    .refine((val) => ["Admin", "Dosen", "Mahasiswa", "Reviewer"].includes(val), {
      message: "Role tidak valid",
    }),
  isReviewer: z.boolean().optional().default(false),
  status: z
    .enum(["active", "inactive"], {
      required_error: "Status harus dipilih",
    }),
});

export type UserFormValues = z.infer<typeof userSchema>;

// ============================================
// ROLE MANAGEMENT VALIDATION
// ============================================
export const roleSchema = z.object({
  name: z
    .string()
    .min(1, "Nama role harus diisi")
    .min(2, "Nama role minimal 2 karakter")
    .max(50, "Nama role maksimal 50 karakter"),
  description: z
    .string()
    .min(1, "Deskripsi harus diisi")
    .min(10, "Deskripsi minimal 10 karakter")
    .max(500, "Deskripsi maksimal 500 karakter"),
  accessLevel: z
    .enum(["full", "limited", "readonly"], {
      required_error: "Level akses harus dipilih",
    }),
  permissions: z
    .array(z.string())
    .min(1, "Minimal pilih 1 permission")
    .refine((val) => val.length > 0, {
      message: "Minimal pilih 1 permission",
    }),
  status: z
    .enum(["active", "inactive"], {
      required_error: "Status harus dipilih",
    }),
});

export type RoleFormValues = z.infer<typeof roleSchema>;

// ============================================
// FAKULTAS/PRODI VALIDATION
// ============================================
export const fakultasSchema = z.object({
  namaFakultas: z
    .string()
    .min(1, "Nama fakultas harus diisi")
    .min(3, "Nama fakultas minimal 3 karakter")
    .max(100, "Nama fakultas maksimal 100 karakter"),
  kodeFakultas: z
    .string()
    .min(1, "Kode fakultas harus diisi")
    .min(2, "Kode fakultas minimal 2 karakter")
    .max(10, "Kode fakultas maksimal 10 karakter")
    .toUpperCase(),
  deskripsi: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .optional(),
});

export type FakultasFormValues = z.infer<typeof fakultasSchema>;

export const prodiSchema = z.object({
  namaProdi: z
    .string()
    .min(1, "Nama program studi harus diisi")
    .min(3, "Nama program studi minimal 3 karakter")
    .max(100, "Nama program studi maksimal 100 karakter"),
  kodeProdi: z
    .string()
    .min(1, "Kode program studi harus diisi")
    .min(2, "Kode program studi minimal 2 karakter")
    .max(10, "Kode program studi maksimal 10 karakter")
    .toUpperCase(),
  fakultasId: z
    .string()
    .min(1, "Fakultas harus dipilih"),
  jenjang: z
    .enum(["D3", "D4", "S1", "S2", "S3"], {
      required_error: "Jenjang harus dipilih",
    }),
  akreditasi: z
    .enum(["A", "B", "C", "Unggul", "Baik Sekali", "Baik"], {
      required_error: "Akreditasi harus dipilih",
    }),
});

export type ProdiFormValues = z.infer<typeof prodiSchema>;

// ============================================
// JENIS PKM VALIDATION
// ============================================
export const jenisPkmSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama jenis PKM harus diisi")
    .min(3, "Nama jenis PKM minimal 3 karakter")
    .max(100, "Nama jenis PKM maksimal 100 karakter"),
  kode: z
    .string()
    .min(1, "Kode harus diisi")
    .min(2, "Kode minimal 2 karakter")
    .max(10, "Kode maksimal 10 karakter")
    .toUpperCase(),
  deskripsi: z
    .string()
    .min(1, "Deskripsi harus diisi")
    .min(10, "Deskripsi minimal 10 karakter")
    .max(500, "Deskripsi maksimal 500 karakter"),
  kuota: z
    .number({
      required_error: "Kuota harus diisi",
      invalid_type_error: "Kuota harus berupa angka",
    })
    .min(1, "Kuota minimal 1")
    .max(1000, "Kuota maksimal 1000"),
  isActive: z.boolean().optional().default(true),
});

export type JenisPkmFormValues = z.infer<typeof jenisPkmSchema>;

// ============================================
// VALIDATION HELPER FUNCTIONS
// ============================================

/**
 * Validate user form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateUserForm = (data: unknown) => {
  return userSchema.safeParse(data);
};

/**
 * Validate role form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateRoleForm = (data: unknown) => {
  return roleSchema.safeParse(data);
};

/**
 * Validate fakultas form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateFakultasForm = (data: unknown) => {
  return fakultasSchema.safeParse(data);
};

/**
 * Validate prodi form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateProdiForm = (data: unknown) => {
  return prodiSchema.safeParse(data);
};

/**
 * Validate jenis PKM form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateJenisPkmForm = (data: unknown) => {
  return jenisPkmSchema.safeParse(data);
};
