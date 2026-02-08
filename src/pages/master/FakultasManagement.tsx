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
import { getFaculties, deleteFaculty } from "@/api/faculty";
import { Faculty } from "@/types/api.types";

export const FakultasManagement: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchFaculties();
  }, [currentPage, searchTerm]);

  const fetchFaculties = async () => {
    setIsLoading(true);
    try {
      const response = await getFaculties({
        page: currentPage,
        per_page: itemsPerPage,
        search: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setFaculties(response.data);
      } else {
        console.error("Failed to fetch faculties:", response.message);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus fakultas "${name}"?`)) {
      return;
    }

    try {
      const response = await deleteFaculty(id);
      if (response.success) {
        fetchFaculties();
        alert("Fakultas berhasil dihapus");
      } else {
        alert(`Gagal menghapus fakultas: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
      alert("Terjadi kesalahan saat menghapus fakultas");
    }
  };

  const getProdiList = (faculty: Faculty) => {
    if (!faculty.prodis || faculty.prodis.length === 0) {
      return <span className="text-xs text-muted-foreground">Belum ada prodi</span>;
    }

    return (
      <div className="flex flex-col gap-1">
        {faculty.prodis.slice(0, 3).map((prodi) => (
          <span key={prodi.id} className="text-xs">
            {prodi.name}
          </span>
        ))}
        {faculty.prodis.length > 3 && (
          <span className="text-xs text-muted-foreground">
            +{faculty.prodis.length - 3} lainnya
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Master", href: "/dashboard/master" },
            { name: "Master Fakultas", href: "/dashboard/master/fakultas" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Master Fakultas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data fakultas
          </p>
        </div>
        <Button>
          <Icon name="Building" size={16} className="mr-2" />
          Tambah Fakultas
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Building" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{faculties.length}</p>
                <p className="text-xs text-muted-foreground">Total Fakultas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="BookOpen" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {faculties.reduce((acc, f) => acc + (f.prodis_count || 0), 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Prodi</p>
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
                <p className="text-2xl font-bold">
                  {faculties.filter((f) => (f.prodis_count || 0) > 0).length}
                </p>
                <p className="text-xs text-muted-foreground">Fakultas Aktif</p>
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
              placeholder="Cari nama fakultas..."
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

      {/* Fakultas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Fakultas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Memuat data...</div>
          ) : faculties.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Tidak ada data fakultas
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Fakultas</TableHead>
                    <TableHead>Daftar Prodi</TableHead>
                    <TableHead className="text-center">Jumlah Prodi</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faculties.map((faculty) => (
                    <TableRow key={faculty.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon name="Building" size={20} className="text-primary" />
                          </div>
                          <p className="text-sm font-medium">{faculty.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getProdiList(faculty)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-medium">
                          {faculty.prodis_count || 0} Prodi
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
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
                            onClick={() => handleDelete(faculty.id, faculty.name)}
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
