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
import { getPKMs, deletePKM, togglePKMStatus } from "@/api/pkm";
import { JenisPKM } from "@/types/api.types";

export const JenisPKMManagement: React.FC = () => {
  const [pkms, setPkms] = useState<JenisPKM[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPKMs();
  }, [currentPage, searchTerm]);

  const fetchPKMs = async () => {
    setIsLoading(true);
    try {
      const response = await getPKMs({
        page: currentPage,
        per_page: itemsPerPage,
        search: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setPkms(response.data);
      } else {
        console.error("Failed to fetch PKM types:", response.message);
      }
    } catch (error) {
      console.error("Error fetching PKM types:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, nama: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus jenis PKM "${nama}"?`)) {
      return;
    }

    try {
      const response = await deletePKM(id);
      if (response.success) {
        fetchPKMs();
        alert("Jenis PKM berhasil dihapus");
      } else {
        alert(`Gagal menghapus jenis PKM: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting PKM:", error);
      alert("Terjadi kesalahan saat menghapus jenis PKM");
    }
  };

  const handleToggleStatus = async (id: number, nama: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    if (!confirm(`Apakah Anda yakin ingin mengubah status "${nama}" menjadi ${newStatus ? 'Aktif' : 'Nonaktif'}?`)) {
      return;
    }

    try {
      const response = await togglePKMStatus(id);
      if (response.success) {
        fetchPKMs();
        alert(`Status jenis PKM berhasil diperbarui`);
      } else {
        alert(`Gagal mengubah status: ${response.message}`);
      }
    } catch (error) {
      console.error("Error toggling PKM status:", error);
      alert("Terjadi kesalahan saat mengubah status");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Master", href: "/dashboard/master" },
            { name: "Master Jenis PKM", href: "/dashboard/master/jenis-pkm" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Master Jenis PKM</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola jenis-jenis Program Kreativitas Mahasiswa
          </p>
        </div>
        <Button>
          <Icon name="Award" size={16} className="mr-2" />
          Tambah Jenis PKM
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Award" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pkms.length}</p>
                <p className="text-xs text-muted-foreground">Total Jenis PKM</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Icon name="CheckCircle" size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pkms.filter((p) => p.is_active).length}</p>
                <p className="text-xs text-muted-foreground">Jenis Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="Users" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pkms.reduce((acc, p) => acc + p.batas_max_anggota, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Kuota Anggota</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari nama atau singkatan PKM..."
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

      {/* Jenis PKM Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Jenis PKM</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Memuat data...</div>
          ) : pkms.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Tidak ada data jenis PKM
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jenis PKM</TableHead>
                    <TableHead>Singkatan</TableHead>
                    <TableHead className="text-center">Min Anggota</TableHead>
                    <TableHead className="text-center">Max Anggota</TableHead>
                    <TableHead className="text-center">Max Reviewer</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pkms.map((pkm) => (
                    <TableRow key={pkm.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon name="Award" size={20} className="text-primary" />
                          </div>
                          <p className="text-sm font-medium">{pkm.nama}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {pkm.singkatan}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-medium">{pkm.batas_min_anggota}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-medium">{pkm.batas_max_anggota}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-medium">{pkm.batas_max_reviewer}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={pkm.is_active ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => handleToggleStatus(pkm.id, pkm.nama, pkm.is_active)}
                          title="Klik untuk toggle status"
                        >
                          {pkm.is_active ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Toggle Status"
                            onClick={() => handleToggleStatus(pkm.id, pkm.nama, pkm.is_active)}
                          >
                            <Icon name={pkm.is_active ? "ToggleLeft" : "ToggleRight"} size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" title="Lihat Detail">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Icon name="Settings" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            title="Hapus"
                            onClick={() => handleDelete(pkm.id, pkm.nama)}
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
    </div>
  );
};
