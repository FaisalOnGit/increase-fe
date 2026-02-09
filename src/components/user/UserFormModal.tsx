import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/badge";
import { User, CreateUser, UpdateUser } from "@/types/api.types";
import { createUser, updateUser } from "@/api/users";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user?: User | null;
  mode: "create" | "edit";
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  user,
  mode,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    roles: ["mahasiswa"] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes or user changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && user) {
        setFormData({
          name: user.name,
          email: user.email,
          password: "",
          password_confirmation: "",
          roles: user.roles?.map((r: any) => r.name) || ["mahasiswa"],
        });
      } else {
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          roles: ["mahasiswa"],
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      let response;

      if (mode === "create") {
        const data: CreateUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          roles: formData.roles,
        } as any;
        response = await createUser(data);
      } else {
        const data: UpdateUser = {
          name: formData.name,
          email: formData.email,
          roles: formData.roles,
        } as any;

        // Only include password if it's provided
        if (formData.password) {
          data.password = formData.password;
          data.password_confirmation = formData.password_confirmation;
        }

        response = await updateUser(user!.id, data);
      }

      if (response.success) {
        onSuccess();
        onClose();
        alert(
          mode === "create"
            ? "Pengguna berhasil ditambahkan"
            : "Pengguna berhasil diperbarui",
        );
      } else {
        setErrors(response.errors || {});
        if (!response.errors || Object.keys(response.errors).length === 0) {
          alert(response.message || "Terjadi kesalahan");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roles = [
    { value: "admin", label: "Admin", color: "bg-purple-100 text-purple-800" },
    { value: "dosen", label: "Dosen", color: "bg-blue-100 text-blue-800" },
    {
      value: "mahasiswa",
      label: "Mahasiswa",
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="User" size={20} />
            {mode === "create" ? "Tambah Pengguna Baru" : "Edit Pengguna"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Isi formulir di bawah untuk menambahkan pengguna baru."
              : "Edit informasi pengguna. Biarkan password kosong jika tidak ingin mengubahnya."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nama Lengkap <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                disabled={isSubmitting}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="contoh@email.com"
                disabled={isSubmitting}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email[0]}</p>
              )}
            </div>

            {/* Role */}
            <div className="grid gap-2">
              <Label>
                Role <span className="text-destructive">*</span>
              </Label>
              <div className="flex flex-wrap gap-3">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.roles.includes(role.value)
                        ? role.color + " border-current"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.roles.includes(role.value)}
                      onChange={(e) => {
                        const newRoles = e.target.checked
                          ? [...formData.roles, role.value]
                          : formData.roles.filter((r) => r !== role.value);
                        setFormData((prev) => ({ ...prev, roles: newRoles }));
                        // Clear error when user interacts
                        if (errors.roles) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.roles;
                            return newErrors;
                          });
                        }
                      }}
                      disabled={isSubmitting}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">{role.label}</span>
                  </label>
                ))}
              </div>
              {errors.roles && (
                <p className="text-sm text-destructive">{errors.roles[0]}</p>
              )}
            </div>

            {/* Password - Only required for create */}
            <div className="grid gap-2">
              <Label htmlFor="password">
                Password{" "}
                {mode === "create" && (
                  <span className="text-destructive">*</span>
                )}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={
                  mode === "create"
                    ? "Minimal 8 karakter"
                    : "Biarkan kosong jika tidak ingin mengubah"
                }
                disabled={isSubmitting}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password[0]}</p>
              )}
            </div>

            {/* Password Confirmation */}
            {(formData.password || mode === "create") && (
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">
                  Konfirmasi Password{" "}
                  {mode === "create" && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  placeholder="Ulangi password"
                  disabled={isSubmitting}
                  className={
                    errors.password_confirmation ? "border-destructive" : ""
                  }
                />
                {errors.password_confirmation && (
                  <p className="text-sm text-destructive">
                    {errors.password_confirmation[0]}
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="mr-2 animate-spin"
                  />
                  Menyimpan...
                </>
              ) : mode === "create" ? (
                <>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Tambah Pengguna
                </>
              ) : (
                <>
                  <Icon name="Check" size={16} className="mr-2" />
                  Simpan Perubahan
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
