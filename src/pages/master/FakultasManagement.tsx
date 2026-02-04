import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { fakultas } from "@/data/mockData";
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

export const FakultasManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredFakultas = fakultas.filter(
    fakultasItem =>
      fakultasItem.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fakultasItem.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFakultas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFakultas = filteredFakultas.slice(startIndex, startIndex + itemsPerPage);

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Building" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{fakultas.length}</p>
                <p className="text-xs text-muted-foreground">Total Fakultas</p>
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
                <p className="text-2xl font-bold">{fakultas.filter(f => f.status === 'active').length}</p>
                <p className="text-xs text-muted-foreground">Fakultas Aktif</p>
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
                <p className="text-2xl font-bold">{fakultas.reduce((acc, f) => acc + f.jumlahProdi, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Prodi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Icon name="Users" size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{fakultas.reduce((acc, f) => acc + f.jumlahMahasiswa, 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Mahasiswa</p>
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
              placeholder="Cari nama fakultas atau kode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Fakultas</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Dekan</TableHead>
                <TableHead className="text-center">Jml Prodi</TableHead>
                <TableHead className="text-center">Jml Mahasiswa</TableHead>
                <TableHead className="text-center">Jml Dosen</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFakultas.map((fakultasItem) => (
                <TableRow key={fakultasItem.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="Building" size={20} className="text-primary" />
                      </div>
                      <p className="text-sm font-medium">{fakultasItem.nama}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-mono">{fakultasItem.kode}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{fakultasItem.dekan}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{fakultasItem.jumlahProdi}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{fakultasItem.jumlahMahasiswa.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{fakultasItem.jumlahDosen}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={fakultasItem.status === 'active' ? "default" : "secondary"}>
                      {fakultasItem.status === 'active' ? 'Aktif' : 'Nonaktif'}
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
                      <Button variant="ghost" size="icon" className="text-destructive" title="Hapus">
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
                Menampilkan {startIndex + 1} hingga {Math.min(startIndex + itemsPerPage, filteredFakultas.length)} dari {filteredFakultas.length} fakultas
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
