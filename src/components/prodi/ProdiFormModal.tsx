import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/Icon";
import { Prodi } from "@/types/api.types";
import { createProdi, updateProdi } from "@/api/prodi";
import { getAllFaculties } from "@/api/faculty";
import { Faculty } from "@/types/api.types";

interface ProdiFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  prodi?: Prodi | null;
  mode: "create" | "edit";
}

const STRATA_OPTIONS = [
  { value: "D2", label: "D2" },
  { value: "D3", label: "D3" },
  { value: "S1", label: "S1" },
  { value: "S2", label: "S2" },
  { value: "S3", label: "S3" },
];

export const ProdiFormModal: React.FC<ProdiFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  prodi,
  mode,
}) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [strata, setStrata] = useState("S1");
  const [fakultasId, setFakultasId] = useState<number | "">("");
  const [kaprodiId, setKaprodiId] = useState<number | "">("");
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFaculties, setIsLoadingFaculties] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && prodi) {
        setName(prodi.name || "");
        setCode(prodi.code || "");
        setStrata(prodi.strata || "S1");
        setFakultasId(prodi.fakultas_id || "");
        setKaprodiId(prodi.kaprodi_id || "");
      } else {
        setName("");
        setCode("");
        setStrata("S1");
        setFakultasId("");
        setKaprodiId("");
      }
      setError("");
      fetchFaculties();
    }
  }, [isOpen, mode, prodi]);

  const fetchFaculties = async () => {
    setIsLoadingFaculties(true);
    try {
      const response = await getAllFaculties();
      if (response.success && response.data) {
        setFaculties(response.data);
      }
    } catch (err) {
      console.error("Error fetching faculties:", err);
    } finally {
      setIsLoadingFaculties(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama program studi wajib diisi");
      return;
    }

    if (!code.trim()) {
      setError("Kode program studi wajib diisi");
      return;
    }

    if (!fakultasId) {
      setError("Fakultas wajib dipilih");
      return;
    }

    setIsLoading(true);

    try {
      const data: any = {
        name: name.trim(),
        code: code.trim(),
        strata,
        fakultas_id: Number(fakultasId),
      };

      if (kaprodiId) {
        data.kaprodi_id = Number(kaprodiId);
      }

      const response =
        mode === "create"
          ? await createProdi(data)
          : await updateProdi(prodi!.id, data);

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
              name={mode === "create" ? "BookOpen" : "Settings"}
              size={20}
              className="text-primary"
            />
            {mode === "create" ? "Tambah Program Studi" : "Edit Program Studi"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nama Program Studi <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Teknik Informatika"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Kode <span className="text-destructive">*</span>
            </label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Contoh: TI"
              disabled={isLoading}
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="strata" className="text-sm font-medium">
              Strata <span className="text-destructive">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {STRATA_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStrata(option.value)}
                  disabled={isLoading}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    strata === option.value
                      ? "bg-primary text-white border-primary"
                      : "bg-background border-border hover:bg-accent"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="fakultas" className="text-sm font-medium">
              Fakultas <span className="text-destructive">*</span>
            </label>
            {isLoadingFaculties ? (
              <div className="text-sm text-muted-foreground">
                Memuat data fakultas...
              </div>
            ) : (
              <select
                id="fakultas"
                value={fakultasId}
                onChange={(e) =>
                  setFakultasId(e.target.value ? Number(e.target.value) : "")
                }
                disabled={isLoading}
                className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Pilih Fakultas</option>
                {faculties.map((fakultas) => (
                  <option key={fakultas.id} value={fakultas.id}>
                    {fakultas.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="kaprodi" className="text-sm font-medium">
              Kaprodi ID <span className="text-muted-foreground">(Opsional)</span>
            </label>
            <Input
              id="kaprodi"
              type="number"
              value={kaprodiId}
              onChange={(e) =>
                setKaprodiId(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="Masukkan ID Kaprodi"
              disabled={isLoading}
            />
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
