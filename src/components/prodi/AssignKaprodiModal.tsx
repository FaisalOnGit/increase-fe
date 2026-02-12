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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Prodi, User } from "@/types/api.types";
import { assignKaprodi } from "@/api/prodi";
import { getAvailableKajur } from "@/api/users";
import { toastSuccess, toastError } from "@/lib/toast";

interface AssignKaprodiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  prodi: Prodi | null;
}

export const AssignKaprodiModal: React.FC<AssignKaprodiModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  prodi,
}) => {
  const [kaprodiId, setKaprodiId] = useState<number | "">("");
  const [availableKajur, setAvailableKajur] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingKajur, setIsLoadingKajur] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && prodi) {
      setKaprodiId(prodi.kaprodi_id || "");
      setError("");
      setSearchTerm("");
      fetchAvailableKajur();
    }
  }, [isOpen, prodi]);

  const fetchAvailableKajur = async (search?: string) => {
    setIsLoadingKajur(true);
    try {
      const response = await getAvailableKajur({
        search,
        per_page: 50,
      });
      if (response.success && response.data) {
        setAvailableKajur(response.data);
      }
    } catch (err) {
      console.error("Error fetching available kajur:", err);
    } finally {
      setIsLoadingKajur(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 2 || value.length === 0) {
      fetchAvailableKajur(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!prodi) {
      setError("Program studi tidak valid");
      return;
    }

    if (!kaprodiId) {
      setError("Silakan pilih kaprodi");
      return;
    }

    setIsLoading(true);

    try {
      const response = await assignKaprodi(prodi.id, {
        kaprodi_id: Number(kaprodiId),
      });

      if (response.success) {
        toastSuccess(response.message || "Kaprodi berhasil ditugaskan");
        onSuccess();
        onClose();
      } else {
        setError(response.message || "Gagal menugaskan kaprodi");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menugaskan kaprodi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const selectedKajur = availableKajur.find((k) => k.id === kaprodiId);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="UserCog" size={20} className="text-primary" />
            Tugaskan Kaprodi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Program Studi</p>
            <p className="font-medium">{prodi?.name || "-"}</p>
            {prodi?.code && (
              <p className="text-xs text-muted-foreground">
                Kode: {prodi.code} • Strata: {prodi.strata}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">
                Cari Kajur
              </Label>
              <div className="relative">
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Cari nama atau email kajur..."
                  className="pl-10"
                  disabled={isLoadingKajur || isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kaprodi">
                Pilih Kaprodi <span className="text-destructive">*</span>
              </Label>
              {isLoadingKajur ? (
                <div className="text-sm text-muted-foreground py-2">
                  Memuat data kajur...
                </div>
              ) : (
                <Select
                  value={
                    typeof kaprodiId === "string"
                      ? kaprodiId
                      : kaprodiId.toString()
                  }
                  onValueChange={(value) =>
                    setKaprodiId(value === "" ? "" : Number(value))
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kajur" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableKajur.length === 0 ? (
                      <div className="p-2 text-sm text-muted-foreground text-center">
                        {searchTerm
                          ? "Tidak ada kajur ditemukan"
                          : "Tidak ada kajur tersedia"}
                      </div>
                    ) : (
                      availableKajur.map((kajur) => (
                        <SelectItem
                          key={kajur.id}
                          value={kajur.id.toString()}
                        >
                          <div className="flex items-center gap-2">
                            <span>{kajur.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({kajur.email})
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}

              {selectedKajur && (
                <div className="p-2 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground">Kaprodi terpilih:</p>
                  <p className="text-sm font-medium">{selectedKajur.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedKajur.email}
                  </p>
                </div>
              )}
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
              <Button type="submit" disabled={isLoading || !kaprodiId}>
                {isLoading ? (
                  <>
                    <Icon
                      name="Loader2"
                      size={16}
                      className="mr-2 animate-spin"
                    />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Icon name="Check" size={16} className="mr-2" />
                    Tugaskan
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
