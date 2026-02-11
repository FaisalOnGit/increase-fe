import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { useAvailablePKM, useAvailableAnggota, useAvailablePembimbing } from "@/hooks/useProposal";
import { MahasiswaProposal, CreateProposalData } from "@/types/api.types";

interface ProposalFormModalProps {
  show: boolean;
  editingProposal: MahasiswaProposal | null;
  onClose: () => void;
  onSubmit: (data: CreateProposalData) => Promise<{ success: boolean; message?: string }>;
  onEdit: (id: number, data: Partial<CreateProposalData>) => Promise<{ success: boolean; message?: string }>;
  loading?: boolean;
}

export const ProposalFormModal = ({
  show,
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
    resetForm();
    onClose();
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredPkms = pkms.filter(
    (pkm) =>
      pkm.nama.toLowerCase().includes(searchPkm.toLowerCase()) ||
      pkm.singkatan.toLowerCase().includes(searchPkm.toLowerCase())
  );

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle>
              {editingProposal ? "Edit Proposal" : "Ajukan Proposal Baru"}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </CardHeader>

        <form
          onSubmit={editingProposal ? handleEdit : handleSubmit}
          className="space-y-6"
        >
          <CardContent className="space-y-4">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Judul Proposal <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                placeholder="Masukkan judul proposal"
                required
              />
            </div>

            {/* PKM */}
            {!editingProposal && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Jenis PKM <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={searchPkm}
                    onChange={(e) => setSearchPkm(e.target.value)}
                    placeholder="Cari jenis PKM..."
                    className="mb-2"
                  />
                  <select
                    value={formData.pkm_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pkm_id: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-input rounded-md px-3 py-2 focus:ring-2 focus:ring-ring focus:border-ring"
                    required
                  >
                    <option value={0}>Pilih Jenis PKM</option>
                    {pkmsLoading ? (
                      <option disabled>Loading...</option>
                    ) : (
                      filteredPkms.map((pkm) => (
                        <option key={pkm.id} value={pkm.id}>
                          {pkm.singkatan} - {pkm.nama}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Pembimbing */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Dosen Pembimbing <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={searchPembimbing}
                    onChange={(e) => setSearchPembimbing(e.target.value)}
                    placeholder="Cari dosen pembimbing..."
                    className="mb-2"
                  />
                  <select
                    value={formData.pembimbing_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pembimbing_id: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-input rounded-md px-3 py-2 focus:ring-2 focus:ring-ring focus:border-ring"
                    required
                  >
                    <option value={0}>Pilih Dosen Pembimbing</option>
                    {pembimbing.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - {p.email}
                        {p.prodi ? ` (${p.prodi.name})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Anggota */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Anggota Tim
                  </label>
                  <Input
                    type="text"
                    value={searchAnggota}
                    onChange={(e) => setSearchAnggota(e.target.value)}
                    placeholder="Cari mahasiswa..."
                    className="mb-2"
                  />
                  <div className="border border-input rounded-md p-3 max-h-40 overflow-y-auto">
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
                  <p className="text-sm text-muted-foreground mt-1">
                    Terpilih: {selectedAnggotaIds.length} anggota
                  </p>
                </div>
              </>
            )}

            {/* File Proposal */}
            <div>
              <label className="block text-sm font-medium mb-1">
                File Proposal {editingProposal && "(Opsional untuk update)"}
                {!editingProposal && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    file_proposal: e.target.files?.[0] || null,
                  })
                }
                {...(!editingProposal && { required: true })}
              />
              {editingProposal && (
                <p className="text-sm text-muted-foreground mt-1">
                  Biarkan kosong jika tidak ingin mengubah file
                </p>
              )}
            </div>
          </CardContent>

          <div className="px-6 pb-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Memproses..."
                : editingProposal
                  ? "Update"
                  : "Ajukan"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
