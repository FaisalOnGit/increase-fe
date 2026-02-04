import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { roles } from "@/data/mockData";
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

export const RoleManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRoles = roles.filter(
    role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Admin</Badge>;
      case 'Dosen':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Dosen</Badge>;
      case 'Mahasiswa':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Mahasiswa</Badge>;
      case 'Reviewer':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Reviewer</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case 'full':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Full Access</Badge>;
      case 'limited':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Limited</Badge>;
      case 'readonly':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Read Only</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
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
            { name: "Manajemen Role", href: "/dashboard/master/role" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Role</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola hak akses dan permissions untuk setiap role pengguna
          </p>
        </div>
        <Button>
          <Icon name="Shield" size={16} className="mr-2" />
          Tambah Role
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="Shield" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roles.length}</p>
                <p className="text-xs text-muted-foreground">Total Role</p>
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
                <p className="text-2xl font-bold">{roles.filter(r => r.status === 'active').length}</p>
                <p className="text-xs text-muted-foreground">Role Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Users" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">124</p>
                <p className="text-xs text-muted-foreground">Total Pengguna</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Icon name="Key" size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Total Permissions</p>
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
              placeholder="Cari nama role atau deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Role</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Role</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-center">Level Akses</TableHead>
                <TableHead className="text-center">Jumlah User</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        role.name === 'Admin' ? 'bg-purple-100' :
                        role.name === 'Dosen' ? 'bg-blue-100' :
                        role.name === 'Mahasiswa' ? 'bg-green-100' :
                        'bg-gray-100'
                      }`}>
                        <Icon
                          name={role.name === 'Admin' ? 'Shield' : role.name === 'Dosen' ? 'GraduationCap' : 'Users'}
                          size={18}
                          className={
                            role.name === 'Admin' ? 'text-purple-600' :
                            role.name === 'Dosen' ? 'text-blue-600' :
                            role.name === 'Mahasiswa' ? 'text-green-600' :
                            'text-gray-600'
                          }
                        />
                      </div>
                      <p className="text-sm font-medium">{role.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{role.description}</p>
                  </TableCell>
                  <TableCell className="text-center">
                    {getAccessLevelBadge(role.accessLevel)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{role.userCount}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={role.status === 'active' ? "default" : "destructive"}>
                      {role.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Lihat Detail">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit Permissions">
                        <Icon name="Settings" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" title="Hapus Role">
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
                Menampilkan {startIndex + 1} hingga {Math.min(startIndex + itemsPerPage, filteredRoles.length)} dari {filteredRoles.length} role
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

      {/* Permissions Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="FileText" size={16} className="text-blue-600" />
                <p className="text-sm font-medium">Manajemen Proposal</p>
              </div>
              <p className="text-xs text-muted-foreground">Upload, edit, dan hapus proposal PKM</p>
            </div>
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Eye" size={16} className="text-amber-600" />
                <p className="text-sm font-medium">Review & Penilaian</p>
              </div>
              <p className="text-xs text-muted-foreground">Akses review dan beri penilaian</p>
            </div>
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Users" size={16} className="text-green-600" />
                <p className="text-sm font-medium">Manajemen User</p>
              </div>
              <p className="text-xs text-muted-foreground">Tambah, edit, dan hapus pengguna</p>
            </div>
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Settings" size={16} className="text-purple-600" />
                <p className="text-sm font-medium">Pengaturan Sistem</p>
              </div>
              <p className="text-xs text-muted-foreground">Konfigurasi sistem dan master data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
