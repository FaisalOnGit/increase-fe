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
import { getRoles, getRoleByName } from "@/api/roles";
import { Role } from "@/types/api.types";

export const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesWithDetails, setRolesWithDetails] = useState<(Role & { users_count?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const response = await getRoles();
      if (response.success && response.data) {
        setRoles(response.data);

        // Fetch details for each role to get users_count
        const rolesDetails = await Promise.all(
          response.data.map(async (role) => {
            const detailResponse = await getRoleByName(role.name);
            return {
              ...role,
              users_count: detailResponse.data?.users_count,
            };
          })
        );
        setRolesWithDetails(rolesDetails);
      } else {
        console.error("Failed to fetch roles:", response.message);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRoles = rolesWithDetails.filter(
    (role) =>
      role.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage);

  const getRoleBadge = (name: string) => {
    const normalized = name.toLowerCase();
    switch (normalized) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Admin</Badge>;
      case "dosen":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Dosen</Badge>;
      case "mahasiswa":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Mahasiswa</Badge>;
      case "reviewer":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Reviewer</Badge>;
      case "kajur":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Kajur</Badge>;
      default:
        return <Badge variant="secondary">{name}</Badge>;
    }
  };

  const getRoleIcon = (name: string) => {
    const normalized = name.toLowerCase();
    switch (normalized) {
      case "admin":
        return "Shield";
      case "dosen":
        return "GraduationCap";
      case "mahasiswa":
        return "Users";
      case "reviewer":
        return "Eye";
      case "kajur":
        return "Award";
      default:
        return "HelpCircle";
    }
  };

  const getRoleColor = (name: string) => {
    const normalized = name.toLowerCase();
    switch (normalized) {
      case "admin":
        return {
          bg: "bg-purple-100",
          text: "text-purple-600",
          iconBg: "bg-purple-50",
        };
      case "dosen":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          iconBg: "bg-blue-50",
        };
      case "mahasiswa":
        return {
          bg: "bg-green-100",
          text: "text-green-600",
          iconBg: "bg-green-50",
        };
      case "reviewer":
        return {
          bg: "bg-amber-100",
          text: "text-amber-600",
          iconBg: "bg-amber-50",
        };
      case "kajur":
        return {
          bg: "bg-red-100",
          text: "text-red-600",
          iconBg: "bg-red-50",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          iconBg: "bg-gray-50",
        };
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Users" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {rolesWithDetails.reduce((sum, role) => sum + (role.users_count || 0), 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Pengguna</p>
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
                <p className="text-2xl font-bold">{roles.length}</p>
                <p className="text-xs text-muted-foreground">Role Aktif</p>
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
              placeholder="Cari nama role..."
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
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Memuat data...</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Role</TableHead>
                    <TableHead>Guard Name</TableHead>
                    <TableHead className="text-center">Jumlah User</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRoles.map((role) => {
                    const colors = getRoleColor(role.name);
                    return (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                              <Icon
                                name={getRoleIcon(role.name) as any}
                                size={18}
                                className={colors.text}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{role.display_name}</p>
                              <p className="text-xs text-muted-foreground">{role.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{role.guard_name}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-medium">{role.users_count || 0}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Lihat Detail">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" title="Edit Permissions">
                              <Icon name="Settings" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              {filteredRoles.length > itemsPerPage && (
                <div className="px-6 py-4 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Menampilkan {startIndex + 1} hingga{" "}
                      {Math.min(startIndex + itemsPerPage, filteredRoles.length)} dari{" "}
                      {filteredRoles.length} role
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
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Permissions Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Role yang Tersedia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Shield" size={16} className="text-purple-600" />
                <p className="text-sm font-medium">Admin</p>
              </div>
              <p className="text-xs text-muted-foreground">Akses penuh ke seluruh fitur sistem</p>
            </div>
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="GraduationCap" size={16} className="text-blue-600" />
                <p className="text-sm font-medium">Dosen</p>
              </div>
              <p className="text-xs text-muted-foreground">Akses untuk mengelola proposal dan penilaian</p>
            </div>
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Users" size={16} className="text-green-600" />
                <p className="text-sm font-medium">Mahasiswa</p>
              </div>
              <p className="text-xs text-muted-foreground">Akses untuk submit dan melihat proposal PKM</p>
            </div>
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Eye" size={16} className="text-amber-600" />
                <p className="text-sm font-medium">Reviewer</p>
              </div>
              <p className="text-xs text-muted-foreground">Akses khusus untuk mereview proposal</p>
            </div>
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Award" size={16} className="text-red-600" />
                <p className="text-sm font-medium">Kajur</p>
              </div>
              <p className="text-xs text-muted-foreground">Akses manajemen tingkat jurusan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
