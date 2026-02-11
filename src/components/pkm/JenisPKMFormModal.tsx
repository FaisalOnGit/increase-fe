import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/Icon";
import { JenisPKM } from "@/types/api.types";
import { createPKM, updatePKM } from "@/api/pkm";

interface JenisPKMFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pkm?: JenisPKM | null;
  mode: "create" | "edit";
}

export const JenisPKMFormModal: React.FC<JenisPKMFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  pkm,
  mode,
}) => {
  const [singkatan, setSingkatan] = useState("");
  const [nama, setNama] = useState("");
  const [batasMinAnggota, setBatasMinAnggota] = useState(2);
  const [batasMaxAnggota, setBatasMaxAnggota] = useState(5);
  const [batasMaxReviewer, setBatasMaxReviewer] = useState(3);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && pkm) {
        setSingkatan(pkm.singkatan || "");
        setNama(pkm.nama || "");
        setBatasMinAnggota(pkm.batas_min_anggota || 2);
        setBatasMaxAnggota(pkm.batas_max_anggota || 5);
        setBatasMaxReviewer(pkm.batas_max_reviewer || 3);
        setIsActive(pkm.is_active ?? true);
      } else {
        setSingkatan("");
        setNama("");
        setBatasMinAnggota(2);
        setBatasMaxAnggota(5);
        setBatasMaxReviewer(3);
        setIsActive(true);
      }
      setError("");
    }
  }, [isOpen, mode, pkm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!singkatan.trim()) {
      setError("Singkatan wajib diisi");
      return;
    }

    if (!nama.trim()) {
      setError("Nama PKM wajib diisi");
      return;
    }

    if (batasMinAnggota < 1) {
      setError("Minimal anggota tidak boleh kurang dari 1");
      return;
    }

    if (batasMaxAnggota < batasMinAnggota) {
      setError("Maksimal anggota tidak boleh kurang dari minimal anggota");
      return;
    }

    if (batasMaxReviewer < 1) {
      setError("Maksimal reviewer tidak boleh kurang dari 1");
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        singkatan: singkatan.trim().toUpperCase(),
        nama: nama.trim(),
        batas_min_anggota: batasMinAnggota,
        batas_max_anggota: batasMaxAnggota,
        batas_max_reviewer: batasMaxReviewer,
        is_active: isActive,
      };

      const response =
        mode === "create"
          ? await createPKM(data)
          : await updatePKM(pkm!.id, data);

      if (response.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.message || "Terjadi kesalahan");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon
              name={mode === "create" ? "Award" : "Settings"}
              size={20}
              className="text-primary"
            />
            {mode === "create" ? "Tambah Jenis PKM" : "Edit Jenis PKM"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="singkatan">
              Singkatan <span className="text-destructive">*</span>
            </Label>
            <Input
              id="singkatan"
              value={singkatan}
              onChange={(e) => setSingkatan(e.target.value.toUpperCase())}
              placeholder="Contoh: PKM-K"
              disabled={isLoading}
              maxLength={20}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Singkatan akan otomatis diubah ke huruf kapital
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nama">
              Nama Lengkap <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: PKM Kewirausahaan"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min_anggota">
                Min. Anggota <span className="text-destructive">*</span>
              </Label>
              <Input
                id="min_anggota"
                type="number"
                min="1"
                max="10"
                value={batasMinAnggota}
                onChange={(e) => setBatasMinAnggota(Number(e.target.value))}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_anggota">
                Max. Anggota <span className="text-destructive">*</span>
              </Label>
              <Input
                id="max_anggota"
                type="number"
                min="1"
                max="10"
                value={batasMaxAnggota}
                onChange={(e) => setBatasMaxAnggota(Number(e.target.value))}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_reviewer">
              Max. Reviewer <span className="text-destructive">*</span>
            </Label>
            <Input
              id="max_reviewer"
              type="number"
              min="1"
              max="10"
              value={batasMaxReviewer}
              onChange={(e) => setBatasMaxReviewer(Number(e.target.value))}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="text-sm font-medium">Status Aktif</p>
              <p className="text-xs text-muted-foreground">
                Jenis PKM dapat digunakan jika aktif
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              disabled={isLoading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isActive ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : mode === "create" ? (
                <>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Tambah
                </>
              ) : (
                <>
                  <Icon name="Check" size={16} className="mr-2" />
                  Simpan
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
