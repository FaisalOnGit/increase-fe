import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getKalenders,
  deleteKalender,
  activateKalender,
  deactivateKalender,
} from "@/api/kalender";
import { PKMKalender } from "@/types/api.types";
import { KalenderFormModal } from "@/components/kalender/KalenderFormModal";
import { getStatusBadge } from "@/utils/badge-utils";

export const PeriodeManagement: React.FC = () => {
  const [kalenders, setKalenders] = useState<PKMKalender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedKalender, setSelectedKalender] = useState<PKMKalender | null>(null);

  useEffect(() => {
    fetchKalenders();
  }, [currentPage, searchTerm]);

  const fetchKalenders = async () => {
    setIsLoading(true);
    try {
      const response = await getKalenders({
        page: currentPage,
        per_page: itemsPerPage,
        search: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setKalenders(response.data);
      } else {
        console.error("Failed to fetch kalenders:", response.message);
      }
    } catch (error) {
      console.error("Error fetching kalenders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, tahun: number) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus kalender tahun "${tahun}"?`)) {
      return;
    }

    try {
      const response = await deleteKalender(id);
      if (response.success) {
        fetchKalenders();
        alert("Kalender berhasil dihapus");
      } else {
        alert(`Gagal menghapus kalender: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting kalender:", error);
      alert("Terjadi kesalahan saat menghapus kalender");
    }
  };

  const handleToggleActive = async (id: number, tahun: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    if (!confirm(`Apakah Anda yakin ingin mengubah status kalender "${tahun}" menjadi ${newStatus ? 'Aktif' : 'Nonaktif'}?`)) {
      return;
    }

    try {
      const response = newStatus
        ? await activateKalender(id)
        : await deactivateKalender(id);

      if (response.success) {
        fetchKalenders();
        alert(`Status kalender berhasil diperbarui`);
      } else {
        alert(`Gagal mengubah status: ${response.message}`);
      }
    } catch (error) {
      console.error("Error toggling kalender status:", error);
      alert("Terjadi kesalahan saat mengubah status");
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedKalender(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (kalender: PKMKalender) => {
    setModalMode("edit");
    setSelectedKalender(kalender);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedKalender(null);
  };

  const handleModalSuccess = () => {
    fetchKalenders();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Filter kalenders based on search term
  const filteredKalenders = kalenders.filter((k) =>
    k.tahun.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredKalenders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedKalenders = filteredKalenders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Master", href: "/dashboard/master" },
            { name: "Master Periode", href: "/dashboard/master/periode" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Master Periode PKM</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola kalender pelaksanaan PKM
          </p>
        </div>
        <Button onClick={handleOpenCreateModal}>
          <Icon name="Calendar" size={16} className="mr-2" />
          Tambah Kalender
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Calendar" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{kalenders.length}</p>
                <p className="text-xs text-muted-foreground">Total Kalender</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Icon name="PlayCircle" size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {kalenders.filter((k) => k.is_active).length}
                </p>
                <p className="text-xs text-muted-foreground">Kalender Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="FileText" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {kalenders
                    .filter((k) => k.is_active)
                    .reduce((acc, k) => acc + k.tahun, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Tahun Aktif</p>
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
              placeholder="Cari tahun..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Kalender Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kalender PKM</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Memuat data...
            </div>
          ) : kalenders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Tidak ada data kalender
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tahun</TableHead>
                    <TableHead>Pengajuan</TableHead>
                    <TableHead>Penilaian</TableHead>
                    <TableHead>Pengumuman</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedKalenders.map((kalenderItem) => (
                    <TableRow key={kalenderItem.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              kalenderItem.is_active
                                ? "bg-emerald-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <Icon
                              name="Calendar"
                              size={20}
                              className={
                                kalenderItem.is_active
                                  ? "text-emerald-600"
                                  : "text-gray-600"
                              }
                            />
                          </div>
                          <p className="text-sm font-medium">
                            {kalenderItem.tahun}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{formatDate(kalenderItem.tanggal_mulai_pengajuan)}</p>
                          <p className="text-muted-foreground">
                            s/d {formatDate(kalenderItem.tanggal_selesai_pengajuan)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{formatDate(kalenderItem.tanggal_mulai_penilaian)}</p>
                          <p className="text-muted-foreground">
                            s/d {formatDate(kalenderItem.tanggal_selesai_penilaian)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatDate(kalenderItem.tanggal_pengumuman)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={kalenderItem.is_active ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() =>
                            handleToggleActive(
                              kalenderItem.id,
                              kalenderItem.tahun,
                              kalenderItem.is_active
                            )
                          }
                          title="Klik untuk toggle status"
                        >
                          {kalenderItem.is_active ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Toggle Status"
                            onClick={() =>
                              handleToggleActive(
                                kalenderItem.id,
                                kalenderItem.tahun,
                                kalenderItem.is_active
                              )
                            }
                          >
                            <Icon
                              name={kalenderItem.is_active ? "ToggleLeft" : "ToggleRight"}
                              size={16}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit"
                            onClick={() => handleOpenEditModal(kalenderItem)}
                          >
                            <Icon name="Settings" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            title="Hapus"
                            onClick={() =>
                              handleDelete(kalenderItem.id, kalenderItem.tahun)
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

              {/* Pagination */}
              <div className="px-6 py-4 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan {startIndex + 1} hingga{" "}
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredKalenders.length
                    )}{" "}
                    dari {filteredKalenders.length} kalender
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

      {/* Kalender Form Modal */}
      <KalenderFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        kalender={selectedKalender}
        mode={modalMode}
      />
    </div>
  );
};
