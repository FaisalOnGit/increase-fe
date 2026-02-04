import { z } from "zod";
export { getZodErrors } from "./utils";

// ============================================
// LOGIN VALIDATION
// ============================================
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(6, "Password minimal 6 karakter"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ============================================
// REGISTER VALIDATION
// ============================================
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Nama lengkap harus diisi")
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf kapital")
    .regex(/[a-z]/, "Password harus mengandung minimal 1 huruf kecil")
    .regex(/[0-9]/, "Password harus mengandung minimal 1 angka"),
  confirmPassword: z
    .string()
    .min(1, "Konfirmasi password harus diisi"),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Anda harus menyetujui syarat & ketentuan",
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

// ============================================
// FORGOT PASSWORD VALIDATION
// ============================================
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ============================================
// RESET PASSWORD VALIDATION
// ============================================
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf kapital")
    .regex(/[a-z]/, "Password harus mengandung minimal 1 huruf kecil")
    .regex(/[0-9]/, "Password harus mengandung minimal 1 angka"),
  confirmPassword: z
    .string()
    .min(1, "Konfirmasi password harus diisi"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// ============================================
// VALIDATION HELPER FUNCTIONS
// ============================================

/**
 * Validate login form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateLoginForm = (data: unknown) => {
  return loginSchema.safeParse(data);
};

/**
 * Validate register form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateRegisterForm = (data: unknown) => {
  return registerSchema.safeParse(data);
};

/**
 * Validate forgot password form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateForgotPasswordForm = (data: unknown) => {
  return forgotPasswordSchema.safeParse(data);
};

/**
 * Validate reset password form data
 * @param data - Form data to validate
 * @returns Validation result with errors or success
 */
export const validateResetPasswordForm = (data: unknown) => {
  return resetPasswordSchema.safeParse(data);
};
