import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { mahasiswa } from "@/data/mockData";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const MahasiswaManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredMahasiswa = mahasiswa.filter(
    mhs =>
      mhs.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mhs.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mhs.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mhs.prodi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMahasiswa.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMahasiswa = filteredMahasiswa.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Aktif</Badge>;
      case 'lulus':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Lulus</Badge>;
      default:
        return <Badge variant="secondary">Nonaktif</Badge>;
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
            { name: "Master Mahasiswa", href: "/dashboard/master/mahasiswa" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Master Mahasiswa</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data mahasiswa peserta PKM
          </p>
        </div>
        <Button>
          <Icon name="Users" size={16} className="mr-2" />
          Tambah Mahasiswa
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
                <p className="text-2xl font-bold">{mahasiswa.length}</p>
                <p className="text-xs text-muted-foreground">Total Mahasiswa</p>
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
                <p className="text-2xl font-bold">{mahasiswa.filter(m => m.status === 'active').length}</p>
                <p className="text-xs text-muted-foreground">Mahasiswa Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="GraduationCap" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mahasiswa.filter(m => m.status === 'lulus').length}</p>
                <p className="text-xs text-muted-foreground">Sudah Lulus</p>
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
                <p className="text-2xl font-bold">{mahasiswa.filter(m => m.angkatan === 2021).length}</p>
                <p className="text-xs text-muted-foreground">Angkatan 2021</p>
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
              placeholder="Cari nama, NIM, email, atau prodi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mahasiswa Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Mahasiswa</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Mahasiswa</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Prodi / Fakultas</TableHead>
                <TableHead className="text-center">Angkatan</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMahasiswa.map((mhs) => (
                <TableRow key={mhs.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <Icon name="User" size={20} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{mhs.nama}</p>
                        <p className="text-xs text-muted-foreground">{mhs.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-mono">{mhs.nim}</p>
                    <p className="text-xs text-muted-foreground">{mhs.telepon}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{mhs.prodi}</p>
                    <p className="text-xs text-muted-foreground">{mhs.fakultas}</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{mhs.angkatan}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(mhs.status)}
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
                Menampilkan {startIndex + 1} hingga {Math.min(startIndex + itemsPerPage, filteredMahasiswa.length)} dari {filteredMahasiswa.length} mahasiswa
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
