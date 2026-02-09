import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

// Dummy data
const dummyPembimbing = [
  {
    id: 1,
    nama: "Dr. Ahmad Fauzi, M.Kom",
    nidn: "0412098801",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    kuota: 5,
    terpakai: 3,
    status: "available",
    email: "ahmad.fauzi@unsil.ac.id",
  },
  {
    id: 2,
    nama: "Prof. Dr. Sri Wahyuni, M.Si",
    nidn: "0415056502",
    prodi: "Matematika",
    fakultas: "Fakultas MIPA",
    kuota: 5,
    terpakai: 5,
    status: "full",
    email: "sri.wahyuni@unsil.ac.id",
  },
  {
    id: 3,
    nama: "Dr. Bambang Sutrisno, M.T.",
    nidn: "0410067303",
    prodi: "Teknik Sipil",
    fakultas: "Fakultas Teknik",
    kuota: 5,
    terpakai: 2,
    status: "available",
    email: "bambang.sutrisno@unsil.ac.id",
  },
  {
    id: 4,
    nama: "Dra. Hj. Ratna Sari, M.Pd",
    nidn: "0422118404",
    prodi: "Pendidikan Bahasa Inggris",
    fakultas: "Fakultas Keguruan",
    kuota: 5,
    terpakai: 0,
    status: "available",
    email: "ratna.sari@unsil.ac.id",
  },
  {
    id: 5,
    nama: "Ir. Joko Susilo, M.Eng",
    nidn: "0410038205",
    prodi: "Teknik Elektro",
    fakultas: "Fakultas Teknik",
    kuota: 5,
    terpakai: 4,
    status: "available",
    email: "joko.susilo@unsil.ac.id",
  },
  {
    id: 6,
    nama: "Dr. Dewi Lestari, M.Si",
    nidn: "0418048606",
    prodi: "Biologi",
    fakultas: "Fakultas MIPA",
    kuota: 5,
    terpakai: 5,
    status: "full",
    email: "dewi.lestari@unsil.ac.id",
  },
  {
    id: 7,
    nama: "Prof. Dr. Hendra Gunawan, M.Kom",
    nidn: "0409127507",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    kuota: 8,
    terpakai: 6,
    status: "available",
    email: "hendra.gunawan@unsil.ac.id",
  },
  {
    id: 8,
    nama: "Dr. Anita Permata, M.Pd",
    nidn: "0415039008",
    prodi: "Pendidikan Ekonomi",
    fakultas: "Fakultas Ekonomi",
    kuota: 5,
    terpakai: 1,
    status: "available",
    email: "anita.permata@unsil.ac.id",
  },
];

export const PembimbingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPembimbing = dummyPembimbing.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nidn.includes(searchTerm) ||
      p.prodi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fakultas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPembimbing.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPembimbing = filteredPembimbing.slice(
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
            { name: "Manajemen", href: "/dashboard/manajemen" },
            { name: "Manajemen Pembimbing", href: "/dashboard/manajemen/pembimbing" },
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
                <p className="text-2xl font-bold">{dummyPembimbing.length}</p>
                <p className="text-xs text-muted-foreground">Total Pembimbing</p>
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
                  {dummyPembimbing.filter((p) => p.terpakai < p.kuota).length}
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
                  {dummyPembimbing.filter((p) => p.terpakai >= p.kuota).length}
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
                  {dummyPembimbing.reduce((acc, p) => acc + (p.kuota - p.terpakai), 0)}
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
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
          {paginatedPembimbing.length === 0 ? (
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
                    <TableHead className="text-center">Kuota Pembimbingan</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPembimbing.map((pembimbing) => (
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
                            <p className="text-sm font-medium">{pembimbing.nama}</p>
                            <p className="text-xs text-muted-foreground">{pembimbing.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">{pembimbing.nidn}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{pembimbing.prodi}</p>
                          <p className="text-xs text-muted-foreground">{pembimbing.fakultas}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="w-32 mx-auto">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{pembimbing.terpakai}</span>
                            <span>{pembimbing.kuota}</span>
                          </div>
                          {getQuotaProgress(pembimbing.kuota, pembimbing.terpakai)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getQuotaBadge(pembimbing.kuota, pembimbing.terpakai)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Lihat Detail">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit Kuota">
                            <Icon name="Settings" size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" title="Reset Kuota">
                            <Icon name="RotateCcw" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            title="Hapus"
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
                    {Math.min(startIndex + itemsPerPage, filteredPembimbing.length)} dari{" "}
                    {filteredPembimbing.length} pembimbing
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
    </div>
  );
};
