import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { prodi } from "@/data/mockData";
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

export const ProdiManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProdi = prodi.filter(
    prodiItem =>
      prodiItem.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prodiItem.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prodiItem.fakultas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProdi.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProdi = filteredProdi.slice(startIndex, startIndex + itemsPerPage);

  const getAkreditasiBadge = (akreditasi: string) => {
    switch (akreditasi) {
      case 'Unggul':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Unggul</Badge>;
      case 'A':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">A</Badge>;
      case 'B':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">B</Badge>;
      case 'C':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">C</Badge>;
      default:
        return <Badge variant="secondary">{akreditasi}</Badge>;
    }
  };

  const getJenjangBadge = (jenjang: string) => {
    switch (jenjang) {
      case 'S3':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">S3</Badge>;
      case 'S2':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">S2</Badge>;
      case 'S1':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">S1</Badge>;
      case 'D4':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">D4</Badge>;
      default:
        return <Badge variant="secondary">{jenjang}</Badge>;
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
        <Button>
          <Icon name="BookOpen" size={16} className="mr-2" />
          Tambah Prodi
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="BookOpen" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{prodi.length}</p>
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
                <p className="text-2xl font-bold">{prodi.filter(p => p.status === 'active').length}</p>
                <p className="text-xs text-muted-foreground">Prodi Aktif</p>
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
                <p className="text-2xl font-bold">{prodi.filter(p => p.akreditasi === 'Unggul' || p.akreditasi === 'A').length}</p>
                <p className="text-xs text-muted-foreground">Terakreditasi A/Unggul</p>
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
                <p className="text-2xl font-bold">{prodi.reduce((acc, p) => acc + p.jumlahMahasiswa, 0)}</p>
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
              placeholder="Cari nama prodi, kode, atau fakultas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Prodi</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Fakultas</TableHead>
                <TableHead className="text-center">Jenjang</TableHead>
                <TableHead className="text-center">Akreditasi</TableHead>
                <TableHead className="text-center">Jml Mhs</TableHead>
                <TableHead className="text-center">Jml Dosen</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProdi.map((prodiItem) => (
                <TableRow key={prodiItem.id}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{prodiItem.nama}</p>
                      <p className="text-xs text-muted-foreground">Kaprodi: {prodiItem.kaprodi}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-mono">{prodiItem.kode}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{prodiItem.fakultas}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {getJenjangBadge(prodiItem.jenjang)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getAkreditasiBadge(prodiItem.akreditasi)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{prodiItem.jumlahMahasiswa}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{prodiItem.jumlahDosen}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={prodiItem.status === 'active' ? "default" : "secondary"}>
                      {prodiItem.status === 'active' ? 'Aktif' : 'Nonaktif'}
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
                Menampilkan {startIndex + 1} hingga {Math.min(startIndex + itemsPerPage, filteredProdi.length)} dari {filteredProdi.length} prodi
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
