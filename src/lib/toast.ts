import { toast } from "sonner";

export const toastSuccess = (message: string) => {
  return toast.success(message);
};

export const toastError = (message: string) => {
  return toast.error(message);
};

export const toastInfo = (message: string) => {
  return toast(message);
};

export const toastWarning = (message: string) => {
  return toast.warning(message);
};

export const toastPromise = async (
  promise: Promise<any>,
  messages?: {
    loading?: string;
    success?: string;
    error?: string;
  }
) => {
  return toast.promise(promise, {
    loading: messages?.loading || "Memproses...",
    success: messages?.success || "Berhasil",
    error: messages?.error || "Terjadi kesalahan",
  });
};

export default toast;
