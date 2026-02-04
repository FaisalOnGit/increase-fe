import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { periode } from "@/data/mockData";
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

export const PeriodeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPeriode = periode.filter(
    periodeItem =>
      periodeItem.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      periodeItem.tahun.toString().includes(searchTerm) ||
      periodeItem.semester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPeriode.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPeriode = filteredPeriode.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'buka':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Buka</Badge>;
      case 'tutup':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Tutup</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Draft</Badge>;
      case 'selesai':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Selesai</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
            Kelola periode pelaksanaan PKM
          </p>
        </div>
        <Button>
          <Icon name="Calendar" size={16} className="mr-2" />
          Tambah Periode
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Calendar" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{periode.length}</p>
                <p className="text-xs text-muted-foreground">Total Periode</p>
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
                <p className="text-2xl font-bold">{periode.filter(p => p.status === 'buka').length}</p>
                <p className="text-xs text-muted-foreground">Sedang Berjalan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="CheckCircle" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{periode.filter(p => p.status === 'selesai').length}</p>
                <p className="text-xs text-muted-foreground">Selesai</p>
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
                <p className="text-2xl font-bold">{periode.reduce((acc, p) => acc + p.jumlahProposal, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Proposal</p>
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
              placeholder="Cari nama periode, tahun, atau semester..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Periode Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Periode PKM</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Periode</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Tanggal Pelaksanaan</TableHead>
                <TableHead className="text-center">Jml Proposal</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPeriode.map((periodeItem) => (
                <TableRow key={periodeItem.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        periodeItem.status === 'buka' ? 'bg-emerald-100' :
                        periodeItem.status === 'selesai' ? 'bg-blue-100' :
                        periodeItem.status === 'tutup' ? 'bg-red-100' :
                        'bg-gray-100'
                      }`}>
                        <Icon
                          name="Calendar"
                          size={20}
                          className={
                            periodeItem.status === 'buka' ? 'text-emerald-600' :
                            periodeItem.status === 'selesai' ? 'text-blue-600' :
                            periodeItem.status === 'tutup' ? 'text-red-600' :
                            'text-gray-600'
                          }
                        />
                      </div>
                      <p className="text-sm font-medium">{periodeItem.nama}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{periodeItem.tahun}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{periodeItem.semester}</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{formatDate(periodeItem.tanggalMulai)}</p>
                      <p className="text-muted-foreground">s/d {formatDate(periodeItem.tanggalSelesai)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{periodeItem.jumlahProposal}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(periodeItem.status)}
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
                Menampilkan {startIndex + 1} hingga {Math.min(startIndex + itemsPerPage, filteredPeriode.length)} dari {filteredPeriode.length} periode
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
