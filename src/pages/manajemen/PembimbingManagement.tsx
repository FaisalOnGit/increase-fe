import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Input } from "@/components/ui/input";
import { getQuotaBadge, getQuotaProgress } from "@/utils/badge-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useDosen } from "@/hooks/useDosen";
import { Dosen } from "@/types/api.types";

export const PembimbingManagement: React.FC = () => {
  const {
    dosenList,
    loading,
    fetchDosen,
    updateQuota,
    resetQuota,
    removeDosen,
  } = useDosen();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState<Dosen | null>(null);
  const [newKuota, setNewKuota] = useState<number>(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDosen({ page: currentPage, per_page: itemsPerPage });
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDosen({ search: searchTerm, page: 1, per_page: itemsPerPage });
  };

  const openEditModal = (dosen: Dosen) => {
    setSelectedDosen(dosen);
    setNewKuota(dosen.kuota);
    setEditModalOpen(true);
  };

  const handleUpdateQuota = async () => {
    if (!selectedDosen) return;

    setSubmitting(true);
    const result = await updateQuota(selectedDosen.id, { kuota: newKuota });

    if (result.success) {
      alert("Kuota berhasil diupdate");
      setEditModalOpen(false);
    } else {
      alert(result.message || "Gagal mengupdate kuota");
    }
    setSubmitting(false);
  };

  const handleResetQuota = async (dosen: Dosen) => {
    if (!confirm(`Reset kuota untuk ${dosen.nama}?`)) return;

    const result = await resetQuota(dosen.id);
    if (result.success) {
      alert("Kuota berhasil direset");
    } else {
      alert(result.message || "Gagal mereset kuota");
    }
  };

  const handleDelete = async (dosen: Dosen) => {
    if (!confirm(`Hapus ${dosen.nama}?`)) return;

    const result = await removeDosen(dosen.id);
    if (result.success) {
      alert("Dosen berhasil dihapus");
    } else {
      alert(result.message || "Gagal menghapus dosen");
    }
  };

  const totalPages =
    dosenList.length > 0 ? Math.ceil(dosenList.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDosen = dosenList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Manajemen", href: "/dashboard/manajemen" },
            {
              name: "Manajemen Pembimbing",
              href: "/dashboard/manajemen/pembimbing",
            },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pembimbing</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data pembimbing PKM dan kuota pembimbingan
          </p>
        </div>
        <Button>
          <Icon name="UserPlus" size={16} className="mr-2" />
          Tambah Pembimbing
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Users" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dosenList.length}</p>
                <p className="text-xs text-muted-foreground">
                  Total Pembimbing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Icon
                  name="CheckCircle"
                  size={20}
                  className="text-emerald-600"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {dosenList.filter((p) => p.terpakai < p.kuota).length}
                </p>
                <p className="text-xs text-muted-foreground">Tersedia</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Icon name="XCircle" size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {dosenList.filter((p) => p.terpakai >= p.kuota).length}
                </p>
                <p className="text-xs text-muted-foreground">Kuota Penuh</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="Target" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {dosenList.reduce(
                    (acc, p) => acc + (p.kuota - p.terpakai),
                    0,
                  )}
                </p>
                <p className="text-xs text-muted-foreground">Sisa Kuota</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Cari nama, NIDN, prodi, atau fakultas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pembimbing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pembimbing PKM</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Memuat data...
            </div>
          ) : paginatedDosen.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Tidak ada data pembimbing
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pembimbing</TableHead>
                    <TableHead>NIDN</TableHead>
                    <TableHead>Prodi / Fakultas</TableHead>
                    <TableHead className="text-center">
                      Kuota Pembimbingan
                    </TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDosen.map((pembimbing) => (
                    <TableRow key={pembimbing.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-primary/10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {pembimbing.nama
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {pembimbing.nama}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {pembimbing.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">
                          {pembimbing.nidn}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">
                            {pembimbing.prodi}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {pembimbing.fakultas}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="w-32 mx-auto">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{pembimbing.terpakai}</span>
                            <span>{pembimbing.kuota}</span>
                          </div>
                          {getQuotaProgress(
                            pembimbing.kuota,
                            pembimbing.terpakai,
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getQuotaBadge(pembimbing.kuota, pembimbing.terpakai)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Lihat Detail"
                          >
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit Kuota"
                            onClick={() => openEditModal(pembimbing)}
                          >
                            <Icon name="Settings" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Reset Kuota"
                            onClick={() => handleResetQuota(pembimbing)}
                          >
                            <Icon name="RotateCcw" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            title="Hapus"
                            onClick={() => handleDelete(pembimbing)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="px-6 py-4 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan {startIndex + 1} hingga{" "}
                    {Math.min(startIndex + itemsPerPage, dosenList.length)} dari{" "}
                    {dosenList.length} pembimbing
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </Button>
                    <span className="px-3 py-1 text-sm">
                      Halaman {currentPage} dari {totalPages || 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Quota Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kuota Pembimbing</DialogTitle>
            <DialogDescription>{selectedDosen?.nama}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="kuota">Kuota Pembimbingan</Label>
              <Input
                id="kuota"
                type="number"
                min={1}
                max={20}
                value={newKuota}
                onChange={(e) => setNewKuota(parseInt(e.target.value) || 5)}
              />
              <p className="text-xs text-muted-foreground">
                Kuota saat ini: {selectedDosen?.terpakai} /{" "}
                {selectedDosen?.kuota}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditModalOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button onClick={handleUpdateQuota} disabled={submitting}>
              {submitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
