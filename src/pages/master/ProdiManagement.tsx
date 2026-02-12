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
import { getProdis, deleteProdi } from "@/api/prodi";
import { Prodi } from "@/types/api.types";
import { ProdiFormModal } from "@/components/prodi/ProdiFormModal";
import { AssignKaprodiModal } from "@/components/prodi/AssignKaprodiModal";
import { getStrataBadge } from "@/utils/badge-utils";

export const ProdiManagement: React.FC = () => {
  const [prodis, setProdis] = useState<Prodi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedProdi, setSelectedProdi] = useState<Prodi | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  useEffect(() => {
    fetchProdis();
  }, [currentPage, searchTerm]);

  const fetchProdis = async () => {
    setIsLoading(true);
    try {
      const response = await getProdis({
        page: currentPage,
        per_page: itemsPerPage,
        search: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setProdis(response.data);
      } else {
        console.error("Failed to fetch prodis:", response.message);
      }
    } catch (error) {
      console.error("Error fetching prodis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (
      !confirm(`Apakah Anda yakin ingin menghapus program studi "${name}"?`)
    ) {
      return;
    }

    try {
      const response = await deleteProdi(id);
      if (response.success) {
        fetchProdis();
        alert("Program studi berhasil dihapus");
      } else {
        alert(`Gagal menghapus program studi: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting prodi:", error);
      alert("Terjadi kesalahan saat menghapus program studi");
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedProdi(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prodi: Prodi) => {
    setModalMode("edit");
    setSelectedProdi(prodi);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProdi(null);
  };

  const handleModalSuccess = () => {
    fetchProdis();
  };

  const handleOpenAssignModal = (prodi: Prodi) => {
    setSelectedProdi(prodi);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedProdi(null);
  };

  const handleAssignSuccess = () => {
    fetchProdis();
    setIsAssignModalOpen(false);
    setSelectedProdi(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Master", href: "/dashboard/master" },
            { name: "Master Prodi", href: "/dashboard/master/prodi" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Master Program Studi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data program studi
          </p>
        </div>
        <Button onClick={handleOpenCreateModal}>
          <Icon name="BookOpen" size={16} className="mr-2" />
          Tambah Prodi
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="BookOpen" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{prodis.length}</p>
                <p className="text-xs text-muted-foreground">Total Prodi</p>
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
                  {prodis.filter((p) => p.strata === "S1").length}
                </p>
                <p className="text-xs text-muted-foreground">Program S1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="Award" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {
                    prodis.filter((p) => p.strata === "S2" || p.strata === "S3")
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground">
                  Program Pascasarjana
                </p>
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
              placeholder="Cari nama prodi atau kode..."
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

      {/* Prodi Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Program Studi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Memuat data...
            </div>
          ) : prodis.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Tidak ada data program studi
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Prodi</TableHead>
                    <TableHead>Kode</TableHead>
                    <TableHead>Fakultas</TableHead>
                    <TableHead className="text-center">Strata</TableHead>
                    <TableHead className="text-center">Kaprodi</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prodis.map((prodiItem) => (
                    <TableRow key={prodiItem.id}>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">
                            {prodiItem.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono font-medium">
                          {prodiItem.code}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {prodiItem.fakultas?.name || "-"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStrataBadge(prodiItem.strata)}
                      </TableCell>
                      <TableCell className="text-center">
                        {prodiItem.kaprodi ? (
                          <Badge variant="outline" className="text-xs">
                            <Icon name="User" size={12} className="mr-1" />
                            {prodiItem.kaprodi.name}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            <Icon name="X" size={12} className="mr-1" />
                            Belum ada
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Tugaskan Kaprodi"
                            onClick={() => handleOpenAssignModal(prodiItem)}
                          >
                            <Icon name="UserCog" size={16} />
                          </Button>
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
                            title="Edit"
                            onClick={() => handleOpenEditModal(prodiItem)}
                          >
                            <Icon name="Settings" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            title="Hapus"
                            onClick={() =>
                              handleDelete(prodiItem.id, prodiItem.name)
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

      {/* Prodi Form Modal */}
      <ProdiFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        prodi={selectedProdi}
        mode={modalMode}
      />

      {/* Assign Kaprodi Modal */}
      <AssignKaprodiModal
        isOpen={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        onSuccess={handleAssignSuccess}
        prodi={selectedProdi}
      />
    </div>
  );
};
