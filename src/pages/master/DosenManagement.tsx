import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { dosen } from "@/data/mockData";
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
import { getStatusBadge } from "@/utils/badge-utils";

export const DosenManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredDosen = dosen.filter(
    (dosenItem) =>
      dosenItem.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dosenItem.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dosenItem.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dosenItem.prodi.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDosen.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDosen = filteredDosen.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Master", href: "/dashboard/master" },
            { name: "Master Dosen", href: "/dashboard/master/dosen" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Master Dosen</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data dosen pembimbing dan reviewer
          </p>
        </div>
        <Button>
          <Icon name="GraduationCap" size={16} className="mr-2" />
          Tambah Dosen
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon
                  name="GraduationCap"
                  size={20}
                  className="text-blue-600"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{dosen.length}</p>
                <p className="text-xs text-muted-foreground">Total Dosen</p>
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
                  {dosen.filter((d) => d.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">Dosen Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Icon name="Eye" size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {dosen.filter((d) => d.isReviewer).length}
                </p>
                <p className="text-xs text-muted-foreground">Reviewer</p>
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
                  {dosen.reduce((acc, d) => acc + d.jumlahBimbingan, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Bimbingan</p>
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
              placeholder="Cari nama, NIP, email, atau prodi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Dosen Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Dosen</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Dosen</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Prodi / Fakultas</TableHead>
                <TableHead className="text-center">Reviewer</TableHead>
                <TableHead className="text-center">Pembimbing</TableHead>
                <TableHead className="text-center">Jml Bimbingan</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDosen.map((dosenItem) => (
                <TableRow key={dosenItem.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <Icon name="GraduationCap" size={20} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{dosenItem.nama}</p>
                        <p className="text-xs text-muted-foreground">
                          {dosenItem.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-mono">{dosenItem.nip}</p>
                    <p className="text-xs text-muted-foreground">
                      {dosenItem.telepon}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{dosenItem.prodi}</p>
                    <p className="text-xs text-muted-foreground">
                      {dosenItem.fakultas}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={dosenItem.isReviewer ? "default" : "outline"}
                    >
                      {dosenItem.isReviewer ? "Ya" : "Tidak"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={dosenItem.isPembimbing ? "default" : "outline"}
                    >
                      {dosenItem.isPembimbing ? "Ya" : "Tidak"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">
                      {dosenItem.jumlahBimbingan}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(dosenItem.status)}
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
                {Math.min(startIndex + itemsPerPage, filteredDosen.length)} dari{" "}
                {filteredDosen.length} dosen
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
        </CardContent>
      </Card>
    </div>
  );
};
