import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { jenisPKM } from "@/data/mockData";
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

export const JenisPKMManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredJenisPKM = jenisPKM.filter(
    jenis =>
      jenis.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jenis.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jenis.singkatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJenisPKM.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJenisPKM = filteredJenisPKM.slice(startIndex, startIndex + itemsPerPage);

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Award" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jenisPKM.length}</p>
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
                <p className="text-2xl font-bold">{jenisPKM.filter(j => j.status === 'active').length}</p>
                <p className="text-xs text-muted-foreground">Jenis Aktif</p>
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
                <p className="text-2xl font-bold">{jenisPKM.reduce((acc, j) => acc + j.kuota, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Kuota</p>
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
                <p className="text-2xl font-bold">{jenisPKM.reduce((acc, j) => acc + j.jumlahPendaftar, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Pendaftar</p>
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
              placeholder="Cari nama, kode, atau singkatan PKM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jenis PKM</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-center">Kuota</TableHead>
                <TableHead className="text-center">Pendaftar</TableHead>
                <TableHead className="text-center">Terisi</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedJenisPKM.map((jenis) => {
                const percentage = Math.round((jenis.jumlahPendaftar / jenis.kuota) * 100);
                return (
                  <TableRow key={jenis.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon name="Award" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{jenis.nama}</p>
                          <p className="text-xs text-muted-foreground">{jenis.singkatan}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono">{jenis.kode}</span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground max-w-xs truncate">{jenis.deskripsi}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-medium">{jenis.kuota}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-medium">{jenis.jumlahPendaftar}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={jenis.status === 'active' ? "default" : "secondary"}>
                        {jenis.status === 'active' ? 'Aktif' : 'Nonaktif'}
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
                );
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {startIndex + 1} hingga {Math.min(startIndex + itemsPerPage, filteredJenisPKM.length)} dari {filteredJenisPKM.length} jenis PKM
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
