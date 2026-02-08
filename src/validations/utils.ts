import { z } from "zod";

/**
 * Get formatted error messages from Zod validation error
 * @param error - Zod error object
 * @returns Object with field names as keys and error messages as values
 */
export const getZodErrors = <T extends Record<string, unknown>>(
  error: z.ZodError
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};

  // Handle both Zod v3 and v4 error structures
  const errorList = error?.issues || error?.errors || [];

  if (Array.isArray(errorList)) {
    errorList.forEach((err: any) => {
      const field = (err.path?.[0] || err.path?.[0]) as keyof T;
      if (field) {
        errors[field] = err.message;
      }
    });
  }

  return errors;
};
