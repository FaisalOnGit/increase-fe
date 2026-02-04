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

  error.errors.forEach((err) => {
    const field = err.path[0] as keyof T;
    errors[field] = err.message;
  });

  return errors;
};
