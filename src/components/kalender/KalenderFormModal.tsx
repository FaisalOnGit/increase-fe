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
import { PKMKalender } from "@/types/api.types";
import { createKalender, updateKalender } from "@/api/kalender";
import { getActivePKMs as fetchPKMs } from "@/api/pkm";

interface KalenderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  kalender?: PKMKalender | null;
  mode: "create" | "edit";
}

interface PKMOption {
  id: number;
  singkatan: string;
  nama: string;
}

export const KalenderFormModal: React.FC<KalenderFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  kalender,
  mode,
}) => {
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [pkmIds, setPkmIds] = useState<number[]>([]);
  const [tanggalMulaiPengajuan, setTanggalMulaiPengajuan] = useState("");
  const [tanggalSelesaiPengajuan, setTanggalSelesaiPengajuan] = useState("");
  const [tanggalMulaiPenilaian, setTanggalMulaiPenilaian] = useState("");
  const [tanggalSelesaiPenilaian, setTanggalSelesaiPenilaian] = useState("");
  const [tanggalPengumuman, setTanggalPengumuman] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPKMs, setIsLoadingPKMs] = useState(false);
  const [error, setError] = useState("");
  const [availablePKMs, setAvailablePKMs] = useState<PKMOption[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && kalender) {
        setTahun(kalender.tahun);
        setTanggalMulaiPengajuan(kalender.tanggal_mulai_pengajuan?.split("T")[0] || "");
        setTanggalSelesaiPengajuan(kalender.tanggal_selesai_pengajuan?.split("T")[0] || "");
        setTanggalMulaiPenilaian(kalender.tanggal_mulai_penilaian?.split("T")[0] || "");
        setTanggalSelesaiPenilaian(kalender.tanggal_selesai_penilaian?.split("T")[0] || "");
        setTanggalPengumuman(kalender.tanggal_pengumuman?.split("T")[0] || "");
        setIsActive(kalender.is_active ?? false);
      } else {
        const currentYear = new Date().getFullYear();
        setTahun(currentYear);
        setTanggalMulaiPengajuan("");
        setTanggalSelesaiPengajuan("");
        setTanggalMulaiPenilaian("");
        setTanggalSelesaiPenilaian("");
        setTanggalPengumuman("");
        setIsActive(false);
      }
      setPkmIds([]);
      setError("");
      fetchPKMOptions();
    }
  }, [isOpen, mode, kalender]);

  const fetchPKMOptions = async () => {
    setIsLoadingPKMs(true);
    try {
      const response = await fetchPKMs();
      if (response.success && response.data) {
        setAvailablePKMs(response.data);
      }
    } catch (err) {
      console.error("Error fetching PKM options:", err);
    } finally {
      setIsLoadingPKMs(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!tahun || tahun < 2000 || tahun > 2100) {
      setError("Tahun harus antara 2000 - 2100");
      return;
    }

    if (!tanggalMulaiPengajuan) {
      setError("Tanggal mulai pengajuan wajib diisi");
      return;
    }

    if (!tanggalSelesaiPengajuan) {
      setError("Tanggal selesai pengajuan wajib diisi");
      return;
    }

    if (!tanggalMulaiPenilaian) {
      setError("Tanggal mulai penilaian wajib diisi");
      return;
    }

    if (!tanggalSelesaiPenilaian) {
      setError("Tanggal selesai penilaian wajib diisi");
      return;
    }

    if (!tanggalPengumuman) {
      setError("Tanggal pengumuman wajib diisi");
      return;
    }

    if (pkmIds.length === 0) {
      setError("Pilih minimal satu jenis PKM");
      return;
    }

    // Validate date sequence
    if (new Date(tanggalSelesaiPengajuan) <= new Date(tanggalMulaiPengajuan)) {
      setError("Tanggal selesai pengajuan harus setelah tanggal mulai pengajuan");
      return;
    }

    if (new Date(tanggalMulaiPenilaian) <= new Date(tanggalSelesaiPengajuan)) {
      setError("Tanggal mulai penilaian harus setelah tanggal selesai pengajuan");
      return;
    }

    if (new Date(tanggalSelesaiPenilaian) <= new Date(tanggalMulaiPenilaian)) {
      setError("Tanggal selesai penilaian harus setelah tanggal mulai penilaian");
      return;
    }

    if (new Date(tanggalPengumuman) <= new Date(tanggalSelesaiPenilaian)) {
      setError("Tanggal pengumuman harus setelah tanggal selesai penilaian");
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        tahun,
        pkm_ids: pkmIds,
        tanggal_mulai_pengajuan: tanggalMulaiPengajuan,
        tanggal_selesai_pengajuan: tanggalSelesaiPengajuan,
        tanggal_mulai_penilaian: tanggalMulaiPenilaian,
        tanggal_selesai_penilaian: tanggalSelesaiPenilaian,
        tanggal_pengumuman: tanggalPengumuman,
        is_active: isActive,
      };

      const response =
        mode === "create"
          ? await createKalender(data)
          : await updateKalender(kalender!.id, data);

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

  const togglePKM = (id: number) => {
    setPkmIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon
              name={mode === "create" ? "Calendar" : "Settings"}
              size={20}
              className="text-primary"
            />
            {mode === "create" ? "Tambah Kalender PKM" : "Edit Kalender PKM"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tahun">
                Tahun <span className="text-destructive">*</span>
              </Label>
              <Input
                id="tahun"
                type="number"
                min="2000"
                max="2100"
                value={tahun}
                onChange={(e) => setTahun(Number(e.target.value))}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-end">
              <div className="flex items-center justify-between w-full p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Status Aktif</p>
                  <p className="text-xs text-muted-foreground">
                    Hanya satu kalender yang bisa aktif
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
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Periode Pengajuan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mulai_pengajuan">
                  Tanggal Mulai <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mulai_pengajuan"
                  type="date"
                  value={tanggalMulaiPengajuan}
                  onChange={(e) => setTanggalMulaiPengajuan(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selesai_pengajuan">
                  Tanggal Selesai <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="selesai_pengajuan"
                  type="date"
                  value={tanggalSelesaiPengajuan}
                  onChange={(e) => setTanggalSelesaiPengajuan(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Periode Penilaian</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mulai_penilaian">
                  Tanggal Mulai <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mulai_penilaian"
                  type="date"
                  value={tanggalMulaiPenilaian}
                  onChange={(e) => setTanggalMulaiPenilaian(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selesai_penilaian">
                  Tanggal Selesai <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="selesai_penilaian"
                  type="date"
                  value={tanggalSelesaiPenilaian}
                  onChange={(e) => setTanggalSelesaiPenilaian(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pengumuman">
              Tanggal Pengumuman <span className="text-destructive">*</span>
            </Label>
            <Input
              id="pengumuman"
              type="date"
              value={tanggalPengumuman}
              onChange={(e) => setTanggalPengumuman(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Jenis PKM <span className="text-destructive">*</span>
            </Label>
            {isLoadingPKMs ? (
              <div className="text-sm text-muted-foreground">
                Memuat daftar PKM...
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border rounded-lg">
                {availablePKMs.map((pkm) => (
                  <label
                    key={pkm.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={pkmIds.includes(pkm.id)}
                      onChange={() => togglePKM(pkm.id)}
                      disabled={isLoading}
                      className="rounded"
                    />
                    <span className="text-sm">{pkm.singkatan}</span>
                  </label>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {pkmIds.length} jenis PKM dipilih
            </p>
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
