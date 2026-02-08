import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getKriteriaByPKMId,
  deleteKriteria,
  createKriteria,
  updateKriteria,
  duplicateKriteria,
} from "@/api/kriteria-pkm";
import { getActivePKMs } from "@/api/pkm";
import { KriteriaPKM, JenisPKM } from "@/types/api.types";

export const KriteriaPKMManagement: React.FC = () => {
  const [kriteriaList, setKriteriaList] = useState<KriteriaPKM[]>([]);
  const [pkmList, setPkmList] = useState<JenisPKM[]>([]);
  const [selectedPkm, setSelectedPkm] = useState<JenisPKM | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [editingKriteria, setEditingKriteria] = useState<KriteriaPKM | null>(null);
  const [targetPkmId, setTargetPkmId] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    urutan: 1,
    judul: "",
    kriteria: "",
    bobot: 0,
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPKMs();
  }, []);

  useEffect(() => {
    if (selectedPkm) {
      fetchKriteria();
    }
  }, [selectedPkm]);

  const fetchPKMs = async () => {
    try {
      const response = await getActivePKMs();
      if (response.success && response.data) {
        setPkmList(response.data);
        if (response.data.length > 0 && !selectedPkm) {
          setSelectedPkm(response.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching PKMs:", error);
    }
  };

  const fetchKriteria = async () => {
    if (!selectedPkm) return;
    setIsLoading(true);
    try {
      const response = await getKriteriaByPKMId(selectedPkm.id);
      if (response.success && response.data) {
        setKriteriaList(response.data);
      } else {
        console.error("Failed to fetch kriteria:", response.message);
      }
    } catch (error) {
      console.error("Error fetching kriteria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingKriteria(null);
    setFormData({
      urutan: kriteriaList.length + 1,
      judul: "",
      kriteria: "",
      bobot: 0,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (kriteria: KriteriaPKM) => {
    setEditingKriteria(kriteria);
    setFormData({
      urutan: kriteria.urutan,
      judul: kriteria.judul,
      kriteria: kriteria.kriteria,
      bobot: kriteria.bobot,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number, judul: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus kriteria "${judul}"?`)) {
      return;
    }

    try {
      const response = await deleteKriteria(id);
      if (response.success) {
        fetchKriteria();
        alert("Kriteria berhasil dihapus");
      } else {
        alert(`Gagal menghapus kriteria: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting kriteria:", error);
      alert("Terjadi kesalahan saat menghapus kriteria");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    if (!selectedPkm) {
      alert("Silakan pilih jenis PKM terlebih dahulu");
      setIsSubmitting(false);
      return;
    }

    try {
      let response;
      if (editingKriteria) {
        response = await updateKriteria(editingKriteria.id, formData);
      } else {
        response = await createKriteria(selectedPkm.id, formData);
      }

      if (response.success) {
        fetchKriteria();
        setIsModalOpen(false);
        alert(
          editingKriteria
            ? "Kriteria berhasil diperbarui"
            : "Kriteria berhasil ditambahkan"
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

  const handleDuplicate = async () => {
    if (!selectedPkm || !targetPkmId) {
      alert("Silakan pilih PKM tujuan");
      return;
    }

    if (selectedPkm.id === targetPkmId) {
      alert("Tidak dapat menduplikasi ke PKM yang sama");
      return;
    }

    try {
      const response = await duplicateKriteria(selectedPkm.id, {
        target_pkm_id: targetPkmId,
        overwrite: false,
      });

      if (response.success) {
        setIsDuplicateModalOpen(false);
        setTargetPkmId(null);
        alert(response.message || "Kriteria berhasil diduplikasi");
      } else {
        alert(`Gagal menduplikasi: ${response.message}`);
      }
    } catch (error) {
      console.error("Error duplicating kriteria:", error);
      alert("Terjadi kesalahan saat menduplikasi kriteria");
    }
  };

  const totalBobot = kriteriaList.reduce((sum, k) => sum + k.bobot, 0);
  const isComplete = totalBobot === 100;

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Master", href: "/dashboard/master" },
            { name: "Kriteria PKM", href: "/dashboard/master/kriteria-pkm" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Kriteria PKM</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola kriteria penilaian untuk setiap jenis PKM
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsDuplicateModalOpen(true)}
            disabled={!selectedPkm || kriteriaList.length === 0}
          >
            <Icon name="Copy" size={16} className="mr-2" />
            Duplikasi
          </Button>
          <Button onClick={handleCreate} disabled={!selectedPkm}>
            <Icon name="Plus" size={16} className="mr-2" />
            Tambah Kriteria
          </Button>
        </div>
      </div>

      {/* PKM Selector & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Pilih Jenis PKM</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <select
              className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={selectedPkm?.id || ""}
              onChange={(e) => {
                const pkm = pkmList.find((p) => p.id === Number(e.target.value));
                setSelectedPkm(pkm || null);
              }}
            >
              {pkmList.map((pkm) => (
                <option key={pkm.id} value={pkm.id}>
                  {pkm.singkatan} - {pkm.nama}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="List" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{kriteriaList.length}</p>
                <p className="text-xs text-muted-foreground">Total Kriteria</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isComplete ? "bg-emerald-100" : "bg-amber-100"
                }`}
              >
                <Icon
                  name="Percent"
                  size={20}
                  className={isComplete ? "text-emerald-600" : "text-amber-600"}
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalBobot}%</p>
                <p className="text-xs text-muted-foreground">Total Bobot</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isComplete ? "bg-emerald-100" : "bg-red-100"
                }`}
              >
                <Icon
                  name={isComplete ? "CheckCircle" : "XCircle"}
                  size={20}
                  className={isComplete ? "text-emerald-600" : "text-red-600"}
                />
              </div>
              <div>
                <p className="text-lg font-bold">
                  {isComplete ? "Lengkap" : "Belum Lengkap"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isComplete
                    ? "Total bobot sudah 100%"
                    : `Kurang ${100 - totalBobot}%`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kriteria Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Daftar Kriteria - {selectedPkm?.singkatan || "Pilih PKM"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Memuat data...
            </div>
          ) : !selectedPkm ? (
            <div className="p-8 text-center text-muted-foreground">
              Silakan pilih jenis PKM terlebih dahulu
            </div>
          ) : kriteriaList.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Belum ada kriteria untuk jenis PKM ini
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">No</TableHead>
                    <TableHead>Judul Kriteria</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead className="text-center">Bobot</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kriteriaList
                    .sort((a, b) => a.urutan - b.urutan)
                    .map((kriteria) => (
                      <TableRow key={kriteria.id}>
                        <TableCell>
                          <Badge variant="outline">{kriteria.urutan}</Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{kriteria.judul}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {kriteria.kriteria}
                          </p>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={kriteria.bobot > 0 ? "default" : "secondary"}
                          >
                            {kriteria.bobot}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit"
                              onClick={() => handleEdit(kriteria)}
                            >
                              <Icon name="Settings" size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              title="Hapus"
                              onClick={() =>
                                handleDelete(kriteria.id, kriteria.judul)
                              }
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="List" size={20} />
              {editingKriteria ? "Edit Kriteria" : "Tambah Kriteria Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingKriteria
                ? "Edit informasi kriteria penilaian."
                : "Tambah kriteria penilaian baru untuk PKM ini."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="urutan">
                  Urutan <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="urutan"
                  name="urutan"
                  type="number"
                  min="1"
                  value={formData.urutan}
                  onChange={(e) =>
                    setFormData({ ...formData, urutan: Number(e.target.value) })
                  }
                  disabled={isSubmitting}
                  className={errors.urutan ? "border-destructive" : ""}
                />
                {errors.urutan && (
                  <p className="text-sm text-destructive">{errors.urutan[0]}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="judul">
                  Judul Kriteria <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="judul"
                  name="judul"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  placeholder="Contoh: Kreativitas dan Inovasi"
                  disabled={isSubmitting}
                  className={errors.judul ? "border-destructive" : ""}
                />
                {errors.judul && (
                  <p className="text-sm text-destructive">{errors.judul[0]}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kriteria">
                  Deskripsi Kriteria <span className="text-destructive">*</span>
                </Label>
                <textarea
                  id="kriteria"
                  name="kriteria"
                  value={formData.kriteria}
                  onChange={(e) =>
                    setFormData({ ...formData, kriteria: e.target.value })
                  }
                  placeholder="Jelaskan kriteria penilaian secara detail..."
                  disabled={isSubmitting}
                  rows={4}
                  className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.kriteria ? "border-destructive" : ""
                  }`}
                />
                {errors.kriteria && (
                  <p className="text-sm text-destructive">{errors.kriteria[0]}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bobot">
                  Bobot (%) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="bobot"
                  name="bobot"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.bobot}
                  onChange={(e) =>
                    setFormData({ ...formData, bobot: Number(e.target.value) })
                  }
                  placeholder="0-100"
                  disabled={isSubmitting}
                  className={errors.bobot ? "border-destructive" : ""}
                />
                {errors.bobot && (
                  <p className="text-sm text-destructive">{errors.bobot[0]}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Total bobot saat ini: {totalBobot}% (target: 100%)
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : editingKriteria ? (
                  <>
                    <Icon name="Check" size={16} className="mr-2" />
                    Simpan Perubahan
                  </>
                ) : (
                  <>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Tambah Kriteria
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Duplicate Modal */}
      <Dialog open={isDuplicateModalOpen} onOpenChange={setIsDuplicateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Copy" size={20} />
              Duplikasi Kriteria
            </DialogTitle>
            <DialogDescription>
              Salin semua kriteria dari {selectedPkm?.singkatan} ke jenis PKM lain
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="target_pkm">
                PKM Tujuan <span className="text-destructive">*</span>
              </Label>
              <select
                id="target_pkm"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={targetPkmId || ""}
                onChange={(e) => setTargetPkmId(Number(e.target.value))}
              >
                <option value="">Pilih PKM Tujuan</option>
                {pkmList
                  .filter((p) => p.id !== selectedPkm?.id)
                  .map((pkm) => (
                    <option key={pkm.id} value={pkm.id}>
                      {pkm.singkatan} - {pkm.nama}
                    </option>
                  ))}
              </select>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Info:</strong> Semua kriteria dari {selectedPkm?.singkatan}{" "}
                akan disalin ke PKM tujuan. Pastikan total bobot tidak melebihi 100%.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDuplicateModalOpen(false)}
            >
              Batal
            </Button>
            <Button onClick={handleDuplicate} disabled={!targetPkmId}>
              <Icon name="Copy" size={16} className="mr-2" />
              Duplikasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
