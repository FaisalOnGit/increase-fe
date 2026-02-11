import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAvailablePKM,
  useAvailableAnggota,
  useAvailablePembimbing,
} from "@/hooks/useProposal";
import { MahasiswaProposal, CreateProposalData } from "@/types/api.types";

interface ProposalFormModalProps {
  isOpen: boolean;
  editingProposal: MahasiswaProposal | null;
  onClose: () => void;
  onSubmit: (
    data: CreateProposalData,
  ) => Promise<{ success: boolean; message?: string }>;
  onEdit: (
    id: number,
    data: Partial<CreateProposalData>,
  ) => Promise<{ success: boolean; message?: string }>;
  loading?: boolean;
}

export const ProposalFormModal = ({
  isOpen,
  editingProposal,
  onClose,
  onSubmit,
  onEdit,
  loading = false,
}: ProposalFormModalProps) => {
  const { pkms, loading: pkmsLoading } = useAvailablePKM();
  const { anggota, fetchAnggota } = useAvailableAnggota();
  const { pembimbing, fetchPembimbing } = useAvailablePembimbing();

  const [formData, setFormData] = useState({
    judul: "",
    pkm_id: 0,
    pembimbing_id: 0,
    file_proposal: null as File | null,
  });

  const [selectedAnggotaIds, setSelectedAnggotaIds] = useState<number[]>([]);
  const [searchAnggota, setSearchAnggota] = useState("");
  const [searchPembimbing, setSearchPembimbing] = useState("");
  const [searchPkm, setSearchPkm] = useState("");

  useEffect(() => {
    if (searchAnggota) {
      fetchAnggota(searchAnggota);
    } else {
      fetchAnggota();
    }
  }, [searchAnggota]);

  useEffect(() => {
    if (searchPembimbing) {
      fetchPembimbing(searchPembimbing);
    } else {
      fetchPembimbing();
    }
  }, [searchPembimbing]);

  const resetForm = () => {
    setFormData({
      judul: "",
      pkm_id: 0,
      pembimbing_id: 0,
      file_proposal: null,
    });
    setSelectedAnggotaIds([]);
    setSearchAnggota("");
    setSearchPembimbing("");
    setSearchPkm("");
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.pkm_id ||
      !formData.pembimbing_id ||
      !formData.file_proposal
    ) {
      return;
    }

    const data: CreateProposalData = {
      judul: formData.judul,
      pkm_id: formData.pkm_id,
      anggota_ids: selectedAnggotaIds,
      pembimbing_id: formData.pembimbing_id,
      file_proposal: formData.file_proposal,
    };

    await onSubmit(data);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProposal) return;

    await onEdit(editingProposal.id, {
      judul: formData.judul,
      file_proposal: formData.file_proposal || undefined,
    });
  };

  const toggleAnggota = (id: number) => {
    setSelectedAnggotaIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const filteredPkms = pkms.filter(
    (pkm) =>
      pkm.nama.toLowerCase().includes(searchPkm.toLowerCase()) ||
      pkm.singkatan.toLowerCase().includes(searchPkm.toLowerCase()),
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon
              name={editingProposal ? "Edit" : "Plus"}
              size={20}
              className="text-primary"
            />
            {editingProposal ? "Edit Proposal" : "Ajukan Proposal Baru"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={editingProposal ? handleEdit : handleSubmit}
          className="space-y-4 mt-4"
        >
          {/* Judul */}
          <div className="space-y-2">
            <Label htmlFor="judul">
              Judul Proposal <span className="text-destructive">*</span>
            </Label>
            <Input
              id="judul"
              type="text"
              value={formData.judul}
              onChange={(e) =>
                setFormData({ ...formData, judul: e.target.value })
              }
              placeholder="Masukkan judul proposal"
              disabled={loading}
              required
              autoFocus
            />
          </div>

          {/* PKM */}
          {!editingProposal && (
            <>
              <div className="space-y-2">
                <Label htmlFor="pkm">
                  Jenis PKM <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pkm"
                  type="text"
                  value={searchPkm}
                  onChange={(e) => setSearchPkm(e.target.value)}
                  placeholder="Cari jenis PKM..."
                  disabled={loading || pkmsLoading}
                />
                <Select
                  value={
                    formData.pkm_id === 0 ? "" : formData.pkm_id.toString()
                  }
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      pkm_id: parseInt(value),
                    })
                  }
                  disabled={loading || pkmsLoading}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Jenis PKM" />
                  </SelectTrigger>
                  <SelectContent>
                    {pkmsLoading ? (
                      <div className="p-2 text-center text-sm text-muted-foreground">
                        Loading...
                      </div>
                    ) : (
                      filteredPkms.map((pkm) => (
                        <SelectItem key={pkm.id} value={pkm.id.toString()}>
                          {pkm.singkatan} - {pkm.nama}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Pembimbing */}
              <div className="space-y-2">
                <Label htmlFor="pembimbing">
                  Dosen Pembimbing <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pembimbing"
                  type="text"
                  value={searchPembimbing}
                  onChange={(e) => setSearchPembimbing(e.target.value)}
                  placeholder="Cari dosen pembimbing..."
                  disabled={loading}
                />
                <Select
                  value={formData.pembimbing_id.toString()}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      pembimbing_id: value === "" ? 0 : parseInt(value),
                    })
                  }
                  disabled={loading}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Dosen Pembimbing" />
                  </SelectTrigger>
                  <SelectContent>
                    {pembimbing.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.name} - {p.email}
                        {p.prodi ? ` (${p.prodi.name})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Anggota */}
              <div className="space-y-2">
                <Label htmlFor="anggota">Anggota Tim</Label>
                <Input
                  id="anggota"
                  type="text"
                  value={searchAnggota}
                  onChange={(e) => setSearchAnggota(e.target.value)}
                  placeholder="Cari mahasiswa..."
                  disabled={loading}
                />
                <div className="border border-input rounded-lg p-3 max-h-40 overflow-y-auto">
                  {anggota.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center p-2 hover:bg-accent rounded"
                    >
                      <input
                        type="checkbox"
                        id={`anggota-${a.id}`}
                        checked={selectedAnggotaIds.includes(a.id)}
                        onChange={() => toggleAnggota(a.id)}
                        disabled={loading}
                        className="mr-3"
                      />
                      <label
                        htmlFor={`anggota-${a.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">{a.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {a.email}
                        </div>
                        {a.prodi && (
                          <div className="text-xs text-muted-foreground">
                            {a.prodi.name}
                          </div>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Terpilih: {selectedAnggotaIds.length} anggota
                </p>
              </div>
            </>
          )}

          {/* File Proposal */}
          <div className="space-y-2">
            <Label htmlFor="file">
              File Proposal{" "}
              {editingProposal && (
                <span className="text-muted-foreground">(Opsional)</span>
              )}
              {!editingProposal && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  file_proposal: e.target.files?.[0] || null,
                })
              }
              disabled={loading}
              {...(!editingProposal && { required: true })}
            />
            {editingProposal && (
              <p className="text-sm text-muted-foreground">
                Biarkan kosong jika tidak ingin mengubah file
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="mr-2 animate-spin"
                  />
                  Memproses...
                </>
              ) : editingProposal ? (
                <>
                  <Icon name="Check" size={16} className="mr-2" />
                  Update
                </>
              ) : (
                <>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Ajukan
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
